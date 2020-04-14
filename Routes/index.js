const express = require("express");
const covidEstimator = require("./../estimator/estimator");
const path = require("path");
const fs = require("fs");
const js2xmlparser = require("js2xmlparser");
const router = express.Router();
const readfile = (text) => {
  fs.readFile(path.join(__dirname, "../logs.txt"), "utf-8", (err, data) => {
    if (err) console.log(err);
    const newWrite = `${data}\n${text}`;
    fs.writeFile(path.join(__dirname, "../logs.txt"), newWrite, (err, data) => {
      if (err) console.log(err);
      console.log("log added");
    });
  });
};
const jsonResponse = (req, res) => {
  const start = new Date();
  const result = covidEstimator(req.body);
  res.status(200).json(result);
  const time = new Date() - start;
  const text = `${req.method}   ${req.baseUrl}${req.url}    ${
    res.statusCode
  }   ${0 + time}ms`;
  readfile(text);
};
const xmlResponse = (req, res) => {
  const start = new Date();
  const result = covidEstimator(req.body);
  res.set("content-type", "application/xml");
  const xmlformat = js2xmlparser.parse("body", result);
  res.status(200).send(xmlformat);
  const time = new Date() - start;
  const text = `${req.method}   ${req.baseUrl}${req.url}   ${
    res.statusCode
  }    ${0 + time}ms`;
  readfile(text);
};
const logResponse = (req, res) => {
  fs.readFile(path.join(__dirname, "../logs.txt"), "utf-8", (err, data) => {
    if (err) console.log(err);
    res.set("content-type", "text/plain");
    res.send(data);
  });
};
router.get("/xml", xmlResponse);
router.post("/xml", xmlResponse);
router.get("/logs", logResponse);
router.post("/logs", logResponse);
router.get("/", jsonResponse);
router.post("/", jsonResponse);
router.post("/json", jsonResponse);
router.get("/json", jsonResponse);
module.exports = router;
