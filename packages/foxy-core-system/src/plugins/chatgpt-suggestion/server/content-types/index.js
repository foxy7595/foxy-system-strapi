"use strict";
const todo = require("./todo");
const chatgptFillPrompt = require("./chatgpt-fill-prompt");
const chatgptFillType = require("./chatgpt-fill-type");
const chatgptFillPromptRating = require("./chatgpt-fill-prompt-rating");

module.exports = {
  todo,
  "chatgpt-fill-prompt": chatgptFillPrompt,
  "chatgpt-fill-type": chatgptFillType,
  "chatgpt-prompt-rating": chatgptFillPromptRating,
};
