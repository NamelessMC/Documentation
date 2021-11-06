#!/usr/bin/env sh
set -e

yarn run build
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:namekessmc/Documentation.git master:gh-pages

cd -
