const router = require('express').Router();
const {filterByQuery,findById,createNewZookeeper,validateZookeeper} = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');

router.get('/zookeepers', (req,res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    }else {
        res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {

    // set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();

    // if any data in req.body is incorrect, send 404 error back
    if (!validateZookeeper(req.body)) {
        res.status(400).send('The zookeeper you are trying to add is not properly formatted!. Try that shit again');
    } else {
        // add zookeeper to JSON file and animals array in this function
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }

});

module.exports = router;