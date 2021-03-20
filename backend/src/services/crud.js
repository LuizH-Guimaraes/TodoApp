const { Container } = require("typedi");

module.exports = (route, tableName, permission) => {
  const knex = Container.get("knex");
  if (typeof permission === "string") permission = [permission];
  permission = permission.map((item) => item.toUpperCase());

  const getData = (req, res) => {
    const data = req.body;
    if (!data)
      res
        .json({
          error: true,
          message: `[CRUD - ${tableName}] Data is mandatory`,
          result: "Data is mandatory",
        })
        .status(400);
    return data;
  };

  const getParam = (req, res, paramName) => {
    const param = req.params[paramName];
    if (!param)
      res.json({
        error: true,
        message: `[CRUD - ${tableName}] Error id is mandatory`,
        result: "Id is mandatory",
      });
    return param;
  };

  const sendDbResult = (res, promise, callback = undefined) => {
    promise
      .then((result) => {
        if (callback) {
          callback()
            .then((result) => res.json({ error: false, message: "ok", result }))
            .catch((err) => {
              res.json({
                error: true,
                message: `[GENERIC CRUD - ${tableName}] Error`,
                result: err,
              });
            });
        } else {
          res.json({ error: false, message: "ok", result });
        }
      })
      .catch((err) => {
        console.log("catch", err);
        res.json({
          error: true,
          message: `[GENERIC CRUD - ${tableName}] Error`,
          result: err,
        });
      });
  };

  const veriryPermissions = (permission) => {
    permission.forEach((element) => {
      if (!["ALL", "GET", "POST", "DELETE"].includes(element)) return false;
      return true;
    });
  };

  if (!permission || veriryPermissions(permission))
    throw "Invalid permission type";

  if (permission.includes("ALL") || permission.inclues("GET")) {
    // Listagem
    route.get("/", (req, res) => {
      sendDbResult(res, knex(tableName).select("*"));
    });

    // Count
    route.get("/count", (req, res) => {
      sendDbResult(res, knex(tableName).count());
    });

    // Pegar elemento com id
    route.get("/:id", (req, res) => {
      const id = getParam(req, res, "id");
      sendDbResult(res, knex(tableName).where({ id }).select());
    });
  }

  if (permission.includes("ALL") || permission.inclues("POST")) {
    // Criar
    route.post("/", (req, res) => {
      const data = getData(req, res);
      sendDbResult(res, knex(tableName).insert(data));
    });

    // Editar
    route.patch("/:id", (req, res) => {
      const data = getData(req, res);
      const id = getParam(req, res, "id");
      sendDbResult(res, knex(tableName).where("id", id).select().update(data));
    });
  }

  if (permission.includes("ALL") || permission.inclues("DELETE")) {
    // Remover
    route.delete("/:id", (req, res) => {
      const id = getParam(req, res, "id");
      sendDbResult(res, knex(tableName).where("id", id).select().del());
    });
  }
};
