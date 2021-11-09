'use strict';

const replace = require('replace-in-file');

class ServerlessPluginCommon {
  constructor(serverless) {
    this.serverless = serverless;
    this.hooks = {
      'before:package:initialize': () => this.beforePackage(),
      'after:package:finalize': () => this.afterPackage(),
    };
  }

  /**
   * Update common path before package event.
   */
  // TODO: Remove hardcoded path
  async beforePackage() {
    this.serverless.cli.log('[serverless-plugin-common] Update Path');

    const options = {
      files: `${this.serverless.serviceDir}/**/*.js`,
      from: /..\/common/g,
      to: './common',
    };

    try {
      await replace(options);
      // console.debug('Replacement results:', results);
    } catch (error) {
      // TODO: Handle error
    }
  }

  /**
   * Reverse changes made in `beforePackage`
   */
  async afterPackage() {
    this.serverless.cli.log('[serverless-plugin-common] Clean Up');
    const options = {
      files: `${this.serverless.serviceDir}/**/*.js`,
      from: /.\/common/g,
      to: '../common',
    };

    try {
      await replace(options);
    } catch (error) {
      // TODO: Handle error
    }
  }
}

module.exports = ServerlessPluginCommon;
