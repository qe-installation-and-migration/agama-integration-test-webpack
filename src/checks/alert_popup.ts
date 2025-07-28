import { it, page } from "../lib/helpers";
import { AlertPopupPage } from "../pages/alert_popup_page";

export function verifyAlertPopup() {
  it(`should show alert popup`, async function () {
    const alertPopupPage = new AlertPopupPage(page);

    await alertPopupPage.verifyInvalidUrl();
  });
}
