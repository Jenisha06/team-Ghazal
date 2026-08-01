import { createClient } from "redis";

const redis = createClient({
    url: "redis://localhost:6379"
});

redis.on("error", (err) => console.log(err));

await redis.connect();

console.log("Redis Connected");

export default redis;