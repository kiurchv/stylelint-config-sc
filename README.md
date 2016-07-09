stylelint-config-sc
===================

Sunshine Code's shareable config for [stylelint](http://stylelint.io).

This config is based on the [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) and includes our own customizations.

Installation
------------

```console
$ npm install stylelint-config-sc
```

If you use [frontend-cli](https://github.com/sunshine-code/frontend-cli) there is no need to install this config as `frontend-cli` depends on it.

Usage
-----

Add `"extends": "stylelint-config-sc"` to your stylelint config.

### Extending

Simply add a `"rules"` key to your config, then add your overrides and additions there.

Improving this config
---------------------

Consider adding test cases if you're making complicated rules changes, like anything involving regexes.

You can run tests with `npm test`.
