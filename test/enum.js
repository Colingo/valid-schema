var test = require("tape")
var validate = require("../index")
var Enum = require("../enum")

test(function (assert) {
    var schema = validate({
        foo: Enum("one", "two", "three")
    })

    var correct = schema({ foo: "one" })
    var wrong = schema({ foo: "four" })

    assert.equal(null, correct)
    assert.deepEqual([
        "four is not a valid enum member for foo"
    ], wrong)

    assert.end()
})
