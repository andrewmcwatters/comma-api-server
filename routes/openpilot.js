var express = require('express');
var router = express.Router();

/* GET Upload URL. */
router.get('/v1.4/:dongle_id/upload_url/', function(req, res, next) {
  res.status(412).json({ error: "Upload not supported" });
});

module.exports = router;
