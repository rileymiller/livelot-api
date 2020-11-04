#!/bin/bash -el
mongod &
MOCHA_SCRIPT="mocha -r ts-node/register ./src/test/*.test.ts"
nodemon --watch . --ext ts --exec "${MOCHA_SCRIPT}"
