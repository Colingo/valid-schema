var test = require("tape")
var Schema = require("../index")

test("arbitrary values", function (assert) {
    var validate = Schema({
        foo: "bar"
        , baz: 42
        , x: false
    })

    var correct = validate({ foo: "bar", baz: 42, x: false })
    var wrong = validate({ foo: "baz", baz: 43, x: true })

    assert.equal(correct, null)
    assert.deepEqual(wrong, [
        "baz is not equal to bar"
        , "43 is not equal to 42"
        , "true is not equal to false"
    ])
    assert.end()
})
