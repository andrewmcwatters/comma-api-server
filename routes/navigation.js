var express = require('express');
var router = express.Router();

/* POST Set destination. */
router.post('/v1/navigation/:dongle_id/set_destination', function(req, res, next) {
  res.status(501).json({ error: "Not implemented" });
});

/* GET Retrieve next destination. */
router.get('/v1/navigation/:dongle_id/next', function(req, res, next) {
  res.status(501).json({ error: "Not implemented" });
});

/* GET Retrieve saved locations. */
router.get('/v1/navigation/:dongle_id/locations', function(req, res, next) {
  res.status(501).json({ error: "Not implemented" });
});

/* PUT Set saved locations. */
router.put('/v1/navigation/:dongle_id/locations', function(req, res, next) {
  res.status(501).json({ error: "Not implemented" });
});

/* PATCH Update saved locations. */
router.patch('/v1/navigation/:dongle_id/locations', function(req, res, next) {
  res.status(501).json({ error: "Not implemented" });
});

/* DELETE Update saved locations. */
router.delete('/v1/navigation/:dongle_id/locations', function(req, res, next) {
  res.status(501).json({ error: "Not implemented" });
});

module.exports = router;
