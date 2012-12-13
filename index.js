module.exports = validate

function validate(definition, name) {
    return function (data) {
        var keys = Object.keys(data)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
                , value = data[key]
                , schema = definition[key]
                , error = valid(key, schema, value)

            if (error) {
                return name + error
            }
        }
    }
}

function valid(key, schema, value) {
    if (schema === String) {
        return isString(value, key)
    } else if (schema === Boolean) {
        return isBoolean(value, key)
    } else if (schema === Object) {
        return isObject(value, key)
    } else if (schema === Number) {
        return isNumber(value, key)
    } else if (Array.isArray(schema)) {
        return isArray(value, key, schema[0])
    }
}

function isNumber(value, key) {
    if (typeof value !== "number") {
        return key + " is not a number"
    }
}

function isString(value, key) {
    if (typeof value !== "string") {
        return key + " is not a string"
    }
}

function isBoolean(value, key) {
    if (typeof value !== "boolean") {
        return key + " is not a boolean"
    }
}

function isObject(value, key) {
    if (typeof value !== "object") {
        return key + " is not an object"
    }
}

function isArray(value, key, subSchema) {
    if (!Array.isArray(value)) {
        return key + " is not an array"
    }

    for (var i = 0; i < value.length; i++) {
        var subValue = value[i]
            , isValid = valid(key, subSchema, subValue)

        if (isValid) {
            return isValid
        }
    }
}
