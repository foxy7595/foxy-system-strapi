/* eslint-disable lines-around-directive */
/* eslint-disable import/no-extraneous-dependencies */
'use strict';

const strapiClient = require('@strapi/client');

module.exports = async () => {
  strapiClient.watch({ port: process.env.CLIENT_PORT || 3000 });
};
