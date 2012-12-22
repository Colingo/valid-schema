var test = require("tape")
var validate = require("../index")

test("arbitary functions", function (t) {
    var schema = validate({
        magic: function (value) {
            if (value === 42) {
                return
            }

            return "wrong magic value!"
        }
    })

    var correct = schema({ magic: 42 })
    var wrong = schema({ magic: "wrong" })

    t.equal(null, correct)
    t.deepEqual(["wrong magic value!"], wrong)
    t.end()
})
