var assert = require("assert")
var validate = require("../index")

var schema = validate({
    magic: function (value) {
        if (value === 42) {
            return
        }

        return "wrong magic value!"
    }
})

var correct = schema({ magic: 42 })
var wrong = schema({ magic: "wrong" })

assert.equal(null, correct)
assert.deepEqual(["wrong magic value!"], wrong)
console.log("correct", correct, "wrong", wrong)
