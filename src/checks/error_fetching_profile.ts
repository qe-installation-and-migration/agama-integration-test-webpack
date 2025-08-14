import { it, page } from "../lib/helpers";
import { ErrorFetchingProfilePage } from "../pages/error_fetching_profile_page";

export function verifyErrorFetchingProfile() {
  it(`should show error fetching profile`, async function () {
    const errorFetchingProfilePage = new ErrorFetchingProfilePage(page);

    await errorFetchingProfilePage.verifyContent();
  });
}
