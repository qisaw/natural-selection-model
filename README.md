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

### Vocabulary

#### Player
A Player in this simulation represents a single living unit.
A Player has the following properties:
* [Energy](#energy)
* [Speed](#speed)
* [Sense](#sense)
* [Time To Live](#time-to-live)

On any given turn, a Player will may perform one or more of the following actions:
* Move around the [Ground](#ground)
* Eat [Food](#fod) or other [Players](#player) **Player eating not implemented yet see [#22](https://github.com/qisaw/natural-selection-model/issues/22)**
* [Reproduce](#reproduction)
* [Die](#death)

#### Ground
The Ground is the plane in which all [Players](#player) and [Food](#food) interact with each other.

#### Food
#### Turn
#### Energy
Each [Player](#player) will have some amount of Energy when they are created.
This Energy will then be consumed while the [Player](#player) moves.
If a [Player](#player) has no energy left, then that [Player](#player) will be considered [Dead](#death).

**Energy consumption of uses the following formula `energyConsumption = mass * speed ^2 * sense`.**

A [Player](#player) may replenish their available Energy by eating one of the following:
* Moving to a piece of [Food](#food) on the [Ground](#ground). The [Player](#player) will gain the amount of Energy defined by the [Food](#food) in the `energyAdditionForFood` property.
* Moving to a another [Player](#player) at least 20% smaller than the Player. The [Player](#player) eating will gain the Energy the [Player](#player) being eaten has remaining. **Player eating not implemented yet see [#22](https://github.com/qisaw/natural-selection-model/issues/22)**

#### Time To Live
Each [Player](#player) may have a `Time To Live` property.
This dictates the maximum number of [turns](#turns) the [Player](#player) will be an interactive movable entity on the ground.
If the [Player](#player) has not died before this number of [turns](#turns), this [Player](#player) will be [killed](#death).

**The `Time To Live` property is set at the beginning of the simulation, and does not change during the simulation.**

#### Speed
The number of actions that a [Player](#player) will perform in a given [turn](#turn). E.g. A [Player](#player) with 1 speed will perform 1 action per [turn](#turn), a [Player](#player) with 2 speed will perform 2 actions per [turn](#turn).

An action can be one of the following
* Move. A [Player](#player) can change it's position on the board.
* Eat. A [Player](#player) may consume a consumable entity.
* [Reproduce](#reproduction). A [Player](#player) may reproduce, and add 1 child to the board.

#### Sense
#### Mutation
#### Reproduction
#### Death
When a player runs out of Energy, reaches its Time To Live or is eaten by another player.

### Parameters
You may use the following parameters to configure different aspects of the simulation. The following options can be varied both in the cli command and programatically via the library.

#### Meta
The following parameters display meta data about the simulation engine
| Name    | Description                                 | Required |  Type   | Default Value |
|---------|---------------------------------------------|:--------:|:-------:|:-------------:|
| version | Display the version number of the cli tool. |   false  | boolean |     false     |
| help    | Display help.                               |   false  | boolean |     false     |


#### General
The following parameters affect the general simulation

| Name               | Description                                                                                                                                                                                                                                                                                                                                                                                                    | Required |  Type  | Default Value |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------:|:------:|:-------------:|
| width              | The width of the ground the players will move around in.<br>The width defines how many turns a player with 1 speed will take to cross from the left most position to the right most position on the ground<br>`A player with 1 speed will take 10 turns to move from the left edge to the right edge of a ground of width 10.`                                                                                 |   false  | number |       10      |
| height             | The height of the ground the players will move around in.<br>The height defines how many turns a player with 1 speed will take to cross from the top most position to the bottom most position on the ground<br>`A player with 1 speed will take 10 turns to move from the top edge to the bottom edge of a ground of width 10.`                                                                               |   false  | number |       10      |
| maxNumOfTurns      | The maximum number of turns to simulate.<br>The simulation will terminate if either this number of turns is reached, or no players are left on the board.<br>A "turn" is defined as complete when all players on the board have performed actions that correspond to their speed.<br>`A player with 1 speed will complete 1 action in a turn. A player with 2 speed, will complete 2 actions in the same turn` |   false  | number |     10000     |

#### Player
The following parameters affect players and their properties
| Name                 | Description                                                                                                         | Required |  Type  | Default Value |
|----------------------|---------------------------------------------------------------------------------------------------------------------|:--------:|:------:|:-------------:|
| initalNumOfPlayers   | The number of players on the ground on the first turn. These players will be put in random positions on the ground. |   false  | number |       10      |
| startingPlayerEnergy | The amount of energy a newly created player starts with.                                                            |   false  | number |      1000     |
| startingPlayerSpeed  | The initial speed of all the players on the ground.                                                                 |   false  | number |       1       |

#### Time To Live
The following parameters affect players life length
| Name                    | Description                                                                                               | Required |   Type  | Default Value |
|-------------------------|-----------------------------------------------------------------------------------------------------------|:--------:|:-------:|:-------------:|
| useTimeToLive           | Should a player have a time to live. If this is not set, then a player lives until their energy runs out. |   false  | boolean |      true     |
| defaultPlayerTimeToLive | The mamimum number of turns a player can be alive for. Is only respected if `useTimeToLive` is set.       |   false  | number  |      100      |

#### Sense
The following parameters affect players ability to see things around them on the board
| Name                 | Description                                                                                                   | Required |   Type  | Default Value |
|----------------------|---------------------------------------------------------------------------------------------------------------|:--------:|:-------:|:-------------:|
| useSense             | Should players be able to see what is around them. If not set, the player always moves in a random direction. |   false  | boolean |      true     |
| defaultSense         | How many positions around the players on the ground on the first turn should be able so see.                  |   false  | number  |        1      |
| mutateSense          | Should a child player sense mutate from their parent during reproducton.                                      |   false  | boolean |      true     |

#### Speed
The following parameters affect players movements
| Name                 | Description                                                              | Required |   Type  | Default Value |
|----------------------|--------------------------------------------------------------------------|:--------:|:-------:|:-------------:|
| startingPlayerSpeed  | The speed of players on the ground on the first turn.                    |   false  | number  |       1       |
| shouldMutateSpeed    | Should a child player speed mutate from their parent during reproducton. |   false  | boolean |      true     |

#### Food
The following parameters affect food and their properties
| Name                  | Description                                                                                                                                                  | Required |  Type  | Default Value |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------:|:------:|:-------------:|
| initialNumOfFood      | The number of pieces of food on the ground on the first turn. This food will be put in random positions on the ground.                                       |   false  | number |       10      |
| numOfTurnsBetweenFood | The number of turns between addition on new food to the ground. The amount of food added will be dependant on the `initialNumOfFood` parameter.              |   false  | number |      1000     |
| energyAdditionForFood | The amount of energy a player gains from eating this food.<br>`A player with 1 energy eating food with energyAdditionForFood 10 will end up with 11 energy.` |   false  | number |      1000     | 

## Contributing
`@TODO add contribution guidelines`
Please read our [code of conduct](./CODE_OF_CONDUCT.md) before contributing.
