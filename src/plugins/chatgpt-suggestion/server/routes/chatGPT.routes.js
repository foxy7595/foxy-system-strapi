"use strict";

module.exports = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/chatgpt-fill-type/find",
      handler: "chatgpt-fill-type.find",
      config: {
        policies: [],
      },
    },
  ],
};
