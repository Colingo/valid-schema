var test = require("tape")

    , validate = require("../index")

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
