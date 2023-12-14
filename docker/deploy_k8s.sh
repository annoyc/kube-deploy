#!/bin/sh

export SERVICE_NAME=${1}
export SERVICE_PORT=${2}
export SERVICE_IMAGE=${3}
export SERVICE_REPLICAS=${4}
export RUN_ENV=${5}
export NAMESPACE=${6}
export IMAGE_PULL_SECRET_ENV=$IMAGE_PULL_SECRET

mkdir -p .generated
for f in templates/*.yml
do
    envsubst < $f > ".generated/$(basename $f)"
done

for f in .generated/*.yml
do
    cat $f
done
cat .generated/deployment.yml
kubectl apply -f .generated/
