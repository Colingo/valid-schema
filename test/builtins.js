var test = require("tape")
var validate = require("../index")

test("builtins", function (t) {
    var schema = validate({
        foo: Object
        , bar: Number
    })

    var correct = schema({ foo: { baz: 42 }, bar: 42 })
    var wrong = schema({ foo: 42, bar: false, extra: "noise" })

    t.equal(null, correct)
    t.deepEqual([
        "foo is not an object"
        , "bar is not a number"
        , "extra is not in schema"
    ], wrong)
    t.end()
})
