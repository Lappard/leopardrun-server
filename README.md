# leopartrun-server

```
Server URL: ws://jonathanwiemers.de:1337
```

## installing

```
cd Server
node install
mkdir cert
cd cert
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl.key -out ssl.crt
cd ..
node server.js
//or (for run in background)
node_modules/pm2/bin/pm2 start --watch server.js
```
