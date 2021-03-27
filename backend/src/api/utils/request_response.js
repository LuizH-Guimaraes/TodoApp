class RequestResponse {
  constructor(tableName) {
    this.tableName = tableName;
  }

  getData(req, res) {
    const data = req.body;
    if (!data)
      res
        .json({
          error: true,
          message: `[CRUD - ${this.tableName}] Data is mandatory`,
          result: "Data is mandatory",
        })
        .status(400);
    return data;
  }

  getParam(req, res, paramName) {
    const param = req.params[paramName];
    if (!param)
      res.json({
        error: true,
        message: `[CRUD - ${this.tableName}] Error id is mandatory`,
        result: "Id is mandatory",
      });
    return param;
  }

  sendDbResult(res, promise) {
    promise
      .then((result) => {
        res.json({ error: false, message: "ok", result });
      })
      .catch((err) => {
        console.log("catch", err);
        res.json({
          error: true,
          message: `[GENERIC CRUD - ${this.tableName}] Error`,
          result: err,
        });
      });
  }
}

module.exports = RequestResponse;
