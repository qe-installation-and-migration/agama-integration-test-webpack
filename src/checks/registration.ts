import { it, page, getTextContent, waitUntilOverlaySettled } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import { RegistrationSCCPage, RegistrationCustomPage } from "../pages/registration_page";
import { ExtensionRegistrationPHubPage } from "../pages/extension_registration_phub_page";
import { ExtensionRegistrationHAPage } from "../pages/extension_registration_ha_page";
import assert from "node:assert/strict";

import { TrustRegistrationCertificatePage } from "../pages/trust_registration_certificate_page";
import { HeaderPage } from "../pages/header_page";

import {
  ProductRegistrationLegacyPage,
  CustomRegistrationLegacyPage,
} from "../pages/product_registration_legacy_page";

import { SidebarWithRegistrationPage } from "../pages/sidebar_page";
import { OverviewWithSidebarPage } from "../pages/overview_with_sidebar_page";

export interface RegistrationOptions {
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
  it(
    "should allow setting registration",
    async function () {
      const overview = new OverviewPage(page);
      let productRegistration: RegistrationCustomPage | RegistrationSCCPage;

      await overview.goToRegistration();

      if (use_custom) {
        productRegistration = new RegistrationCustomPage(page);
        if (url) {
          await productRegistration.selectCustomRegistrationServer();
          await productRegistration.fillServerUrl(url);
        }
        if (provide_code) {
          await productRegistration.fillCode(code);
        }
      } else {
        productRegistration = new RegistrationSCCPage(page);
        await productRegistration.fillCode(code);
      }
      await waitUntilOverlaySettled(() => productRegistration.register());
    },
    3 * 60 * 1000,
  );

  if (url?.startsWith("https")) {
    it("should handle HTTPS certificate trust for custom registration server", async function () {
      const trustRegistration = new TrustRegistrationCertificatePage(page);
      assert.deepEqual(
        await getTextContent(trustRegistration.titleText()),
        "Registration certificate",
      );
      assert.match(
        await getTextContent(trustRegistration.questionText()),
        /Trying to import a self.signed certificate\. Do you want to trust it and register the product\?/,
      );
      assert.deepEqual(
        await getTextContent(trustRegistration.issuerText()),
        "RMT Certificate Authority",
      );
      await trustRegistration.trustCertificate();
    });
  }

  it("should display product has been registered", async function () {
    const header = new HeaderPage(page);
    const productRegistrationSCC = new RegistrationSCCPage(page);

    const registeredText = await getTextContent(productRegistrationSCC.infoHasBeenRegisteredText());
    assert.match(
      registeredText,
      /SUSE Linux Enterprise Server.*has been registered with below information/,
    );
    await header.goToInstallation();
  });
}

export function enterExtensionRegistrationHA(code: string) {
  it("should allow registering HA extension", async function () {
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const extensionRegistrationHA = new ExtensionRegistrationHAPage(page);

    await overview.goToRegistration();
    await extensionRegistrationHA.fillCode(code);
    await extensionRegistrationHA.register();
    assert.match(
      await getTextContent(extensionRegistrationHA.extensionRegisteredText()),
      /The extension has been registered/,
    );
    await header.goToInstallation();
  });
}

export function enterExtensionRegistrationPHub() {
  it("should allow registering Package Hub extension", async function () {
    const overview = new OverviewPage(page);
    const header = new HeaderPage(page);
    const extensionRegistrationPHub = new ExtensionRegistrationPHubPage(page);

    await overview.goToRegistration();
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
    await header.goToInstallation();
  });
}

