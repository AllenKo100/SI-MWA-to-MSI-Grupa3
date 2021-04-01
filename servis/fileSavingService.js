const express = require("express");
const router = express.Router();
const controller = require("../servis/fileSaving.controller");


let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};

module.exports = routes;