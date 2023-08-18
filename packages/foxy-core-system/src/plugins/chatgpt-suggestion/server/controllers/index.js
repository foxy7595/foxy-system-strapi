"use strict";

const todo = require("./todo");
const chatGptController = require("./chat-gpt.controller");
const chatGptFillTypeController = require("./chatgpt-fill-type.controller");
const chatGptFillPromptController = require("./chatgpt-fill-prompt.controller");

module.exports = {
  todo,
  chatGptController,
  "chatgpt-fill-type": chatGptFillTypeController,
  "chatgpt-fill-prompt": chatGptFillPromptController,
};
