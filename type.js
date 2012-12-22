var word = {
    "string": "a"
    , "object": "an"
    , "boolean": "a"
    , "number": "a"
}

module.exports = Type

function Type(str) {
    return type

    function type(value, key) {
        if (typeof value !== str) {
            return key + " is not " + word[str] + " " + str
        }
    }
}
