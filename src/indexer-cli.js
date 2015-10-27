#!/usr/bin/env node

import Indexer from './indexer';

let indexer = new Indexer();

indexer.index(process.argv[1], process.argv[2]);
