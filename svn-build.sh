###
 # @Author: zhangfengfei
 # @Date: 2021-06-28 17:05:42
 # @LastEditTime: 2022-02-21 17:39:20
 # @LastEditors: zhangfengfei
###
VERSION="$(node -pe "require('./package.json').version")"

PROJECT="$(node -pe "require('./package.json').name")"

CURRENT_DAY=`date +%Y%m%d`

BUILD_PACKAGE="${PROJECT}-v${VERSION}-${CURRENT_DAY}"

SVN_FOLDER="${PROJECT}-v${VERSION}-${CURRENT_DAY}"

rm -rf ${SVN_FOLDER}

mkdir ${SVN_FOLDER}

npm run build

# 新版
cd ./build

tar --exclude '.DS_Store' --exclude '__MACOSX' -zcvf ${BUILD_PACKAGE}.tar.gz *

mv ${BUILD_PACKAGE}.tar.gz ../${SVN_FOLDER}

cp -r ../deploy/.  ../${SVN_FOLDER}/

cd ../${SVN_FOLDER}/

sed -i "" "s/project-name-frontend/${SVN_FOLDER}/g" xxx项目前端部署文档.md


