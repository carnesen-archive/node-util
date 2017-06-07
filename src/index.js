'use strict'
const childProcess = require('child_process')
const expandHomeDir = require('expand-home-dir')

const {promisify} = require('@carnesen/util')
const fs = require('fs-extra')
const tmp = require('tmp')

function promisifyChildProcessMethod (methodName) {
  return promisify(childProcess[methodName], {
    resolveMultiple: ['stdout', 'stderr'],
    rejectMultiple: ['stdout', 'stderr'],
  })
}

module.exports = {
  copy: promisify(fs.copy),
  createTmpDir: promisify(tmp.dir, {
    resolveMultiple: ['path', 'cleanupCallback'],
  }),
  createTmpFile: promisify(tmp.file, {
    resolveMultiple: ['path', 'fd', 'cleanupCallback'],
  }),
  emptyDir: promisify(fs.emptyDir),
  ensureDir: promisify(fs.ensureDir),
  exec: promisifyChildProcessMethod('exec'),
  execFile: promisifyChildProcessMethod('execFile'),
  expandHomeDir: expandHomeDir,
  readdir: promisify(fs.readdir),
  readFile: promisify(fs.readFile),
  remove: promisify(fs.remove),
  rename: promisify(fs.rename),
  stat: promisify(fs.stat),
  writeFile: promisify(fs.writeFile),
}
