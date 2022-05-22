const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.get("/api/getAllExpert", controller.getAllExpert);
  app.get("/api/Expert/:id", controller.getByIdExpert);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.post("/api/deleteExpert", controller.removeExpert);
  app.post("/api/Expert", controller.updateExpert);
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isExpert],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isResponsable],
    controller.adminBoard
  );
};
