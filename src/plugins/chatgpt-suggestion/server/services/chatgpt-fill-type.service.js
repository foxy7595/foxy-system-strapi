"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::chatgpt-suggestion.chatgpt-fill-type",
      query
    );
  },

  async delete(id) {
    return await strapi.entityService.delete(
      "plugin::chatgpt-suggestion.chatgpt-fill-type",
      id
    );
  },

  async create(data) {
    return await strapi.entityService.create(
      "plugin::chatgpt-suggestion.chatgpt-fill-type",
      data
    );
  },

  async update(id, data) {
    return await strapi.entityService.update(
      "plugin::chatgpt-suggestion.chatgpt-fill-type",
      id,
      data
    );
  },
});
