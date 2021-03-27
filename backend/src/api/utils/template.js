const RequestResponse = require("./request_response");
const JwtVerify = require("../../middleware/jwt");

module.exports = (
  crudService,
  route,
  tableName,
  methods = ["GET", "POST", "PATCH", "DELETE"],
  authenticate = true
) => {
  const requestResponse = new RequestResponse(tableName);

  const middlewareFunction = authenticate
    ? JwtVerify
    : (req, res, next) => {
        next();
      };

  if (methods.includes("GET")) {
    route.get("/", middlewareFunction, async (req, res) => {
      return requestResponse.sendDbResult(res, crudService.list());
    });

    route.get("/count", middlewareFunction, async (req, res) => {
      return requestResponse.sendDbResult(res, crudService.count());
    });

    route.get("/:id", middlewareFunction, (req, res) => {
      const id = requestResponse.getParam(req, res, "id");
      return requestResponse.sendDbResult(res, crudService.get(id));
    });
  }

  if (methods.includes("POST")) {
    route.post("/", middlewareFunction, (req, res) => {
      const data = requestResponse.getData(req, res);
      return requestResponse.sendDbResult(res, crudService.create(data));
    });
  }

  if (methods.includes("PATCH")) {
    route.patch("/:id", middlewareFunction, (req, res) => {
      const id = requestResponse.getParam("id");
      const data = requestResponse.getData(req, res);
      return requestResponse.sendDbResult(res, crudService.edit(data, id));
    });
  }

  if (methods.includes("DELETE")) {
    route.delete("/:id", middlewareFunction, (req, res) => {
      const id = requestResponse.getParam(req, res, "id");
      return requestResponse.sendDbResult(res, crudService.delete(id));
    });
  }
};
