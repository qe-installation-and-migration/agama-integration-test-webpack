import fs from "fs";
import path from "path";
import * as puppeteer from "puppeteer-core";

interface TestStep {
  name: string;
  number: string;
  status: "passed" | "failed";
  timestamp: number;
  screenshotPath: string; // Relative path to the report directory
  error?: string;
}

export class HtmlReportGenerator {
  private reportDir: string;
  private screenshotsDir: string;
  private steps: TestStep[] = [];
  private startTime: number;
  private intervalId: NodeJS.Timeout | null = null;
  private isCapturing = false;
  private currentTestName: string = "Initialization";
  private currentTestIndex: number = 0;
  private currentStepIndex: number = 0;
  private testSuiteName: string = "Agama Integration Test";
  private testResults: { name: string; status: "passed" | "failed"; error?: string }[] = [];

  constructor(outputDir: string = "report") {
    this.reportDir = outputDir;
    this.screenshotsDir = path.join(this.reportDir, "screenshots");
    this.startTime = Date.now();
    this.init();
  }

  private init() {
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
    if (!fs.existsSync(this.screenshotsDir)) {
      fs.mkdirSync(this.screenshotsDir, { recursive: true });
    }
  }

  public setCurrentTestName(name: string) {
    this.currentTestName = name;
    this.currentTestIndex++;
    this.currentStepIndex = 0;
  }

