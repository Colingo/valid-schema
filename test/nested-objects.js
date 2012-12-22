var test = require("tape")
var validate = require("../index")


test("nested objects", function (t) {
    var schema = validate({
        foo: {
            bar: String
            , baz: [Number]
        }
    })

    var correct = schema({ foo: { bar: "foo", baz: [1, 2, 3] } })
    var wrong = schema({ foo: "baz" })
    var wrong2 = schema({ foo: { bar: 42, baz: {} } })

    t.equal(null, correct)
    t.deepEqual([
        "foo.value cannot be validated"
    ], wrong)
    t.deepEqual([
        "foo.bar is not a string"
        , "foo.baz is not an array"
    ], wrong2)

    t.end()
})
