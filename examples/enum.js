var assert = require("assert")
var validate = require("../index")
var Enum = require("../enum")

var schema = validate({
    foo: Enum("one", "two", "three")
})

var correct = schema({ foo: "one" })
var wrong = schema({ foo: "four" })

assert.equal(null, correct)
assert.deepEqual([
    "four is not a valid enum member for foo"
], wrong)

console.log("correct", correct, "wrong", wrong)

