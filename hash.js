module.exports = Hash

function Hash(validator) {
    return hash

    function hash(value, key) {
        var error = validator(value)

        if (error) {
            return key + "." + error
        } else {
            return error
        }
    }
}
