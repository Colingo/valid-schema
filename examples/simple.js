var validate = require("../index")
    , Enum = require("../enum")

var isValid = validate({
    a: String
    , b: Boolean
    , c: Object
    , d: Number
    , e: [String]
}, "not valid: ")

var error = isValid({
    a: "some string"
    , b: "invalid string"
})

// bar is not a boolean
console.log("error", error)

var correct = isValid({
    a: "some string"
    , b: true
    , c: {
        "arbitary": "object"
    }
    , d: 42
    , e: ["array of strings"]
})

// undefined
console.log("correct", correct)

var ObjectID = String

var schema = validate({
    a: String
    , b: Boolean
    , c: Object
    , d: Number
    // e must be an array that contains strings
    , e: [String]
    , f: function (value) {
        // arbitary functions. Return no value if valid.
        // Return a string to indicate this is an error.
        if (value !== 42) {
            return "go away!"
        }
    }
    // nested schemas are allowed too
    , g: {
        h: String
    }
    // Enums allow you to say the value must be one of
    // the whitelisted values. Useful for self documenting
    // schemas
    , i: Enum("one", "two")
    // any schema is valid in arrays including functions
    , j: [function (value) {
        if (value !== 21) {
            return "invalids!"
        }
    }]
    // Tip: you can rename variables to make schemas more
    // self documenting!
    , k: ObjectID
}, "not valid: ")

var correct = schema({
    a: "some string"
    , b: true
    , c: {
        "arbitary": "object"
    }
    , d: 42
    , e: ["array of strings"]
    , f: 42
    , g: {
        h: "nested validation"
    }
    , i: "one"
    , j: [21, 21]
    , k: "12541-1awra2-163;a-afawf5"
})

console.log("large schema is correct?", correct)
