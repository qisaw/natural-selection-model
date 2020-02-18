/* eslint-disable no-console*/
import { CommandModule } from 'yargs';
import median from 'median';

import { createGround } from '../ground/create-ground';
import { getGroundAsString } from '../ground/get-ground-as-string';
import { createPlayersInRandomPositions } from '../player/create-players-in-random-positions';
import { getNewFoodToAddToBoard } from '../food/get-new-food-to-add-to-board';
import { Ground } from '../ground/types';
import { makeMove } from '../ground/make-move';
import { addNewFoodToGround } from '../food/add-food-to-ground';
import { setOverrides } from '../settings';

type Arguments = {
  width: number;
  height: number;
  initalNumOfPlayers: number;
  initialNumOfFood: number;
  maxNumOfTurns: number;
  numOfTurnsBetweenFood: number;
  energyAdditionForFood: number;
  startingPlayerEnergy: number;
  shouldMutateSpeed: boolean;
  startingPlayerSpeed: number;
  defaultPlayerTimeToLive: number;
  useTimeToLive: boolean;
};

const printLine = (word: string, ground: Ground): void => {
  const length = ground.dimensions.width * 4 + 1;
  const lineLength = length - word.length - 2;
  const prefixLength = Math.floor(lineLength / 2);
  const suffixLength = lineLength - prefixLength;
  const prefix = new Array(prefixLength).fill('-').join('');
  const suffix = new Array(suffixLength).fill('-').join('');
  console.log(`${prefix} ${word} ${suffix}`);
};

const printStats = (ground: Ground): void => {
  printLine('RESULTS', ground);
  const playerSpeeds = ground.players.map(({ speed }) => speed);
  const meanSpeed = playerSpeeds.reduce((sum, next) => sum + next, 0) / playerSpeeds.length;
  const medianSpeed = median(playerSpeeds);
  console.log(`Num of Players: ${ground.players.length}`);
  console.log(`Num of Food:    ${ground.food.length}`);
  console.log(`Mean Speed:     ${meanSpeed}`);
  console.log(`Median Speed:   ${medianSpeed}`);
  printLine('DONE', ground);
};

const printGround = (turn: number, ground: Ground): void => {
  printLine('GROUND', ground);
  printLine(`TURN ${turn}`, ground);
  console.log(getGroundAsString(ground));
};

export const command: CommandModule<{}, Arguments> = {
  command: 'run-simulation',
  describe: 'Run the natural selection simulation in your terminal',
  aliases: ['sim'],
  handler: ({
    width,
    height,
    initalNumOfPlayers,
    initialNumOfFood,
    maxNumOfTurns,
    numOfTurnsBetweenFood,
    energyAdditionForFood,
    startingPlayerEnergy,
    shouldMutateSpeed,
    startingPlayerSpeed,
    defaultPlayerTimeToLive,
    useTimeToLive,
  }) => {
    setOverrides({
      energyAdditionForFood,
      startingPlayerEnergy,
      shouldMutateSpeed,
      startingPlayerSpeed,
      defaultPlayerTimeToLive,
      useTimeToLive,
    });
    const dimensions = { height, width };
    const players = createPlayersInRandomPositions(initalNumOfPlayers, dimensions, [], []);
    const food = getNewFoodToAddToBoard(initialNumOfFood, dimensions, players, []);
    let ground = createGround({
      dimensions,
      players,
      food,
    });
    let turn = 0;
    while (ground.players.length && turn < maxNumOfTurns) {
      turn++;
      if (turn % (numOfTurnsBetweenFood + 1) === 0) {
        const newFood = getNewFoodToAddToBoard(initialNumOfFood, dimensions, ground.players, ground.food);
        ground = addNewFoodToGround(ground, newFood);
      }
      ground = makeMove(ground);
      console.clear();
      printGround(turn, ground);
      printStats(ground);
    }
  },
  builder: yargs => {
    return yargs
      .option('width', {
        describe: 'The width of the ground the players will move on',
        demandOption: false,
        type: 'number',
        default: 10,
      })
      .option('height', {
        describe: 'The height of the ground the players will move on',
        demandOption: false,
        type: 'number',
        default: 10,
      })
      .option('initalNumOfPlayers', {
        describe: 'The number of players that should be placed on the board at the beginning',
        type: 'number',
        default: 10,
        demandOption: false,
      })
      .option('initialNumOfFood', {
        describe: 'The amount of players that should be placed on the board at the beginning',
        type: 'number',
        default: 10,
        demandOption: false,
      })
      .option('maxNumOfTurns', {
        describe:
          'The maximum number of turns to play. The program runs until there are no more players on the board or until the max number of turns are played',
        type: 'number',
        default: 10000,
        demandOption: false,
      })
      .option('numOfTurnsBetweenFood', {
        describe: 'The number of turns between addition of food',
        type: 'number',
        default: 1000,
        demandOption: false,
      })
      .option('energyAdditionForFood', {
        describe: 'The amount of energy eating food gives a player',
        type: 'number',
        default: 1000,
        demandOption: false,
      })
      .option('startingPlayerEnergy', {
        describe: 'The number of moves a player with 1 speed can move before dying',
        type: 'number',
        default: 1000,
        demandOption: false,
      })
      .option('shouldMutateSpeed', {
        describe: 'Shoud the simulation mutate speed',
        type: 'boolean',
        default: true,
        demandOption: false,
      })
      .option('startingPlayerSpeed', {
        describe: 'The initial speed of all the players',
        type: 'number',
        default: 1,
        demandOption: false,
      })
      .option('defaultPlayerTimeToLive', {
        describe: 'The number of turns a player can be alive for',
        type: 'number',
        default: 100,
        demandOption: false,
      })
      .option('useTimeToLive', {
        describe: 'Should a player have a time to live. If this is set, then defaultPlayerTimeToLive is ignored',
        demandOption: false,
        default: true,
        type: 'boolean',
      })
      .usage('$0 Runs the natural selection simulation with output in the terminal')
      .version(false)
      .strict()
      .help();
  },
};
/* eslint-enable no-console*/
