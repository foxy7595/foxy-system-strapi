"use strict";

const todo = require("./todo");
const chatGptService = require("./chat-gpt.service");
const chatGptFillTypeService = require("./chatgpt-fill-type.service");

module.exports = {
  todo,
  chatGptService,
  "chatgpt-fill-type": chatGptFillTypeService,
};
