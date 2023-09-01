'use strict';

const execa = require('execa');
const strapi = require('../../..');
const { buildAdmin } = require('../../builders');

/**
 * `$ strapi build`
 */
module.exports = async ({ optimization, forceBuild = true }) => {
  const { appDir, distDir } = await strapi.compile();
  execa('npx', ['next', 'build'], {
    stdio: 'inherit',
  });
  await buildAdmin({
    forceBuild,
    optimization,
    buildDestDir: distDir,
    srcDir: appDir,
  });
};
