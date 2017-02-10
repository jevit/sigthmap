const express = require('express');
const pointApi = require('./point');
const parcoursApi = require('./parcours');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* API Point */
const pointUrl = '/point';
router.get(pointUrl, pointApi.findAll);
router.get(pointUrl+'/:id', pointApi.findById);
router.post(pointUrl, pointApi.add);
router.put(pointUrl+'/:id', pointApi.update);
router.delete(pointUrl+'/:id', pointApi.delete);

/* API Parcours */
const parcoursUrl = '/parcours';
router.get(parcoursUrl, parcoursApi.findAll);
router.get(parcoursUrl+'/:id', parcoursApi.findById);
router.post(parcoursUrl, parcoursApi.add);
router.put(parcoursUrl+'/:id', parcoursApi.update);
router.delete(parcoursUrl+'/:id', parcoursApi.delete);

module.exports = router;