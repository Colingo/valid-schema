module.exports = validate

var toArray = require("to-array")

var union = require("./lib/union")
var cleanse = require("./cleanse")

function validate(definition) {
    definition = cleanseSchema(definition)

    return function (data) {
        if (data === null || typeof data !== "object") {
            return ["value cannot be validated"]
        }

        var errors = union(Object.keys(definition), Object.keys(data)).
            map(checkKey).
            filter(Boolean)

        return errors.length ? errors : null

        function checkKey(key) {
            var value = data[key]
                , validator = definition[key]

            if (!(key in definition)) {
                return key + " is not in schema"
            }

            return validator(value, key)
        }
    }
}


function cleanseSchema(definition) {
    return Object.keys(definition).reduce(function (acc, key) {
        acc[key] = cleanse(definition[key])
        return acc
    }, {})
}
