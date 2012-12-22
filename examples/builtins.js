var assert = require("assert")
var validate = require("../index")

var schema = validate({
    foo: Object
    , bar: Number
})

var correct = schema({ foo: { baz: 42 }, bar: 42 })
var wrong = schema({ foo: 42, bar: false, extra: "noise" })

assert.equal(null, correct)
assert.deepEqual([
    "foo is not an object"
    , "bar is not a number"
    , "extra is not in schema"
], wrong)
console.log("correct", correct, "wrong", wrong)
