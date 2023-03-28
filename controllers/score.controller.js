const Utils = require("../helpers/utils");
const RedisContext = require("../redis");

module.exports = {
  get: async (req, res) => {
    const { key } = req.query;
    const redis = RedisContext.getConnect();
    try {
      const dataRedis = await redis.get(key);
      if (dataRedis !== null) {
        const score = parseInt(dataRedis);
        res.status(200).json({ score: score });
      } else {
        redis.set(key, JSON.stringify(0));
        res.status(200).json({ score: 0 });
      }
    } catch (error) {
      console.error(error);
      redis.set(key, JSON.stringify(0));
      res.status(200).json({ score: 0 });
    }
  },
  update: async (req, res) => {
    const body = req.body;
    const data = await Utils.convertData(body);
    Utils.writeResultJson({ ...data });
    res.status(201).json({ success: true }).end();
  },
};
