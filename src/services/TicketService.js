import autoBind from "auto-bind";
import Service from "../system/service/Service.js";
import ArrayModelObjectOrganizer from "../system/utilities/ArrayModelObjectOrganizer.js";

export default class TicketService extends Service {
  updateOptions = {
    upsert: true,
    new: true,
  };

  constructor(ticketModel) {
    super(ticketModel);
    this.model = ticketModel;
    autoBind(this);
  }

  async addManyIfNotExists(formattedTickets) {
    formattedTickets =
      ArrayModelObjectOrganizer.ticketModelDestructor(formattedTickets);
    try {
      for (let i = 0; i < formattedTickets.length; i++) {
        formattedTickets[i] = this.model.findOneAndUpdate(
          { identifier: formattedTickets[i].identifier },
          formattedTickets[i],
          this.updateOptions
        );
      }
    } catch (error) {
      throw new Error(error);
    }
    return formattedTickets;
  }
}
