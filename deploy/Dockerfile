ARG BUILD_FROM=harbor.topvdn.com/internal/amd64/antelope/nginx:1.18.0-alpine

FROM ${BUILD_FROM}

LABEL maintainer="Antelope Docker Maintainers <jinxiang@antelope.cloud>"

ARG DOWNLOAD_URL=https://dockerfile.topvdn.com
ARG DOWNLOAD_URI=/wsd/frontend
ARG PACKAGE_NAME=project
ARG PACKAGE_VERSION=v1.0.0
ARG RUN_USER=nginx
ARG RUN_GROUP=nginx
ARG WORKDIR=/opt/html/project

RUN set -eux; \
    # apk repositorie replace it with aliyun
    sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories; \
    # setting Shanghai timezone
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime; \
    cd /opt/html; \
    file=${PACKAGE_NAME}-frontend-${PACKAGE_VERSION}.tar.gz; \
    wget -O ${file} ${DOWNLOAD_URL}${DOWNLOAD_URI}/${file}; \
    tar -zxvf ${file}; \
    rm -f ${file}; \
    chown -Rf ${RUN_USER}:${RUN_GROUP} ${WORKDIR}

WORKDIR ${WORKDIR}
