"use strict";

module.exports = {
  async find(ctx) {
    try {
      return await strapi
        .plugin("chatgpt-suggestion")
        .service("chatgpt-fill-type")
        .find(ctx.query);
    } catch (err) {
      console.log(err);
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    try {
      ctx.body = await strapi
        .plugin("chatgpt-suggestion")
        .service("chatgpt-fill-type")
        .delete(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      ctx.body = await strapi
        .plugin("chatgpt-suggestion")
        .service("chatgpt-fill-type")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      ctx.body = await strapi
        .plugin("chatgpt-suggestion")
        .service("chatgpt-fill-type")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
