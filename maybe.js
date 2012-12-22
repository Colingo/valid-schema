var cleanse = require("./cleanse")

module.exports = Maybe

function Maybe(validator) {
    validator = cleanse(validator)

    return function maybe(value, key) {
        if (value === null || value === undefined) {
            return
        }

        return validator(value, key)
    }
}
