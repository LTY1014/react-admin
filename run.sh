# !/bin/bash -e
#author：lty

# 删除原来文件
rm -rf ./dist

git pull

npm install
npm run build
