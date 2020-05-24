# Automatic Speedtesting
This tool is for bad internet-proivder. After a lot of trouble with mine, I started to escalate my measurement.

# Use

Just start it as docker-container. Here is a example for the raspberry (note the tag):

```bash
docker run --name speedtest \\
  --restart always \\
  -v `pwd`/speedtest/:/measurements \\
  -p 8080:80 \\
  -d akop/automatic_speedtest:v0.1.0-arm32v6
```


