import BaseController from "../system/controller/BaseController.js";
import TicketService from "../services/TicketService.js";
import ScraberMainLogic from "../services/ScraberMainLogic.js";
import Ticket from "../models/Ticket.js";
import dotenv from "dotenv";
import autoBind from "auto-bind";

const ticketService = new TicketService(new Ticket().getInstance());
dotenv.config();

class TicketController extends BaseController {
  constructor(service) {
    super(service);
    this.scraberMainLogic = new ScraberMainLogic();
    autoBind(this);
  }

  async instructedScrabing(req, res, next) {
    let success = undefined;    
    if (req.body.commands === undefined)
      next(new Error('no commands provided in body params'));
    try {
      let commands = JSON.parse(req.body.commands);
      await this.scraberMainLogic.initCommandSequence(commands);
      success = await this.scraberMainLogic.runPuppeteer();
      if (success) {
        
        if (req.body.locatorCss !== undefined)
        {
          let keyLocatorCss = JSON.stringify(JSON.parse(req.body.locatorCss));
          let mapQueryResult = await this.scraberMainLogic.readScrapingResult(
            keyLocatorCss
          );
          if (mapQueryResult === undefined)
            throw new Error(`No such element with the key: ${keyLocatorCss}`);
          this.service.addManyIfNotExists(mapQueryResult);
          return res.status(200).json({updated: true});
        }
        return res.status(200).json({updated: false});
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketController(ticketService);
