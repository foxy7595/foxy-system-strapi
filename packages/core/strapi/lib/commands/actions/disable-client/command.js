'use strict';

const { getLocalScript } = require('../../utils/helpers');

/**
 * `$ strapi watch-admin`
 * @param {import('../../../types/core/commands').AddCommandOptions} options
 */
module.exports = ({ command }) => {
  command
    .command('disable-client')
    .description('Disable to run client site')
    .action(getLocalScript('disable-client'));
};
