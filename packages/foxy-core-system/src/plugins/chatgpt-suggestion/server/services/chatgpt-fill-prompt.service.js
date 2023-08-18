"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::chatgpt-suggestion.chatgpt-fill-prompt",
      query
    );
  },

  async delete(id) {
    return await strapi.entityService.delete(
      "plugin::chatgpt-suggestion.chatgpt-fill-prompt",
      id
    );
  },

  async create(data) {
    return await strapi.entityService.create(
      "plugin::chatgpt-suggestion.chatgpt-fill-prompt",
      data
    );
  },

  async update(id, data) {
    return await strapi.entityService.update(
      "plugin::chatgpt-suggestion.chatgpt-fill-prompt",
      id,
      data
    );
  },

  async ratingPrompt(id, data) {
    const rating = await strapi.entityService.findOne(
      "plugin::chatgpt-suggestion.chatgpt-prompt-rating",
      {}
    );
    console.log(rating);
    return [];
    // throw new Error("An error occurred");

    return await strapi.entityService.create(
      "plugin::chatgpt-suggestion.chatgpt-prompt-rating",
      data
    );
  },
});
