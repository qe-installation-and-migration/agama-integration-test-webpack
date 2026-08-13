import { type ElementHandle, type Page } from "puppeteer-core";

/**
 * Finds an element whose associated <label> text contains `label`, then clicks it.
 *
 * @param page - Puppeteer Page instance
 * @param label - Text to match inside the element's associated label
 * @param selector - Target selector (e.g., '::-p-aria([role="checkbox"])')
 */
export async function getElementByLabel(
  page: Page,
  selector: string,
  label: string
): Promise<ElementHandle<HTMLElement>> {
  const elements = await page.$$(selector);

  for (const element of elements) {
    const text = await element.evaluate(
      (e) => (e as HTMLInputElement).labels?.[0]?.textContent ?? ""
    );
    if (text.includes(label)) {
      return element as ElementHandle<HTMLElement>;
    }
  }

  throw new Error(
    `Element with selector "${selector}" and label "${label}" not found`
  );
}
