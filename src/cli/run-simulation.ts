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
  defaultSense: number;
  useSense: boolean;
  mutateSense: boolean;
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
  const { sumSpeeds: sum, minSpeed: min, maxSpeed: max } = playerSpeeds.reduce(
    ({ sumSpeeds, minSpeed, maxSpeed }, next) => {
      return {
        sumSpeeds: sumSpeeds + next,
        minSpeed: next < minSpeed ? next : minSpeed,
        maxSpeed: next > maxSpeed ? next : maxSpeed,
      };
    },
    {
      sumSpeeds: 0,
      minSpeed: 1,
      maxSpeed: 0,
    },
  );
  const meanSpeed = sum / playerSpeeds.length;
  const medianSpeed = median(playerSpeeds);

  const playerSenses = ground.players.map(({ sense }) => sense);
  const { sumSense, minSense, maxSense } = playerSenses.reduce(
    ({ sumSense: sumSpeeds, minSense: minSpeed, maxSense: maxSpeed }, next) => {
      return {
        sumSense: sumSpeeds + next,
        minSense: next < minSpeed ? next : minSpeed,
        maxSense: next > maxSpeed ? next : maxSpeed,
      };
    },
    {
      sumSense: 0,
      minSense: 1,
      maxSense: 0,
    },
  );
  const meanSense = sumSense / playerSenses.length;
  const medianSense = median(playerSenses);

  console.log(`Num of Players: ${ground.players.length}`);
  console.log(`Num of Food:    ${ground.food.length}`);
  console.log(`Mean Speed:     ${meanSpeed}    : Mean Sense     ${meanSense}`);
  console.log(`Median Speed:   ${medianSpeed}  : Median Sense   ${medianSense}`);
  console.log(`Min Speed:      ${min}          : Min Sense      ${minSense}`);
  console.log(`Max Speed:      ${max}          : Max Sense      ${maxSense}`);
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
    useSense,
    defaultSense,
    mutateSense,
  }) => {
    setOverrides({
      energyAdditionForFood,
      startingPlayerEnergy,
      shouldMutateSpeed,
      startingPlayerSpeed,
      defaultPlayerTimeToLive,
      useTimeToLive,
      useSense,
      defaultSense,
      mutateSense,
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
        describe:
          'The width of the ground the players will move around in. The width defines how many turns a player with 1 speed will take to cross from the left most position to the right most position on the ground. A player with 1 speed will take 10 turns to move from the left edge to the right edge of a ground of width 10.',
        demandOption: false,
        type: 'number',
        default: 10,
      })
      .option('height', {
        describe:
          'The height of the ground the players will move around in.The height defines how many turns a player with 1 speed will take to cross from the top most position to the bottom most position on the ground. A player with 1 speed will take 10 turns to move from the top edge to the bottom edge of a ground of width 10.',
        demandOption: false,
        type: 'number',
        default: 10,
      })
      .option('maxNumOfTurns', {
        describe:
          'The maximum number of turns to play. The program runs until there are no more players on the ground or until the max number of turns are played',
        type: 'number',
        default: 10000,
        demandOption: false,
      })
      .option('initalNumOfPlayers', {
        describe:
          'The number of players on the ground on the first turn. These players will be put in random positions on the ground.',
        type: 'number',
        default: 10,
        demandOption: false,
      })
      .option('startingPlayerEnergy', {
        describe: 'The amount of energy a newly created player starts with.',
        type: 'number',
        default: 1000,
        demandOption: false,
      })
      .option('useTimeToLive', {
        describe:
          'Should a player have a time to live. If this is not set, then a player lives until their energy runs out.',
        demandOption: false,
        default: true,
        type: 'boolean',
      })
      .option('defaultPlayerTimeToLive', {
        describe: 'The mamimum number of turns a player can be alive for. Is only respected if useTimeToLive is set.',
        type: 'number',
        default: 100,
        demandOption: false,
      })
      .option('useSense', {
        describe:
          'Should players be able to see what is around them. If not set, the player always moves in a random direction.',
        demandOption: false,
        default: true,
        type: 'boolean',
      })
      .option('defaultSense', {
        describe: 'How many positions around the players on the ground on the first turn should be able so see.',
        demandOption: false,
        default: 1,
        type: 'number',
      })
      .option('mutateSense', {
        describe: 'Should a child player sense mutate from their parent during reproducton.',
        demandOption: false,
        default: true,
        type: 'boolean',
      })
      .option('startingPlayerSpeed', {
        describe: 'The speed of players on the ground on the first turn.',
        type: 'number',
        default: 1,
        demandOption: false,
      })
      .option('shouldMutateSpeed', {
        describe: 'Should a child player speed mutate from their parent during reproducton.',
        type: 'boolean',
        default: true,
        demandOption: false,
      })
      .option('initialNumOfFood', {
        describe:
          'The number of pieces of food on the ground on the first turn. This food will be put in random positions on the ground.',
        type: 'number',
        default: 10,
        demandOption: false,
      })
      .option('numOfTurnsBetweenFood', {
        describe:
          'The number of turns between addition on new food to the ground. The amount of food added will be dependant on the initialNumOfFood parameter.',
        type: 'number',
        default: 1000,
        demandOption: false,
      })
      .option('energyAdditionForFood', {
        describe: 'The amount of energy a player gains from eating this food.',
        type: 'number',
        default: 1000,
        demandOption: false,
      })
      .usage('$0 Runs the natural selection simulation with output in the terminal')
      .version(false)
      .strict()
      .help();
  },
};
/* eslint-enable no-console*/
