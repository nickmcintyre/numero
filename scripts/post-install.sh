#!/usr/bin/env sh
patch --forward node_modules/@tensorflow-models/speech-commands/package.json < patches/speech-commands.patch
