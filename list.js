module.exports = List

function List(validator) {
    return list

    function list(value, key) {
        if (!Array.isArray(value)) {
            return key + " is not an array"
        }

        for (var i = 0; i < value.length; i++) {
            var error = validator(value[i], key)

            if (error) {
                return error
            }
        }
    }
}
