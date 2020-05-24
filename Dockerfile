FROM node as builder


# install dependencies first (so the dependencies can be a own layer)
COPY www/package*.json ./
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

# only take the relevant files to deploy
COPY www/*.json ./
COPY www/src ./src/
RUN npm run build -- --configuration=production


FROM python:3.7-alpine

MAINTAINER Andre Köpke<speedtester@akop.top>

# install nginx-server
RUN apk add --no-cache nginx && \
    adduser -D -g 'www' www && \
    mkdir /www /run/nginx && \
    touch /run/nginx/nginx.pid && \
    chown -R www:www /var/lib/nginx /www /run/nginx/nginx.pid

COPY nginx/nginx.conf /etc/nginx/

# install dependencies via pip
ADD py-scritps/requirements.txt /
RUN pip install --upgrade pip && \
    pip install -r /requirements.txt --no-cache-dir && \
    rm -rf /requirments.txt

# cron
ADD cron/crontab.txt /
RUN /usr/bin/crontab /crontab.txt

# entrypoint and file-permissions
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh && \
    mkdir /measurements && \
    chown www:www /measurements && \
    ln -s /measurements/ /www/measurements

# python-scripts
COPY py-scritps/speedtester /app/speedtester

# html-files
COPY --from=builder /ng-app/dist/www/ /www/

ENV EXPORT_PATH=/measurements/recorded.txt
WORKDIR /app/

CMD ["/entrypoint.sh"]