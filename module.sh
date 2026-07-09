#!/bin/bash

dir1="./packages/dependency-resolver/provider/aws"
dir2="./packages/configuration-engine/provider/aws"

for file in "$dir1"/storage/*; do
    [ -f "$file" ] || continue

    # Get filename without extension
    name=$(basename "$file")
    name="${name%.*}"

    mkdir -p "$dir2/$name"

    echo "Created: $dir2/$name"
done