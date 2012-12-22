var toArray = require("to-array")

module.exports = Enum

function Enum() {
    var values = toArray(arguments)

    return validate

    function validate(value, key) {
        var valid = values.some(equal, [value])

        if (!valid) {
            return value + " is not a valid enum member for " + key
        }
    }
}

function equal(value) {
    return this[0] === value
}
