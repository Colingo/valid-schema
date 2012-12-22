module.exports = Hash

function Hash(validator) {
    return hash

    function hash(value, key) {
        var error = validator(value)

        if (error) {
            return error.map(function (value) {
                return key + "." + value
            })
        } else {
            return error
        }
    }
}
