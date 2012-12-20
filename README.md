# valid-schema

[![build status](https://secure.travis-ci.org/Colingo/valid-schema.png)](http://travis-ci.org/Colingo/valid-schema)

[![browser support](http://ci.testling.com/Colingo/valid-schema.png)](http://ci.testling.com/Colingo/valid-schema)

Validate objects against schemas

## Example

`validate` creates validation functions based on an schema object.

You can then call the returned function with any data and
    the validation function will tell you either an error string
    or undefined.

```js
var validate = require("../index")

var isValid = validate({
    foo: String
    , bar: Boolean
    , x: Object
    , y: Number
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
    , bar: true
    , x: {
        "arbitary": "object"
    }
})

// undefined
console.log("correct", correct)
```

## kitchen sink

```
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
```

## Installation

`npm install valid-schema`

## Contributors

 - Raynos

## MIT Licenced
