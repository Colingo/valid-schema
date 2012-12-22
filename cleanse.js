var validate = require("./index")
var Hash = require("./hash")
var List = require("./list")
var Type = require("./type")

var builtins = [
    [String, Type("string")]
    , [Boolean, Type("boolean")]
    , [Object, Type("object")]
    , [Number, Type("number")]
]

module.exports = cleanse

function cleanse(validator) {
    if (Array.isArray(validator)) {
        return List(cleanse(validator[0]))
    } else if (typeof validator === "object") {
        return Hash(validate(validator))
    }

    for (var i = 0; i < builtins.length; i++) {
        var tuple = builtins[i]

        if (tuple[0] === validator) {
            return tuple[1]
        }
    }

    return validator
}
