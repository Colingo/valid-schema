var test = require("tape")
var validate = require("../index")

test("arrays", function (t) {
    var schema = validate({
        foos: [String]
        , magics: [function (v) {
            if (v) {
                return "no"
            }
        }]
    })

    var correct = schema({ foos: ["foo"], magics: [null, false] })
    var wrong = schema({ foos: "foo", magics: [42] })

    t.equal(null, correct)
    t.deepEqual([
        "foos is not an array"
        , "no"
    ], wrong)
    t.end()
})
