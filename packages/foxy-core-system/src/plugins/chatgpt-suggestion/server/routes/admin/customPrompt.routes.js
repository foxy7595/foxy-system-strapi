"use strict";

module.exports = [
  {
    method: "GET",
    path: "/chatgpt-fill-prompt/find",
    handler: "chatgpt-fill-prompt.find",
    config: {
      policies: [],
    },
  },

  {
    method: "POST",
    path: "/chatgpt-fill-prompt/create",
    handler: "chatgpt-fill-prompt.create",
    config: {
      policies: [],
    },
  },

  {
    method: "DELETE",
    path: "/chatgpt-fill-prompt/delete/:id",
    handler: "chatgpt-fill-prompt.delete",
    config: {
      policies: [],
    },
  },

  {
    method: "PUT",
    path: "/rating/:id",
    handler: "chatgpt-fill-prompt.rating",
    config: {
      policies: [],
    },
  },

  {
    method: "PUT",
    path: "/chatgpt-fill-prompt/update/:id",
    handler: "chatgpt-fill-prompt.update",
    config: {
      policies: [],
    },
  },
];
