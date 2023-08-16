"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::chatgpt-suggestion.todo",
      query
    );
  },

  async delete(id) {
    return await strapi.entityService.delete(
      "plugin::chatgpt-suggestion.todo",
      id
    );
  },

  async create(data) {
    return await strapi.entityService.create(
      "plugin::chatgpt-suggestion.todo",
      data
    );
  },

  async update(id, data) {
    return await strapi.entityService.update(
      "plugin::chatgpt-suggestion.todo",
      id,
      data
    );
  },

  async toggle(id) {
    const result = await strapi.entityService.findOne(
      "plugin::chatgpt-suggestion.todo",
      id
    );
    return await strapi.entityService.update(
      "plugin::chatgpt-suggestion.todo",
      id,
      {
        data: { isDone: !result.isDone },
      }
    );
  },
});
