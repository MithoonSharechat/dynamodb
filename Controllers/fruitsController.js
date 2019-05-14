var fruitService = require('../Services/fruitService');

async function getFruit(req, res)  {
    const fruitId = req.params.fruitId;
    var fruit = await fruitService.getFruit(fruitId);
    res.send(fruit);
}

async function getFruits(req, res)  {
    var result = await fruitService.getFruits();
    res.send(result);
}

async function saveFruit(req, res)  {
    const fruit = req.body;
    let result = await fruitService.saveFruit(fruit);
    res.send(result);
}

async function deleteFruit(req, res)  {
    const fruitId = req.params.fruitId;
    var result = await fruitService.deleteFruit(fruitId);
    res.send(result);
}

module.exports.getFruitController = getFruit;
module.exports.getFruitsController = getFruits;
module.exports.saveFruitController = saveFruit;
module.exports.deleteFruitController = deleteFruit;