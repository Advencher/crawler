import mongoose from "mongoose";

export default class Ticket {
  initSchema() {
    const schema = new mongoose.Schema({
      identifier: {
        desc: "ticketId",
        trim: true,
        type: String,
        index: true,
        unique: true,
        required: true,
      },
      sendDate: {
        desc: "sendDate",
        trim: true,
        type: String,
        required: false,
      },
      updateDate: {
        desc: "updateDate",
        trim: true,
        type: String,
        required: false,
      },
      category: {
        desc: "category",
        type: String,
        trim: true,
        required: false,
      },
      trueName: {
        desc: "trueName",
        type: String,
        trim: true,
        required: false,
      },
      topic: {
        desc: "topic",
        type: String,
        trim: true,
        required: false,
      },
      status: {
        desc: "status",
        type: String,
        trim: true,
        required: false,
      },

      owner: {
        desc: "owner",
        trim: true,
        type: String,
        required: false,
      },
      lastAnswerer: {
        desc: "lastAnswerer",
        type: String,
        trim: true,
        required: false,
      },
      timeSpend: {
        desc: "timeSpend",
        type: String,
        trim: true,
        required: false,
      },
      shop: {
        desc: "shop",
        type: String,
        trim: true,
        required: false,
      },
      phone: {
        desc: "phone",
        type: String,
        trim: true,
        required: false,
      },
      priority: {
        desc: "priority",
        type: String,
        trim: true,
        required: false,
      },
    });

    try {
      mongoose.model( 'tickets', schema );
    } catch ( e ) {

    }


  }

  getInstance() {
    this.initSchema();
    return mongoose.model( 'tickets' );
  }


}

