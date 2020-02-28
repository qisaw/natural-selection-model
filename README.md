# Natural Selection Model

![](https://github.com/qisaw/natural-selection-model/workflows/Node.js%20CI/badge.svg)

> :warning: **This package is currently in BETA and not feature complete. This means breaking changes to the api may be made at any time. Be careful when upgrading!! Follow the progress toward feature completion [here](https://github.com/qisaw/natural-selection-model/milestone/1) and keep up to date on work in progress [here](https://github.com/qisaw/natural-selection-model/projects/1).** 

## Introducton
`@TODO add introduction`

## Goals
`@TODO add goals here.`

## Background
`@TODO add backround`

## Motivation
`@TODO add motivation`

## Installation
`@TODO add installation instructions`

## Documentation
`@TODO add rules and more documentation on how to use.`

### Vocabulary
`@TODO terms and definitions`

### Parameters
You may use the following parameters to configure different aspects of the simulation. The following options can be varied both in the cli command and programatically via the library.

#### General
The following parameters are general simulation

| Name               | Description                                                                                                                                                                                                                                                                                                                                                                                                    | Required |  Type  | Default Value |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------:|:------:|:-------------:|
| width              | The width of the ground the players will move around in.<br>The width defines how many turns a player with 1 speed will take to cross from the left most position to the right most position on the ground<br>`A player with 1 speed will take 10 turns to move from the left edge to the right edge of a ground of width 10.`                                                                                 |   false  | number |       10      |
| height             | The height of the ground the players will move around in.<br>The height defines how many turns a player with 1 speed will take to cross from the top most position to the bottom most position on the ground<br>`A player with 1 speed will take 10 turns to move from the top edge to the bottom edge of a ground of width 10.`                                                                               |   false  | number |       10      |
| maxNumOfTurns      | The maximum number of turns to simulate.<br>The simulation will terminate if either this number of turns is reached, or no players are left on the board.<br>A "turn" is defined as complete when all players on the board have performed actions that correspond to their speed.<br>`A player with 1 speed will complete 1 action in a turn. A player with 2 speed, will complete 2 actions in the same turn` |   false  | number |     10000     |
| initalNumOfPlayers | The number of players on the board in the first turn. These players will be put in random positions on the ground.                                                                                                                                                                                                                                                                                            |   false  | number |       10      |

## Contributing
`@TODO add contribution guidelines`
