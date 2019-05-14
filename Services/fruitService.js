var fruitsDAO = require('../DAOs/fruitsDAO');

async function saveFruit(fruit) {
    var result =  await fruitsDAO.saveFruit(fruit);
    return result;
}

async function getFruit(fruitId) {
    var result = await fruitsDAO.getFruit(fruitId);
    return result;
}

async function getFruits() {
    var result = await fruitsDAO.getFruits();
    return result;
}

async function deleteFruit(fruitId) {
    var result = await fruitsDAO.deleteFruit(fruitId);
    return result;
}

module.exports.saveFruit = saveFruit;
module.exports.getFruit = getFruit;
module.exports.deleteFruit = deleteFruit;
module.exports.getFruits = getFruits;