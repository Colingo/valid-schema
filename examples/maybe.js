var assert = require("assert")

var validate = require("../index")
var Maybe = require("../maybe")

var schema = validate({
    prop: Maybe(Number)
}, "schema with optional values: ")

var valid = schema({
    prop: 42
})

console.log("valid", valid)
assert.equal(valid, null)

var valid2 = schema({})

console.log("valid2", valid2)
assert.equal(valid2, null)

var error = schema({
    prop: "invalid"
})

console.log("error", error)
assert.deepEqual([
    "prop is not a number"
], error)
