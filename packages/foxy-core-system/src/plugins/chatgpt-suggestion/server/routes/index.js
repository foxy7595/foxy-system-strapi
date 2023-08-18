const adminRoutes = require("./admin");
const chatGptRoutes = require("./chatGPT.routes");
module.exports = {
  "admin-api": adminRoutes,
  "content-api": chatGptRoutes,
};
