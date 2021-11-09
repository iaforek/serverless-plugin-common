# Serverless Plugin Common

Simple plugin that updates `../common/` path and replaces it with `./common` during serverless package step.

Currently, `serverless-plugin-common` is very simple. Technically, you can achieve the same result by creating a symlink `ln -s ../common common` and updating manually `require` functions to be:

```javascript
const lib = require('./common/lib');
```

However, using this plugin allows you to use shared `common` directory without the need of symlinking:

```javascript
const lib = require('../common/lib');
```

During packaging, the plugin will update the path. Thus, you don't need to manually change anything.

## How To Use?

In your `serverless.yml` add:

```yml
package:
  individually: true
  patterns:
    - ../common/**

plugins:
  - serverless-plugin-common
```

This will copy `common` directory to your lambda root directory and `serverless-plugin-common` will update the path accordingly.

## TODO - Known Issues

- Path is hardcoded
- Add examples
