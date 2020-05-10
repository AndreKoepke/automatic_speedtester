#!/bin/sh

echo 'Hello, I will do a speedtest every 10minutes.'

# initial speedtest
python -u /app/speedtester/speedtester.py

# start cron
/usr/sbin/crond

# start nginx
nginx -g 'daemon off;'