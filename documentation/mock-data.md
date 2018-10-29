# Mock server

### Dependencies
To run the mock-server setup, you'll need to install _json-server_.

```
 > $ npm install --save-dev json-server
```

### Mock folder
The /mock/ folder contains a collection of JSON files that the server will pass on to a request.

### Run mock server
To run the mock server, a script has been added to [package.json](../package.json)
```
    "mock": "json-server —-watch mock/data.json"
```

When you run the following command, the server will start serving the JSON on http://localhost:3000/motd
```
 > $ npm run mock
```

However, that is usually not quite as helpful as we need to tell Angular to check this other port :3000
Therefore, another npm command can start up both at the same time.
```
 > $ npm run serve:mock
```

### Add mock data

To /mock/data.json add to the main object.
```
"my-url": {
        "data": "something"
    }
```

### IT DOESN'T WORK! :c

1. Did you download the packages again?
```
 > $ npm i
```

2. `ng serve --proxy-config is invalid`!
Yeah well, this is on Angular - don't ask me why...
You can run each individual command in a separate shell like so:
```
 > $ npm run mock
 >
 > $ ng serve --proxy-config ./mock/proxy.conf.json
```