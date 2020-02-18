# Natural Selection Model

![](https://github.com/qisaw/natural-selection-model/workflows/Node.js%20CI/badge.svg)

**Note that this repository is currently a work in progress. The end goal of this is to create a package where by users may configure different parameters of a natural selection model and get the results.**

This repository tries to model natural selection. It runs simulations of multiple players on a single board moving around.

`@TODO add rules and more documentation on how to use.`

## Example command
~~~
npm run start:cli -- sim \
  --width=40\
  --height=40\
  --initalNumOfPlayers=30\
  --initialNumOfFood=10\
  --maxNumOfTurns=100000\
  --numOfTurnsBetweenFood=20\
  --energyAdditionForFood=5000\
  --startingPlayerEnergy=250\
  --shouldMutateSpeed=true\
  --startingPlayerSpeed=1\
  --defaultPlayerTimeToLive=1000\
  --useTimeToLive=true
~~~
