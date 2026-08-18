#!/usr/bin/env bash
REPO=qe-installation-and-migration/agama-integration-test-webpack
BRANCH=$(git branch --show-current)
gh pr list --repo $REPO --head $BRANCH --json url -q '.[].url' | grep . \
  || gh pr create --repo $REPO --base main --head $(gh api user -q .login):$BRANCH
