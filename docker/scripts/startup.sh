#/bin/bash
CONTAINER_NAME=$1
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [ "$( docker container inspect -f '{{.State.Running}}' $CONTAINER_NAME )" == "true" ]
then
  docker stop $CONTAINER_NAME 2> /dev/null
  docker rm -f $CONTAINER_NAME 2> /dev/null
fi

docker-compose --env-file "$SCRIPT_DIR/../env.prod" up -d

while true
do
  echo Checking...

  RESULT="$(docker ps -a | grep $CONTAINER_NAME)"

  if [[ RESULT != "" ]]
  then
    break
  fi

  sleep 0.5
done