  public setTestSuiteName(name: string) {
    this.testSuiteName = name;
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      let message = error.stack || error.message;
      if (error.cause) {
        message += `\n\nCaused by:\n${this.formatError(error.cause)}`;
      }
      return message;
    }
    return String(error);
  }

  public addTestResult(name: string, status: "passed" | "failed", error?: unknown) {
    this.testResults.push({
      name,
      status,
      error: error ? String(error) : undefined,
    });
  }

  public startPolling(page: puppeteer.Page, intervalMs: number = 500) {
    if (this.intervalId) return;
    this.intervalId = setInterval(async () => {
      if (this.isCapturing) return;
      this.isCapturing = true;
      try {
        if (!page.isClosed()) {
          await this.addStep(page, this.currentTestName, "passed");
        }
      } catch {
        // Ignore errors during auto-capture (e.g. navigation, browser closing)
      } finally {
        this.isCapturing = false;
      }
    }, intervalMs);
  }

  public stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public async addStep(page: puppeteer.Page, name: string, status: "passed" | "failed", error?: unknown) {
    const timestamp = Date.now();
    this.currentStepIndex++;
    const stepNumber = `${this.currentTestIndex}.${this.currentStepIndex}`;

    // Sanitized filename
    const safeName = name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
    const filename = `${this.steps.length + 1}_${safeName}_${timestamp}.jpg`;
    const filePath = path.join(this.screenshotsDir, filename);

    try {
      // Use JPEG for smaller file size
      await page.screenshot({ path: filePath, type: "jpeg", quality: 60 });
    } catch (e) {
      console.error(`Failed to take screenshot for step ${name}:`, e);
      return; // Skip adding step if screenshot fails
    }

    this.steps.push({
      name,
      number: stepNumber,
      status,
      timestamp,
      screenshotPath: `screenshots/${filename}`,
      error: error
        ? `${this.formatError(error)}\n\nLocation: ${page.url()}`
        : undefined,
    });
  }

  public generateReport() {
    const html = this.buildHtml();
    fs.writeFileSync(path.join(this.reportDir, "index.html"), html);
    console.log(`HTML Report generated at: ${path.join(this.reportDir, "index.html")}`);
  }

  private buildHtml(): string {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    const passedCount = this.testResults.filter((s) => s.status === "passed").length;
    const failedCount = this.testResults.filter((s) => s.status === "failed").length;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.testSuiteName} Report</title>
    <style>
        body { font-family: sans-serif; margin: 0; padding: 0; background: #f0f0f0; display: flex; flex-direction: column; height: 100vh; }
        header { background: #333; color: white; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; }
        .stats { font-size: 0.9em; }
        .stats span { margin-left: 15px; }
        .passed { color: #4caf50; }
        .failed { color: #f44336; }
        
        #main-container { flex: 1; display: flex; overflow: hidden; }
        #viewer { flex: 1; background: #222; display: flex; justify-content: center; align-items: center; position: relative; }
        #viewer img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        #overlay { 
            position: absolute; bottom: 20px; left: 20px; background: rgba(0,0,0,0.7); 
            color: white; padding: 10px; border-radius: 5px; pointer-events: none; 
        }
        
        #sidebar { width: 300px; background: white; overflow-y: auto; border-left: 1px solid #ddd; display: flex; flex-direction: column; }
        .step-item { 
            padding: 10px; border-bottom: 1px solid #eee; cursor: pointer; display: flex; gap: 10px; align-items: center; 
        }
        .step-item:hover { background: #f9f9f9; }
        .step-item.active { background: #e3f2fd; border-left: 4px solid #2196f3; }
        .step-item.failed { background: #ffebee; border-left: 4px solid #f44336; }
        
        .thumb { width: 80px; height: 50px; object-fit: cover; background: #ddd; border-radius: 4px; }
        .step-info { flex: 1; overflow: hidden; }
        .step-name { font-weight: bold; font-size: 0.9em; word-break: break-word; }
        .step-time { font-size: 0.75em; color: #666; }
        
        #error-detail { 
            display: none; padding: 10px 15px; background: #ffebee; color: #b71c1c; border-bottom: 1px solid #ef9a9a; font-family: monospace; font-size: 0.9em;
        }
        .error-header { display: flex; justify-content: space-between; align-items: center; }
        .error-toggle { 
            background: #d32f2f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.9em;
        }
        .error-toggle:hover { background: #b71c1c; }
        .error-content { display: none; white-space: pre-wrap; margin-top: 10px; overflow-x: auto; }

        /* Responsive */
        @media (max-width: 800px) {
            #main-container { flex-direction: column; }
            #sidebar { width: 100%; height: 150px; flex-direction: row; overflow-x: auto; overflow-y: hidden; }
            .step-item { width: 200px; flex-shrink: 0; border-right: 1px solid #eee; border-bottom: none; }
        }
    </style>
</head>
<body>
    <header>
        <div><strong>Agama Integration Test: ${this.testSuiteName}</strong></div>
        <div class="stats">
            <span>Duration: ${duration}s</span>
            <span class="passed">Passed: ${passedCount}</span>
            <span class="failed">Failed: ${failedCount}</span>
        </div>
    </header>

    <div id="error-detail">
        <div class="error-header">
            <strong>Step Failed</strong>
            <button class="error-toggle" onclick="toggleError()">Show Details</button>
        </div>
        <div id="error-text" class="error-content"></div>
    </div>

    <div id="main-container">
        <div id="viewer">
            <img id="main-image" src="" alt="Step Screenshot">
            <div id="overlay">
                <div id="overlay-step">Select a step</div>
                <div id="overlay-time"></div>
            </div>
        </div>
        <div id="sidebar">
            ${this.steps.map((step, index) => `
                <div class="step-item ${step.status === 'failed' ? 'failed' : ''}" onclick="selectStep(${index})" id="step-${index}">
                    <img src="${step.screenshotPath}" class="thumb" loading="lazy">
                    <div class="step-info">
                        <div class="step-name">${step.number}. ${step.name}</div>
                        <div class="step-time">${new Date(step.timestamp).toLocaleTimeString()}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

    <script>
        const steps = ${JSON.stringify(this.steps)};
        let currentIndex = 0;

        function toggleError() {
            const content = document.getElementById('error-text');
            const btn = document.querySelector('.error-toggle');
            if (content.style.display === 'block') {
                content.style.display = 'none';
                btn.textContent = 'Show Details';
            } else {
                content.style.display = 'block';
                btn.textContent = 'Hide Details';
            }
        }

        function selectStep(index) {
            if (index < 0 || index >= steps.length) return;
            currentIndex = index;
            
            const step = steps[index];
            document.getElementById('main-image').src = step.screenshotPath;
            document.getElementById('overlay-step').textContent = step.number + ". " + step.name;
            document.getElementById('overlay-time').textContent = new Date(step.timestamp).toLocaleString();
            
            // Highlight sidebar
            document.querySelectorAll('.step-item').forEach(el => el.classList.remove('active'));
            document.getElementById('step-' + index).classList.add('active');
            
            // Error handling
            const errorDiv = document.getElementById('error-detail');
            const errorText = document.getElementById('error-text');
            const errorBtn = document.querySelector('.error-toggle');
            
            if (step.error) {
                errorDiv.style.display = 'block';
                errorText.textContent = step.error;
                // Reset state to collapsed
                errorText.style.display = 'none';
                errorBtn.textContent = 'Show Details';
            } else {
                errorDiv.style.display = 'none';
            }
            
            // Scroll sidebar if needed
            document.getElementById('step-' + index).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        // Initialize with first step or failure
        const firstFailure = steps.findIndex(s => s.status === 'failed');
        selectStep(firstFailure >= 0 ? firstFailure : 0);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') selectStep(currentIndex + 1);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') selectStep(currentIndex - 1);
        });
    </script>
</body>
</html>
    `;
  }
}
