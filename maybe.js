var cleanse = require("./cleanse")

module.exports = Maybe

function Maybe(validator) {
    var cleansed

    return function maybe(value, key) {
        if (!cleansed) {
            cleansed = cleanse(validator)
        }

        if (value === null || value === undefined) {
            return
        }

        return cleansed(value, key)
    }
}
