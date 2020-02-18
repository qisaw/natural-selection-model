#! /usr/bin/env node
import yargs from 'yargs';
import { command } from './run-simulation';
import { version } from '../../package.json';

yargs
  .usage('$0 command')
  .command(command)
  .demandCommand()
  .wrap(80)
  .version(version).argv;
