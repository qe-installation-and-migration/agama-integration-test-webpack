import { it, page, getTextContent } from "../lib/helpers";
import { OverviewPage } from "../pages/overview_page";
import {
  ProductRegistrationPage,
  ExtensionHaRegistrationPage,
  CustomRegistrationPage,
  ExtensionPhubRegistrationPage,
} from "../pages/registration_page";
import assert from "node:assert/strict";

import { TrustRegistrationCertificatePage } from "../pages/trust_registration_certificate_page";
import { TrustKeyPage } from "../pages/trust_key_page";
import { SidebarWithRegistrationPage } from "../pages/sidebar_page";

interface RegistratinOptions {
  use_custom?: string;
  code?: string;
  provide_code?: string;
  url?: string;
}

export function enterRegistration({
  use_custom,
  code,
  provide_code,
  url,
}: RegistratinOptions): void {
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

export function enterRegistrationHa(code: string) {
  it("should allow setting registration HA", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const extensionRegistration = new ExtensionHaRegistrationPage(page);

    await sidebar.goToRegistration();
    await extensionRegistration.fillCode(code);
    await extensionRegistration.register();
    assert.match(
      await getTextContent(extensionRegistration.extensionRegisteredText()),
      /The extension has been registered/,
    );
  });
}

export function registerPackageHub() {
  it("should allow register PackageHub", async function () {
    const sidebar = new SidebarWithRegistrationPage(page);
    const extensionRegistration = new ExtensionPhubRegistrationPage(page);
    const packagehubTrustKey = new TrustKeyPage(page);

    await sidebar.goToRegistration();
    await extensionRegistration.register();
    assert.match(
      await getTextContent(packagehubTrustKey.trustKeyText()),
      /is unknown. Do you want to trust this key?/,
    );
    await packagehubTrustKey.trustKey();
    assert.deepEqual(
      await getTextContent(extensionRegistration.extensionRegisteredText()),
      "The extension was registered without any registration code.",
    );
  });
}
