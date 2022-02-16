import ClickButtonCommand from "../system/command/scraber/ClickButtonCommand.js";
import GetItemsCommand from "../system/command/scraber/GetItemsCommand.js";
import TypeTextCommand from "../system/command/scraber/TypeTextCommand.js";
import ScraperReciever from "../system/command/scraber/ScraperReciever.js";
import CommandsQueue from "../system/command/scraber/CommandQueue.js";
import InstructedScrabingInvoker from "../system/command/scraber/InstructedScrabingInvoker.js";
import autoBind from "auto-bind";


export default class ScraberMainLogic {
  static instance;
  operations = [];
  
  constructor(nrOfPages = 1) {
    this.instructedScrabingInvoker = new InstructedScrabingInvoker();
    this.scraberReciever = new ScraperReciever({
      nrOfPages: nrOfPages});
    this.pageURL = process.env.PAGE_URL;
    autoBind(this);
  }

  set setPageURL(url) {
    this.pageURL = url;
  }

  initCommandSequence (operations) {
    this.operations = operations;
    let command_sequence = [];
    for (let operation of this.operations) {
      switch (operation.type) {
        case "type":
          command_sequence.push(new TypeTextCommand(this.scraberReciever, operation.locatorCss, operation.inputData));
        break;
        case "click":
          command_sequence.push(new ClickButtonCommand(this.scraberReciever, operation.locatorCss));
        break;
        case "getItems":
          command_sequence.push(new GetItemsCommand(this.scraberReciever, operation.locatorCss));
        break;
        default:
         throw new Error(`Unknown command type ${operation.type}`);
      }
    }
    this.instructedScrabingInvoker.setCommand(new CommandsQueue(this.scraberReciever, ...command_sequence));
  }


  async runPuppeteer() {
    try {
      await this.scraberReciever.initScraberConfig(this.pageURL);
      await this.instructedScrabingInvoker.execute();
      await this.scraberReciever.closeBrowser();
    } catch (error) {
      throw new Error(error);
    }
    return true;
  }

  readScrapingResult (keyLocatorCss) {
    return this.scraberReciever.scrapRes(keyLocatorCss);
  }

}
