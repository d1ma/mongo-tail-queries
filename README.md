## Description

This package allows you to tail all queries hitting a Mongo database. You'll see performance metrics associated with each query.

```
> mongo-tail-queries my_project -l 2
2018-12-03T21:58:23.153Z [UPDATE] users {"$and":[{"services.password.reset.reason":"enroll"},{"$or":[{"services.password.reset.when":{"$lt":"2018-11-03T21:58:23.149Z"}},{"services.password.reset.when":{"$lt":1541282303149}}]}],"_id":{"$in":[]}} {"$unset":{"services.password.reset":""}} : 0 updated. 0 examined. 0 millis.
2018-12-03T21:58:38.915Z [QUERY] users {"_id":"zmL8fgYCci3qfirbr"} : 1 returned. 1 examined. 0 millis.
2018-12-03T21:58:38.917Z [QUERY] chat_rooms {"_id":{"$in":[]},"members":"zmL8fgYCci3qfirbr","messages.sent":{"$gt":"2018-12-03T21:36:37.000Z"}} : 0 returned. 0 examined. 0 millis.
2018-12-03T21:59:25.185Z [COUNT] billing_history {} : 0 examined. 0 millis.
2018-12-03T21:59:32.091Z [QUERY] billing_history {} : 10 returned. 10 examined. 0 millis.
2018-12-03T21:59:32.094Z [QUERY] billing_history {"_id":{"$in":["B9cC9wPCANRcSM2fG","3NFtqgsDRdfEH4SWT","26SdMWXnokzPL7AiZ","TTsR5MXtrxnnbekci","Y6NGEBFwQWMhsgeeH","AhKfdLdQrTTouagvj","2dLEcfcDC8t6jrLk9","LqRCoBpuZDZ6iXeeH","vf3sCSZfisNPbfGx7","havDEy5egYR2cvReS"]}} : 10 returned. 10 examined. 0 millis.
2018-12-03T21:59:32.104Z [REMOVE] billing_history {}: 10 deleted. 10 examined. 0 millis.
2018-12-03T21:59:38.915Z [QUERY] users {"_id":"zmL8fgYCci3qfirbr"} : 1 returned. 1 examined. 0 millis.
```

## Installation

This will add the package as a CLI:
`npm install -g mongo-tail-queries`

## How it works

If you set up profiling, Mongo will log queries and metadata to a capped collection called "system.profile". This package opens a tailable cursor on this collection,
and prints the results as they come

## Running

Command to run

`node mongo-tail-queries [database] [options]`

or (if installed as CLI):

`mongo-tail-queries [database] [options]`

example: `node mongo-tail-queries 192.0.0.1:30001/my_project --authDB 'admin' --username 'tom' --password 'jerry' -l 2`

### Database

`database` argument should be formatted like `[ip]:[port]/[db_name]`. You can leave out the `[ip]:[port]` prefix to tail the `db_name` running locally (on `localhost:27017`).

### Options

| Argument             | Details                                                                       |
|----------------------|-------------------------------------------------------------------------------|
| --profilelevel or -l | Sets the profiling level. 0 is for none; 1 is for slow queries; 2 is for all. |
| --slowms or -s       | The cutoff for slow queries (if using profiling level 1). Default is 100ms.   |
| --authDB             |  the auth database to use to authenticate the user.                           |
| --username           | username for db access.                                                       |
| --password           | passsword for db access.                                                      |

