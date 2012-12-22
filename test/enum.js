var test = require("tape")

    , validate = require("../index")
    , Enum = require("../enum")


test("enum case", function (t) {
    var schema = validate({
        foo: Enum("one", "two", "three")
    })

    var correct = schema({
        foo: "one"
    })

    t.equal(null, correct)

    var error = schema({
        foo: "four"
    })

    t.deepEqual([
        "four is not a valid enum member for foo"
    ], error)

    t.end()
})
