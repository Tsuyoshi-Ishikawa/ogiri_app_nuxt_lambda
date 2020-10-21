FROM node:14.5.0

# # コンテナ内で cd //nuxt/src しているようなもの
# # これでコンテナに入った瞬間に/nuxt/srcにいくようになる
WORKDIR /nuxt/src

#npmでは今回の場合npm installが失敗するのでyarnを採用
RUN apt-get update && \
    yarn global add \
    @vue/cli

# #ENVでhostを0000にすることでどこからでも叩けるようになる?
# # またdockerfileでhostやportを変更した場合は、nuxt.config.jsでhostとportの変更を記述しないといけない
ENV HOST 0.0.0.0
EXPOSE 8080