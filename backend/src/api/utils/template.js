const RequestResponse = require("./request_response");

module.exports = (
  crudService,
  route,
  tableName,
  methods = ["GET", "POST", "PATCH", "DELETE"]
) => {
  const requestResponse = new RequestResponse(tableName);

  if (methods.includes("GET")) {
    route.get("/", async (req, res) => {
      return requestResponse.sendDbResult(res, crudService.list());
    });

    route.get("/count", async (req, res) => {
      return requestResponse.sendDbResult(res, crudService.count());
    });

    route.get("/:id", (req, res) => {
      const id = requestResponse.getParam(req, res, "id");
      return requestResponse.sendDbResult(res, crudService.get(id));
    });
  }

  if (methods.includes("POST")) {
    route.post("/", (req, res) => {
      const data = requestResponse.getData(req, res);
      return requestResponse.sendDbResult(res, crudService.create(data));
    });
  }

  if (methods.includes("PATCH")) {
    route.patch("/:id", (req, res) => {
      const id = requestResponse.getParam("id");
      const data = requestResponse.getData(req, res);
      return requestResponse.sendDbResult(res, crudService.edit(data, id));
    });
  }

  if (methods.includes("DELETE")) {
    route.delete("/:id", (req, res) => {
      const id = requestResponse.getParam(req, res, "id");
      return requestResponse.sendDbResult(res, crudService.delete(id));
    });
  }
};
