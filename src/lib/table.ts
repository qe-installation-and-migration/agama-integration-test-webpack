import { Page, ElementHandle } from "puppeteer-core";

async function getHeaders(page: Page, tableSelector: string): Promise<string[]> {
  const headers = await page.$$eval(
    `${tableSelector} th[scope="col"]`,
    (ths) => ths.map((th) => (th as HTMLElement).innerText.trim() || th.getAttribute('aria-label'))
  );
  return headers.map((h) => (h || "").trim());
}

async function getColumnIndex(page: Page, tableSelector: string, column: string): Promise<number> {
  const headers = await getHeaders(page, tableSelector);
  const index = headers.indexOf(column);
  if (index === -1) {
    throw new Error(`Column "${column}" not found in table "${tableSelector}"`);
  }
  return index;
}

async function selectRow(
  page: Page,
  tableSelector: string,
  column: string,
  value: string
): Promise<ElementHandle> {
  const columnIndex = await getColumnIndex(page, tableSelector, column);
  const rows = await page.$$(`${tableSelector} tbody tr`);

  for (const row of rows) {
    const selector = `*:nth-child(${columnIndex + 1})`;
    const cell = await row.$(selector);

    if (cell) {
      const cellText = await cell.evaluate((c) => (c as HTMLElement).innerText);
      if (cellText.trim() === value.trim()) {
        return row;
      }
    }
  }

  throw new Error(`Row with "${column}: ${value}" not found in table "${tableSelector}"`);
}

async function readCells(
  page: Page,
  tableSelector: string,
  row: ElementHandle,
  columns: string[],
): Promise<string[]> {
  const headers = await getHeaders(page, tableSelector);
  const columnInfo = columns.map((column) => {
    const index = headers.indexOf(column);
    if (index === -1) {
      throw new Error(`Column "${column}" not found in table "${tableSelector}"`);
    }
    return { column, index };
  });

  return row.evaluate((r, colInfo: { column: string; index: number }[]) => {
    const data: string[] = [];
    for (const { index } of colInfo) {
      const cell = r.querySelector(`*:nth-child(${index + 1})`);
      if (cell) {
        data.push((cell as HTMLElement).innerText);
      } else {
        data.push("");
      }
    }
    return data;
  }, columnInfo);
}

async function readCell(
  page: Page,
  tableSelector: string,
  row: ElementHandle,
  column: string,
): Promise<string> {
  const columnIndex = await getColumnIndex(page, tableSelector, column);
  const selector = `*:nth-child(${columnIndex + 1})`;
  const cell = await row.$(selector);

  if (!cell) {
    throw new Error(`Cell in column "${column}" not found for the selected row.`);
  }

  return cell.evaluate((c) => (c as HTMLElement).innerText);
}

async function getCell(
  page: Page,
  tableSelector: string,
  row: ElementHandle,
  column: string,
): Promise<ElementHandle> {
  const columnIndex = await getColumnIndex(page, tableSelector, column);
  const selector = `*:nth-child(${columnIndex + 1})`;
  const cell = await row.$(selector);

  if (!cell) {
    throw new Error(`Cell in column "${column}" not found for the selected row.`);
  }

  return cell;
}

export async function getTextInCells(
  page: Page,
  tableSelector: string,
  rowColumn: string,
  rowValue: string,
  targetColumn: string,
): Promise<string>;
export async function getTextInCells(
  page: Page,
  tableSelector: string,
  rowColumn: string,
  rowValue: string,
  targetColumns: string[],
): Promise<string[]>;
export async function getTextInCells(
  page: Page,
  tableSelector: string,
  rowColumn: string,
  rowValue: string,
  targetColumns: string | string[],
): Promise<string | string[]> {
  const row = await selectRow(page, tableSelector, rowColumn, rowValue);
  if (Array.isArray(targetColumns)) {
    return readCells(page, tableSelector, row, targetColumns);
  }
  return readCell(page, tableSelector, row, targetColumns);
}

export async function getElementInCell(
  page: Page,
  tableSelector: string,
  rowColumn: string,
  rowValue: string,
  elementSelector: string,
  targetColumn?: string,
): Promise<ElementHandle> {
  const row = await selectRow(page, tableSelector, rowColumn, rowValue);
  let searchContext: ElementHandle | Page = row;

  if (targetColumn) {
    searchContext = await getCell(page, tableSelector, row, targetColumn);
  }

  const element = await searchContext.$(elementSelector);

  if (!element) {
    let errorMessage = `Element with selector "${elementSelector}" not found`;
    if (targetColumn) {
      errorMessage += ` in column "${targetColumn}"`;
    }
    errorMessage += ` in the row identified by "${rowColumn}: ${rowValue}".`;
    throw new Error(errorMessage);
  }

  return element;
}
