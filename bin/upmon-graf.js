#!/usr/bin/env node
var graf = require('../')

process.stdin.pipe(graf()).pipe(process.stdout)
