var test = require("tape")

    , validate = require("../index")
    , Maybe = require("../maybe")

test("maybe schema", function (t) {
    var schema = validate({
        bar: Maybe(String)
    })

    var correct = schema({
        bar: "foo"
    })

    t.equal(correct, null)

    var correct2 = schema({
        bar: null
    })

    t.equal(correct2, null)

    var correct3 = schema({
        bar: undefined
    })

    t.equal(correct3, null)

    var correct4 = schema({})

    t.equal(correct4, null)

    var error = schema({
        bar: 42
    })

    t.deepEqual(error, [
        "bar is not a string"
    ])

    var error2 = schema({
        foo: 45
    })

    t.deepEqual(error2, [
        "foo is not in schema"
    ])

    t.end()
})
