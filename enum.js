var toArray = require("to-array")

$enum.validator = [function check(value) {
    return value instanceof Enum
}, function validator(value, key, schema) {
    var valid = schema.values.some(function (type) {
        return type === value
    })

    if (!valid) {
        return value + " is not a valid enum member"
    }
}]

module.exports = $enum

function $enum() {
    return new Enum(toArray(arguments))
}

function Enum(values) {
    this.values = values
}
