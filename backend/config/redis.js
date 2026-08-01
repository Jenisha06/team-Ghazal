const { createClient } = require("redis");

const redis = createClient({

    url: "redis://localhost:6379"

});

redis.on("error", err => console.log(err));

(async () => {

    await redis.connect();

    console.log("Redis Connected");

})();

module.exports = redis;