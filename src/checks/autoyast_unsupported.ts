import { it, page } from "../lib/helpers";
import { AutoyastUnsupportedPage } from "../pages/autoyast_unsupported_page";

export function verifyNotImplemented(elements: string[]) {
  it(`should display elements not implemented yet: ${elements.join(", ")}`, async function () {
    const autoyastUnsupported = new AutoyastUnsupportedPage(page);
    for (const element of elements) await autoyastUnsupported.verifyNotImplementedElement(element);
  });
}

export function verifyNotSupported(elements: string[]) {
  it(`should display elements not supported: ${elements.join(", ")}`, async function () {
    const autoyastUnsupported = new AutoyastUnsupportedPage(page);
    for (const element of elements) await autoyastUnsupported.verifyNotSupportedElement(element);
  });
}

export function abort() {
  it("should abort installation", async function () {
    const autoyastUnsupported = new AutoyastUnsupportedPage(page);
    await autoyastUnsupported.abort();
  });
}
