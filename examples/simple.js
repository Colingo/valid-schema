var assert = require("assert")

var validate = require("../index")
var Enum = require("../enum")

var isValid = validate({
    a: String
    , b: Boolean
    , c: Object
    , d: Number
    , e: [String]
}, "not valid: ")

var error = isValid({
    a: "some string"
    , b: "invalid string"
})

console.log("error", error)
assert.deepEqual([
    "b is not a boolean"
    , "c is not an object"
    , "d is not a number"
    , "e is not an array"
], error)

var correct = isValid({
    a: "some string"
    , b: true
    , c: {
        "arbitary": "object"
    }
    , d: 42
    , e: ["array of strings"]
})

console.log("correct", correct)
assert.equal(null, correct)

