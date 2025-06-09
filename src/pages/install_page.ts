import { type Page } from "puppeteer-core";

export class InstallPage {
  private readonly page: Page;
  private readonly installingSpinner = `svg.pf-m-xl[role="progressbar"]`;
  private readonly installingProgressPage = `[data-testid="progress-report"]`;

  constructor(page: Page) {
    this.page = page;
  }

  async waitInstallProgressPage() {
    try {
      await this.page.waitForSelector(this.installingProgressPage, { timeout: 30000 });
      console.log("Progress report page detected successfully");
    } catch (error) {
      console.log("No progress report page was shown");
      console.log(`Reason: ${error.message}`);
    }
  }

  async waitInstallSpinner() {
    await this.page.waitForSelector(this.installingSpinner);
  }

  async waitForSpinnerToDisappear(): Promise<void> {
    const checkInterval = 10000; // 10 seconds
    const maxTimeout = 1200000; // 20 minutes
    const startTime = Date.now();

    while (Date.now() - startTime < maxTimeout) {
      const spinnerVisible = (await this.page.$(this.installingSpinner)) !== null;
      if (!spinnerVisible) {
        console.log("Spinnner is gone and Installation Finished.");
        return; // Spinner is no longer visible
      }
      await new Promise((resolve) => setTimeout(resolve, checkInterval));
    }
  }

  async waitInstallFinish(): Promise<void> {
    const checkInterval = 1000 * 10; // 10 seconds
    const maxTimeout = 1000 * 60 * 15; // 15 minutes
    const startTime = Date.now();

    while (Date.now() - startTime < maxTimeout) {
      try {
        await this.page.waitForSelector(this.installingSpinner, {
          hidden: true,
          timeout: checkInterval,
        });
        const timeTaken = (Date.now() - startTime) / 1000;
        console.log(`Installation completed. Time taken: ${timeTaken} seconds.`);
        return; // Spinner disappeared
      } catch {
        // Continue the loop if the spinner is still visible after the checkInterval
      }
      // Wait checkInterval before the next check
      await new Promise((resolve) => setTimeout(resolve, checkInterval));
    }
    throw new Error("Spinner did not disappear within the timeout period!");
  }
}
