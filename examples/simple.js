var validate = require("../index")

var isValid = validate({
    foo: String
    , bar: Boolean
    , x: Object
    , foos: [String]
}, "not valid: ")

var error = isValid({
    foo: "some string"
    , bar: "invalid string"
})

// bar is not a boolean
console.log("error", error)

var correct = isValid({
    foo: "some string"
    , foos: ["array of strings"]
    , x: {
        "arbitary": "object"
    }
})

// undefined
console.log("correct", correct)
