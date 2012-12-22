var assert = require("assert")
var validate = require("../index")

var schema = validate({
    foo: {
        bar: String
        , baz: [Number]
    }
})

var correct = schema({ foo: { bar: "foo", baz: [1, 2, 3] } })
var wrong = schema({ foo: "baz" })
var wrong2 = schema({ foo: { bar: 42, baz: {} } })

assert.equal(null, correct)
assert.deepEqual([
    "foo.value cannot be validated"
], wrong)
assert.deepEqual([
    "foo.bar is not a string"
    , "foo.baz is not an array"
], wrong2)
console.log("correct", correct, "wrong", wrong, "wrong2", wrong2)
