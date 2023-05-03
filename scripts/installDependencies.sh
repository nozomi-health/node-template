#!/bin/bash

if [[ "$TARGET" == "dev" ]]
then
  yarn global add nodemon && yarn
else
  yarn install --frozen-lockfile
fi
