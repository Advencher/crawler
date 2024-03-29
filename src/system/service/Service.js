import mongoose from 'mongoose';
import autoBind from 'auto-bind';
import HttpResponse from '../utilities/HttpResponse.js';

export default class Service {

  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async getAll(query) {
    let { skip, limit, sortBy } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;
    sortBy = sortBy ? sortBy : {createdAt: -1};

    delete query.skip;
    delete query.limit;
    delete query.sortBy;

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (error) {
        throw new Error('Not able to generate mongoose id with content');
      }
    }

    try {
      let items = await this.model
        .find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(limit);

      let total = await this.model.countDocuments(query);

      return new HttpResponse(items, {totalCount: total});
    } catch (errors) {
      throw errors;
    }
  }


  async get(id) {
    try {
      let item = await this.model.findById(id);
      if (!item) {
        let error = new Error('Item not found');
        error.statusCode = 404;
        throw error;
      }

      return new HttpResponse(item);
    } catch (errors) {
     throw errors;
    }
  }

  async insert(data) {
    try {
      let item = await this.model.create(data);
      if (item) {
        return new HttpResponse(item);
      } else {
        throw new Error('Something wrong happened');
      }
    } catch (error) {
      throw error;
    }
  }

  async insertMany(rowsToInsert) {
    try {
      let items = await this.model.insertMany(rowsToInsert);
      if (items) {
        return new HttpResponse(items);
      } else {
        throw new Error('Something wrong happened');
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return new HttpResponse(item);
    } catch (errors) {
      throw errors;
    }
  }

  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id);
      if (!item) {
        let error = new Error('Item not found');
        error.statusCode = 404;
        throw error;
      } else {
        return new HttpResponse(item, {deleted: true});
      }
    } catch (errors) {
      throw errors;
    }
  }
}
