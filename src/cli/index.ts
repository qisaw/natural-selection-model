#! /usr/bin/env node
import yargs from 'yargs';
import { command } from './run-simulation';

yargs
  .usage('$0 command')
  .command(command)
  .demandCommand()
  .wrap(80)
  .version('0.0.1').argv;
