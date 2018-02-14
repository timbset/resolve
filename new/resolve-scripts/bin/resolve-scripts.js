#!/usr/bin/env node
var path = require('path')

require('babel-polyfill')
require('babel-register')({
  only: /src/,
  presets: ['env', 'react']
})

// eslint-disable-next-line
require('yargs')
  .usage('resolve-scripts <command> [options]')
  .commandDir(path.resolve(__dirname, '..', 'src/commands'))
  .help('help').argv
