import { it, page, getTextContent } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import {
  ProductRegistrationPage,
  CustomRegistrationPage,
} from "../pages/product_registration_page";
import { ExtensionRegistrationPHubPage } from "../pages/extension_registration_phub_page";
import { ExtensionRegistrationHAPage } from "../pages/extension_registration_ha_page";
import assert from "node:assert/strict";

import { TrustRegistrationCertificatePage } from "../pages/trust_registration_certificate_page";
import { SidebarWithRegistrationPage } from "../pages/sidebar_page";

interface RegistrationOptions {
  use_custom?: string;
  code?: string;
  provide_code?: string;
  url?: string;
}

export function enterProductRegistration({
  use_custom,
  code,
  provide_code,
  url,
}: RegistrationOptions): void {
  it("should allow setting registration", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const productRegistration = new ProductRegistrationPage(page);
    await sidebar.goToRegistration();

    if (use_custom) {
      if (url) {
        const customRegistration = new CustomRegistrationPage(page);
        await customRegistration.selectCustomRegistrationServer();
        await customRegistration.fillServerUrl(url);
      }
      if (provide_code) {
        await productRegistration.selectProvideRegistrationCode();
        await productRegistration.fillCode(code);
      }
    } else {
      await productRegistration.fillCode(code);
    }
    await productRegistration.register();
  });

  if (url?.startsWith("https")) {
    it("should handle HTTPS certificate trust for custom registration server", async function () {
      const trustRegistration = new TrustRegistrationCertificatePage(page);
      assert.deepEqual(
        await getTextContent(trustRegistration.titleText()),
        "Registration certificate",
      );
      assert.deepEqual(
        await getTextContent(trustRegistration.questionText()),
        "Trying to import a self signed certificate. Do you want to trust it and register the product?",
      );
      assert.deepEqual(
        await getTextContent(trustRegistration.issuerText()),
        "RMT Certificate Authority",
      );
      assert.deepEqual(await getTextContent(trustRegistration.urlText(url)), url);
      await trustRegistration.trustCertificate();
    });
  }

  it("should display product has been registered", async function () {
    await new OverviewPage(page).waitVisible(60000);
    const sidebar = new SidebarWithRegistrationPage(page);
    const productRegistration = new ProductRegistrationPage(page);

    await sidebar.goToRegistration();
    await productRegistration.verifyCustomRegistration();
  });
}

export function enterExtensionRegistrationHA(code: string) {
  it("should allow registering HA extension", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const extensionRegistrationHA = new ExtensionRegistrationHAPage(page);

    await sidebar.goToRegistration();
    await extensionRegistrationHA.fillCode(code);
    await extensionRegistrationHA.register();
    assert.match(
      await getTextContent(extensionRegistrationHA.extensionRegisteredText()),
      /The extension has been registered/,
    );
  });
}

export function enterExtensionRegistrationPHub() {
  it("should allow registering Package Hub extension", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const extensionRegistrationPHub = new ExtensionRegistrationPHubPage(page);

    await sidebar.goToRegistration();
    await extensionRegistrationPHub.register();
    assert.match(
      await getTextContent(extensionRegistrationPHub.trustKeyText()),
      /is unknown. Do you want to trust this key?/,
    );
    await extensionRegistrationPHub.trustKey();
    assert.deepEqual(
      await getTextContent(extensionRegistrationPHub.registeredText()),
      "The extension was registered without any registration code.",
    );
  });
}

export function verifyRegistrationWarniningAlerts() {
  it("should show warning alert for invalid registration", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const customRegistration = new CustomRegistrationPage(page);
    const invalid_regcode = "123XX432";
    let originalCustomServer: string | null = null;

    await sidebar.goToRegistration();
    const isCustomServer = (await page.$("#url")) !== null;
    await customRegistration.register();

    if (isCustomServer) {
      originalCustomServer = await page.$eval('input[type="text"][id="url"]', (el) => el.value);
      assert.deepEqual(
        await getTextContent(customRegistration.connectionToRegistrationServerFailedText()),
        "Warning alert:Connection to registration server failed: Please provide Registration Code.",
      );
    } else {
      assert.deepEqual(
        await getTextContent(customRegistration.checkTheFollowingBeforeContinuingText()),
        "Warning alert:Check the following before continuing",
      );
    }

    const invalidUrls = ["http://scc.example.net", "https://scc.example.net"];
    for (const invalidUrl of invalidUrls) {
      await customRegistration.selectCustomRegistrationServer();
      await customRegistration.fillServerUrl(invalidUrl);
      await customRegistration.register();

      assert.match(
        await getTextContent(customRegistration.connectionToRegistrationServerFailedText()),
        /Connection to registration server failed: dial tcp: lookup .+ on .+: no such host \(network error\)/,
      );
    }

    if (isCustomServer) {
      await customRegistration.fillServerUrl(originalCustomServer);
      await customRegistration.selectProvideRegistrationCode();
    } else {
      await customRegistration.selectSUSERegistrationServer();
    }

    await customRegistration.fillCode(invalid_regcode);
    await customRegistration.register();
    assert.deepEqual(
      await getTextContent(customRegistration.connectionToRegistrationServerFailedText()),
      "Warning alert:Connection to registration server failed: Unknown Registration Code.",
    );

    if (isCustomServer) {
      await customRegistration.selectProvideRegistrationCode();
      await customRegistration.register();
    }
  });
}
