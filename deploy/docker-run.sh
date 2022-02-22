
VERSION="1.0.0"
NAME="project"

PROJECT="harbor.topvdn.com/develop_version/wsd/${NAME}-frontend"

# 示例如下
docker container run -itv //d/work/lingyang/conf/${NAME}/sites-enabled:/etc/nginx/sites-enabled --name ${NAME} -d -p 3002:80 ${PROJECT}:${VERSION}-alpine
