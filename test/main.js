var test = require("tape")

var validate = require("../index")

var isValid = validate({
    foo: String
    , bar: Boolean
    , x: Object
    , foos: [String]
}, "not valid: ")


test("error case", function (t) {
    var error = isValid({
        foo: "some string"
        , bar: "invalid string"
        , x: {}
        , foos: ["a"]
    })

    t.deepEqual([
        "bar is not a boolean"
    ], error)
    t.end()
})

test("correct case", function (t) {
    var correct = isValid({
        foo: "some string"
        , foos: ["array of strings"]
        , bar: true
        , x: {
            "arbitary": "object"
        }
    })

    t.equal(null, correct)
    t.end()
})

test("extra values", function (t) {
    var error = isValid({
        foo: "a"
        , foos: ["a"]
        , bar: true
        , x: {}
        , y: 42
    })

    t.deepEqual([
        "y is not in schema"
    ], error)

    t.end()
})

test("missing values", function (t) {
    var error = isValid({})

    t.deepEqual([
        "foo is not a string"
        , "bar is not a boolean"
        , "x is not an object"
        , "foos is not an array"
    ], error)

    t.end()
})

test("non object", function (t) {
    var error = isValid()

    t.deepEqual([
        "value cannot be validated"
    ], error)

    t.end()
})

test("number schema", function (t) {
    var schema = validate({
        foo: Number
    })

    var correct = schema({
        foo: 42
    })

    t.equal(null, correct)

    var error = schema({
        foo: "blaz"
    })

    t.deepEqual([
        "foo is not a number"
    ], error)
    t.end()
})


test("missing properties", function (t) {
    var error = isValid({
        foo: "bar"
    })

    t.deepEqual([
        "bar is not a boolean"
        , "x is not an object"
        , "foos is not an array"
    ], error)

    t.end()
})

test("nested schemas", function (t) {
    var schema = validate({
        foo: {
            bar: Number
        }
    })

    var correct = schema({
        foo: {
            bar: 42
        }
    })

    t.equal(null, correct)

    var error = schema({
        foo: {
            bar: "foo"
        }
    })

    t.deepEqual([
        "foo.bar is not a number"
    ], error)

    t.end()
})

test("custom functions", function (t) {
    var schema = validate({
        foo: function (v, k) {
            if (v !== 42) {
                return k + " should be 42"
            }
        }
    })

    var correct = schema({
        foo: 42
    })

    t.equal(null, correct)

    var error = schema({
        foo: 41
    })

    t.deepEqual([
        "foo should be 42"
    ], error)
    t.end()
})
