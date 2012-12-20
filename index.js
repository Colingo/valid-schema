var Enum = require("./enum")

var validators = [
    Enum.validator
    , is(String, "string")
    , is(Boolean, "boolean")
    , is(Object, "object")
    , is(Number, "number")
    , [Array.isArray, function isArray(value, key, schema) {
        if (!Array.isArray(value)) {
            return key + " is not an array"
        }

        var subSchema = schema[0]

        for (var i = 0; i < value.length; i++) {
            var subValue = value[i]
                , isValid = valid(key, subSchema, subValue)

            if (isValid) {
                return isValid
            }
        }
    }]
    , [function checkFunction(value) {
        return typeof value === "function"
    }, function validateFunction(value, key, schema) {
        var error = schema(value, key)

        if (error) {
            return key + " " + error
        }
    }]
    , [function checkObject(value) {
        return value instanceof Object
    }, function isObject(value, key, subSchema) {
        if (typeof value !== "object") {
            return key + " is not an object"
        }

        return validate(subSchema, key + ".")(value)
    }]
]

module.exports = validate

function instance(type) {
    return
}

function is(type, name) {
    return [function check(value) {
        return value === type
    }, function validator(value, key) {
        if (typeof value !== name) {
            return key + " is not a " + name
        }
    }]
}

function valid(key, schema, value) {
    for (var i = 0; i < validators.length; i++) {
        var tuple = validators[i]
            , check = tuple[0]
            , validator = tuple[1]

        if (check(schema)) {
            return validator(value, key, schema)
        }
    }
}

function validate(definition, name) {
    name = name || ""

    return function (data) {
        var keys = Object.keys(definition)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
                , value = data[key]
                , schema = definition[key]

            if (!(key in data)) {
                return name + key + " is required"
            }

            var error = valid(key, schema, value)

            if (error) {
                return name + error
            }
        }
    }
}
