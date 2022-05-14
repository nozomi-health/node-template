#/bin/bash
CONTAINER_NAME=$1

if [ "$( docker container inspect -f '{{.State.Running}}' $CONTAINER_NAME )" == "true" ]
then
  docker stop $CONTAINER_NAME 2> /dev/null
  docker rm -f $CONTAINER_NAME 2> /dev/null
fi

docker-compose up -d

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
