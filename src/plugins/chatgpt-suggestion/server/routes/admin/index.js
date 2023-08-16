"use strict";
const promptRoutes = require("./prompt.routes");
const todoRoutes = require("./todo.routes");
const customPromptRoutes = require("./customPrompt.routes");

module.exports = {
  routes: [].concat(promptRoutes, todoRoutes, customPromptRoutes),
};
