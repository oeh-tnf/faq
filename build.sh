#!/bin/sh

for toml in faqs/*.toml ; do
    json="faqs/$(basename -s .toml $toml).json"
    yj -tji <$toml >$json
done

mkdir -p public

cp -r static/* public

pandoc lua build.lua
