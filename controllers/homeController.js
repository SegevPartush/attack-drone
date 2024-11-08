const { Product } = require("../models/Product");

const homeView = async (req, res) => {

    try {
        const items = [];
        res.render('index', {
            items: items
        });
    } catch (error) {
        res.status(500).send(error.message);
    }

}

module.exports = {
    homeView
}