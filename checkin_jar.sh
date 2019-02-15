#!/bin/bash

usage() {
  echo "Usage: ./checkin_jar.sh -u <username> [-m <host>] [-a <assignment>] [-h] <jarfile>"
}

CHCKN_HOST=${CHCKN_HOST:-"austin.cs.colostate.edu"}
CHCKN_ASSIGNMENT=${CHCKN_ASSIGNMENT:-"dev"}

while getopts "u:m:a:h" opt
do
  case "$opt" in
    u) CHCKN_USERNAME=$OPTARG;;
    m) CHCKN_HOST=$OPTARG;;
    h) usage
      exit 0;;
    a) CHCKN_ASSIGNMENT=$OPTARG;;
    \?) usage
      exit 1;;
  esac
done

shift $(($OPTIND - 1))
JAR=$1

if [ -z "$JAR" -o -z "$CHCKN_USERNAME" ]
then
  usage
  exit 1
fi

JAR_NAME=$(basename $JAR)

scp $JAR $CHCKN_USERNAME@$CHCKN_HOST:./
ssh $CHCKN_USERNAME@$CHCKN_HOST "~cs314/bin/checkin $CHCKN_ASSIGNMENT ./$JAR_NAME"
