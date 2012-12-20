var test = require("tape")

    , validate = require("../index")
    , Enum = require("../enum")

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
    })

    t.equal(error, "not valid: bar is not a boolean")
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

    t.equal(correct, undefined)
    t.end()
})

test("number schema", function (t) {
    var schema = validate({
        foo: Number
    }, "error")

    var correct = schema({
        foo: 42
    })

    t.equal(correct, undefined)

    var error = schema({
        foo: "blaz"
    })

    t.equal(error, "errorfoo is not a number")
    t.end()
})


test("missing properties", function (t) {
    var error = isValid({
        foo: "bar"
    })

    t.equal(error, "not valid: bar is required")
    t.end()
})

test("enum case", function (t) {
    var schema = validate({
        foo: Enum("one", "two", "three")
    })

    var correct = schema({
        foo: "one"
    })

    t.equal(correct, undefined)

    var error = schema({
        foo: "four"
    })

    t.equal(error, "four is not a valid enum member")

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

    t.equal(correct, undefined)

    var error = schema({
        foo: {
            bar: "foo"
        }
    })

    t.equal(error, "foo.bar is not a number")

    t.end()
})

test("custom functions", function (t) {
    var schema = validate({
        foo: function (v) {
            if (v !== 42) {
                return "should be 42"
            }
        }
    })

    var correct = schema({
        foo: 42
    })

    t.equal(correct, undefined)

    var error = schema({
        foo: 41
    })

    t.equal(error, "foo should be 42")
    t.end()
})

test("integration", function (t) {
    var ObjectID = String

    var schema = validate({
        a: String
        , b: Boolean
        , c: Object
        , d: Number
        // e must be an array that contains strings
        , e: [String]
        , f: function (value) {
            // arbitary functions. Return no value if valid.
            // Return a string to indicate this is an error.
            if (value !== 42) {
                return "go away!"
            }
        }
        // nested schemas are allowed too
        , g: {
            h: String
        }
        // Enums allow you to say the value must be one of
        // the whitelisted values. Useful for self documenting
        // schemas
        , i: Enum("one", "two")
        // any schema is valid in arrays including functions
        , j: [function (value) {
            if (value !== 21) {
                return "invalids!"
            }
        }]
        // Tip: you can rename variables to make schemas more
        // self documenting!
        , k: ObjectID
    }, "not valid: ")

    var correct = schema({
        a: "some string"
        , b: true
        , c: {
            "arbitary": "object"
        }
        , d: 42
        , e: ["array of strings"]
        , f: 42
        , g: {
            h: "nested validation"
        }
        , i: "one"
        , j: [21, 21]
        , k: "12541-1awra2-163;a-afawf5"
    })

    t.equal(correct, undefined)
    t.end()
})
