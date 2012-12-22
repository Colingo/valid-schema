var test = require("tape")

    , validate = require("../index")
    , Maybe = require("../maybe")

test("maybe schema", function (assert) {
    var schema = validate({
        bar: Maybe(Number)
    })

    var correct = schema({ bar: 43 })
    var correct2 = schema({ bar: null })
    var correct3 = schema({ bar: undefined })
    var correct4 = schema({})
    var error = schema({ bar: "foo"})

    assert.deepEqual(
        [null, null, null, null]
        , [correct, correct2, correct3, correct4]
    )
    assert.deepEqual([
        "bar is not a number"
    ], error)

    assert.end()
})
