FROM xuhao/alpine-nginx-nodejs:8.11.1

ENV HOME /home/deployment
ENV APP_HOME $HOME/app

WORKDIR $APP_HOME
# COPY package*.json $APP_HOME/
COPY . $APP_HOME
RUN npm config set registry https://registry.npm.taobao.org\
  && npm install \
  && npm run build \
  && rm -rf node_modules /usr/local/bin/node /usr/local/lib/node_modules /usr/local/include/node $HOME/.npm \
  && cp -f $APP_HOME/pipeline/config/nginx.conf /etc/nginx/nginx.conf \
  && chmod +x $APP_HOME/pipeline/bin/nginx_start.sh

EXPOSE 80
CMD ["/bin/sh", "-c", "$APP_HOME/pipeline/bin/nginx_start.sh"]
