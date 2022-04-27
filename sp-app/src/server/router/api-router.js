const express = require("express");
const router = express.Router();

const {eventRouter} = require("./event-router");
const {personRouter} = require("./person-router");

router.use("/event", eventRouter);
router.use("/person", personRouter);

module.exports = router;
