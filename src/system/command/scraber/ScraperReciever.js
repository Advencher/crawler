import puppeteer from 'puppeteer';
import autoBind from 'auto-bind';

export default class ScraperReciever {
  timeout = 6000;
  browser = undefined;
  frame = undefined;
  mapResults = new Map();
  currentPageContent = undefined;

  constructor(args) {
    this.nrOfPages = args.nrOfPages;
    autoBind(this);    
  }

  get currentContent() {
    return this.currentPageContent;
  }

  async scrapRes(keyLocatorCss) {
    let array = [];
    array = await this.mapResults.get(keyLocatorCss);
    return array;
  }

  async initScraberConfig(pageURL) {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
          "--no-sandbox",
          "--disable-gpu",
      ]
    });
    this.page = await this.browser.newPage();
    await this.page.setRequestInterception(true);
    this.page.on('request', (request) => {
          if (['image'].indexOf(request.resourceType()) !== -1) {
              request.abort();
          } else {
              request.continue();
          }
    });
    await this.page.on('console', msg => {
      for (let i = 0; i < msg._args.length; ++i) {
        msg._args[i].jsonValue().then(result => {
            console.log(result);
          })
        }
    });
    await this.page.goto(pageURL);
   
  }

  async closeBrowser () {
    await this.browser.close();
  }

  async clickButtonCommand(buttonLocatorCss) {
    try {
      await this.page.waitForSelector(buttonLocatorCss, { timeout: this.timeout });
      await this.page.click(buttonLocatorCss);
      this.currentPageContent = this.page.content();
      return true;
    } catch (error) {
      throw new Error(`error clicking a button: ${buttonLocatorCss}: ${JSON.stringify(error)}`, error);
    }
  }

  async inputTextCommand(inputLocatorCss, textToInput) {
    try {
      await this.page.waitForSelector(inputLocatorCss, { timeout: this.timeout });
      await this.page.type(inputLocatorCss, textToInput);
      this.currentPageContent = this.page.content();
      return true;
    } catch (error) {
      throw new Error(`error inputing text to a field: ${inputLocatorCss}: ${JSON.stringify(error)}`, error);
    }
  }

  async scrabHTMLTableContent(locatorCss) {
    const arrayFromTable =  await this.page.$$eval(locatorCss.trSelector, (rows, tdSelector) => {  
      return Array.from(rows, row => 
        {
          let tds = row.querySelectorAll(tdSelector);
          return Array.from (tds, td => td.textContent);
        });
    }, locatorCss.tdSelector);
    return this.mapResults.set(JSON.stringify(locatorCss), arrayFromTable);
  }
}
