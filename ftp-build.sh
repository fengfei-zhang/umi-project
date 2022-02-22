VERSION="$(node -pe "require('./package.json').version")" 
PROJECT="$(node -pe "require('./package.json').name")"

CURRENT_DAY=`date +%Y%m%d`

BUILD_PACKAGE="${PROJECT}"

SVN_FOLDER="${PROJECT}"

rm -rf ${SVN_FOLDER}

mkdir ${SVN_FOLDER}

# npm run build 

# 新版 
cd ./build

tar --exclude '.DS_Store' --exclude '__MACOSX' -zcvf ${BUILD_PACKAGE}.tar.gz *

mv ${BUILD_PACKAGE}.tar.gz ../${SVN_FOLDER}

cp -r ../deploy/.  ../${SVN_FOLDER}/
