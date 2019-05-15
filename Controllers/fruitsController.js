var fruitsDao = require('../daos/fruitsDao');

async function getFruit(req, res)  {
    const fruitId = req.params.fruitId;
    var fruit = await fruitsDao.getFruit(fruitId);
    res.send(fruit);
}

async function getFruits(req, res)  {
    var result = await fruitsDao.getFruits();
    res.send(result);
}

async function saveFruit(req, res)  {
    const fruit = req.body;
    let result = await fruitsDao.saveFruit(fruit);
    res.send(result);
}

async function deleteFruit(req, res)  {
    const fruitId = req.params.fruitId;
    var result = await fruitsDao.deleteFruit(fruitId);
    res.send(result);
}

module.exports.getFruitController = getFruit;
module.exports.getFruitsController = getFruits;
module.exports.saveFruitController = saveFruit;
module.exports.deleteFruitController = deleteFruit;