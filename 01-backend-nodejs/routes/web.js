const express = require("express");
//import scoreRoutes from "./scoreRoutes.js";
const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello world");
    })

    return app.use("/", router);
}

module.exports = initWebRoutes;