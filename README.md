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
```

## Installation

`npm install valid-schema`

## Contributors

 - Raynos

## MIT Licenced
