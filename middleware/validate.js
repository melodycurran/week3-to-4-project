const validator = require('../help/validator');
const createProduct = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "brand": "required|string",
        "quantity": "required|string",
        "sku": "required|string",
        "color": "required|string",
        "size": "required|string",
        "category": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = {
    createProduct
};