export function verifyRegistrationWarniningAlerts(): void {
  it("should show warning alert for missing registration code", async function () {
    const overview = new OverviewPage(page);
    const productRegistrationCustom = new RegistrationCustomPage(page);

    await overview.goToRegistration();
    await productRegistrationCustom.register();

    const warningText = await getTextContent(
      productRegistrationCustom.alertWarningEnterARegistrationCodeText(),
    );
    assert.deepEqual(warningText, "Please provide Registration Code.");
  });

  it("should show warning alert for invalid registration code", async function () {
    const productRegistrationCustom = new RegistrationCustomPage(page);

    await productRegistrationCustom.fillCode("1234invalid4321");
    await productRegistrationCustom.register();

    const warningText = await getTextContent(
      productRegistrationCustom.alertWarningUnknownRegistrationCodeText(),
    );
    assert.deepEqual(warningText, "Unknown Registration Code.");
  });

  it("should show warning alert for invalid custom registration server", async function () {
    const productRegistrationCustom = new RegistrationCustomPage(page);
    const header = new HeaderPage(page);

    await productRegistrationCustom.fillServerUrl("http://scc.example.net");
    await productRegistrationCustom.register();

    const warningText = await getTextContent(
      productRegistrationCustom.alertWarningNetworkErrorText(),
    );
    assert.match(warningText, /Network error: dial tcp: lookup .+ on .+: no such host/);

    await header.goToInstallation();
  }, 90000);
}

export function enterProductRegistrationWithSidebar({
  use_custom,
  code,
  provide_code,
  url,
}: RegistrationOptions): void {
  it("should allow setting registration", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const productRegistration = new ProductRegistrationLegacyPage(page);
    await sidebar.goToRegistration();

    if (use_custom) {
      if (url) {
        const customRegistration = new CustomRegistrationLegacyPage(page);
        await customRegistration.selectCustomRegistrationServer();
        await customRegistration.fillServerUrl(url);
      }
      if (provide_code) {
        await productRegistration.checkProvideRegistrationCode();
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
    const sidebar = new SidebarWithRegistrationPage(page);
    const productRegistration = new ProductRegistrationLegacyPage(page);

    await new OverviewWithSidebarPage(page).waitVisible(59000);
    await sidebar.goToRegistration();
    const registeredText = await getTextContent(productRegistration.infoHasBeenRegisteredText());
    assert.match(
      registeredText,
      /SUSE Linux Enterprise Server.*has been registered with below information/,
    );
  });
}

export function enterExtensionRegistrationHAWithSidebar(code: string) {
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

export function enterExtensionRegistrationPHubWithSidebar() {
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

export function verifyRegistrationWarniningAlertsWithSidebar(
  use_custom?: string,
  url?: string,
): void {
  it("should show warning alert for missing registration code", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const customRegistration = new CustomRegistrationLegacyPage(page);

    await sidebar.goToRegistration();
    if (use_custom) await customRegistration.checkProvideRegistrationCode();
    await customRegistration.register();
    assert.deepEqual(
      await getTextContent(customRegistration.alertWarningEnterARegistrationCodeText()),
      "Enter a registration code",
    );
  });

  it("should show warning alert for invalid registration code", async function () {
    const customRegistration = new CustomRegistrationLegacyPage(page);

    await customRegistration.fillCode("1234invalid4321");
    await customRegistration.register();
    assert.deepEqual(
      await getTextContent(customRegistration.connectionToRegistrationServerFailedText()),
      "Warning alert:Connection to registration server failed: Unknown Registration Code.",
    );
  });

  it("should show warning alert for invalid custom registration server", async function () {
    const customRegistration = new CustomRegistrationLegacyPage(page);

    await customRegistration.selectCustomRegistrationServer();
    await customRegistration.uncheckProvideRegistrationCode();
    await customRegistration.fillServerUrl("http://scc.example.net");
    await customRegistration.register();

    assert.match(
      await getTextContent(customRegistration.connectionToRegistrationServerFailedText()),
      /Connection to registration server failed: dial tcp: lookup .+ on .+: no such host \(network error\)/,
    );

    if (use_custom) {
      await customRegistration.fillServerUrl(url);
    } else {
      await customRegistration.selectSCCRegistrationServer();
      await customRegistration.fillCode("1234invalid4321");
    }
    await customRegistration.register();
  });
}
