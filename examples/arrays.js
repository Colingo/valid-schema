var assert = require("assert")
var validate = require("../index")

var schema = validate({
    foos: [String]
    , magics: [function (v) {
        if (v) {
            return "no"
        }
    }]
})

var correct = schema({ foos: ["foo"], magics: [null, false] })
var wrong = schema({ foos: "foo", magics: [42] })

assert.equal(null, correct)
assert.deepEqual([
    "foos is not an array"
    , "no"
], wrong)
console.log("correct", correct, "wrong", wrong)
