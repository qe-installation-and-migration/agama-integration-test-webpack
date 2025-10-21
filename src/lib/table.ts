import { Page, ElementHandle } from "puppeteer-core";

async function getHeaders(page: Page, tableSelector: string): Promise<string[]> {
  const headers = await page.$$eval(
    `${tableSelector} th[scope="col"]`,
    (ths) => ths.map((th) => (th as HTMLElement).innerText)
  );
  return headers;
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
    const cellText = await row.$eval(
      `td:nth-child(${columnIndex + 1})`,
      (td) => (td as HTMLElement).innerText
    );
    if (cellText === value) {
      return row;
    }
  }

  throw new Error(`Row with "${column}: ${value}" not found in table "${tableSelector}"`);
}

async function readCell(
  page: Page,
  tableSelector: string,
  row: ElementHandle,
  column: string,
): Promise<string> {
  const columnIndex = await getColumnIndex(page, tableSelector, column);
  const cellText = await row.$eval(
    `td:nth-child(${columnIndex + 1})`,
    (td) => (td as HTMLElement).innerText
  );

  return cellText;
}

async function getCell(
  page: Page,
  tableSelector: string,
  row: ElementHandle,
  column: string,
): Promise<ElementHandle> {
  const columnIndex = await getColumnIndex(page, tableSelector, column);
  const cell = await row.$(`td:nth-child(${columnIndex + 1})`);

  if (!cell) {
    throw new Error(`Cell in column "${column}" not found for the selected row.`);
  }

  return cell;
}

export async function readCellbyRowSelection(
  page: Page,
  tableSelector: string,
  rowColumn: string,
  rowValue: string,
  targetColumn: string,
): Promise<string> {
  const row = await selectRow(page, tableSelector, rowColumn, rowValue);
  const cellText = await readCell(page, tableSelector, row, targetColumn);
  return cellText;
}

export async function getCellbyRowSelection(
  page: Page,
  tableSelector: string,
  rowColumn: string,
  rowValue: string,
  targetColumn?: string,
): Promise<ElementHandle> {
  const row = await selectRow(page, tableSelector, rowColumn, rowValue);
  const cell = await getCell(page, tableSelector, row, targetColumn || rowColumn);
  return cell;
}


