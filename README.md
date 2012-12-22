# valid-schema

[![build status](https://secure.travis-ci.org/Colingo/valid-schema.png)](http://travis-ci.org/Colingo/valid-schema)

[![browser support](http://ci.testling.com/Colingo/valid-schema.png)](http://ci.testling.com/Colingo/valid-schema)

Validate objects against schemas

## Example

`validate` creates validation functions based on an schema object.

You can then call the returned function with any data and
    the validation function will tell you either a errors array
    or null.

```js
var assert = require("assert")

var validate = require("valid-schema")

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

console.log("error", error)
assert.deepEqual([
    "b is not a boolean"
    , "c is not an object"
    , "d is not a number"
    , "e is not an array"
], error)

var correct = isValid({
    a: "some string"
    , b: true
    , c: {
        "arbitary": "object"
    }
    , d: 42
    , e: ["array of strings"]
})

console.log("correct", correct)
assert.equal(null, correct)
```

## kitchen sink

```js
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
    // optional value. May be null, undefined or not existant
    // if it exists it has to be a string
    , l: Maybe(String)
})

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

## Docs

### `validate`

validate takes an object literal consisting of keys and validator
functions.

It then returns a validation function. Which can be called with
objects. If the object matches the initial schema then null is
returned otherwise an array of validation errors is returned.

If a property in the object is not in the schema then a
    "prop is not in schema" error is returned.

Internally every validator is a function. However there are
    special values which you can have in your schemas which
    are turned into functions for you. Objects are wrapped by
    `Hash`, arrays are wrapped by `List` and built ins are
    wrapped by `Type`

## Validators

### Arbitary functions

An arbitary function is a validator if it takes `(value, key)`
    as parameters and either returns nothing or a single
    validation error

```js
var assert = require("assert")
var validate = require("valid-schema")

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

assert.equal(null, correct)
assert.deepEqual(["wrong magic value!"], wrong)
console.log("correct", correct, "wrong", wrong)
```

### Builtins

`Number`, `Boolean`, `String` and `Object` are valid validators
    which check whether the value for that property is of the
    relevant type.

```js
var assert = require("assert")
var validate = require("valid-schema")

var schema = validate({
    foo: Object
    , bar: Number
})

var correct = schema({ foo: { baz: 42 }, bar: 42 })
var wrong = schema({ foo: 42, bar: false, extra: "noise" })

assert.equal(null, correct)
assert.deepEqual([
    "foo is not an object"
    , "bar is not a number"
    , "extra is not in schema"
], wrong)
console.log("correct", correct, "wrong", wrong)
```

builtins are internally wrapped in types. So the following are
    the same.

```js
var validate = require("valid-schema")
var Type = require("valid-schema/type")

var schema = validate({
    foo: Number
})

var schema = validate({
    foo: Type(Number)
})
```

### Arrays

If a validator is an array then it's expected the value will
    be an array and that each member of the array matches
    the first value in validator

```js
var assert = require("assert")
var validate = require("valid-schema")

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

assert.equal(null, correct)
assert.deepEqual([
    "foos is not an array"
    , "no"
], wrong)
console.log("correct", correct, "wrong", wrong)
```

Internally list is used. The following are the same.

```js
var validate = require("valid-schema")
var List = require("valid-schema/list")

var schema = validate({
    foo: [String]
})

var schema = validate({
    foo: List(String)
})
```

### Nested objects

If you use nested objects in the schema then those nested
    objects become sub schemas. Meaning that the value of the
    property must match the nested object as if it's a schema.

```js
var assert = require("assert")
var validate = require("valid-schema")

var schema = validate({
    foo: {
        bar: String
        , baz: [Number]
    }
})

var correct = schema({ foo: { bar: "foo", baz: [1, 2, 3] } })
var wrong = schema({ foo: "baz" })
var wrong2 = schema({ foo: { bar: 42, baz: {} } })

assert.equal(null, correct)
assert.deepEqual([
    "foo.value cannot be validated"
], wrong)
assert.deepEqual([
    "foo.bar is not a string"
    , "foo.baz is not an array"
], wrong2)
console.log("correct", correct, "wrong", wrong, "wrong2", wrong2)
```

Internally hash is used. The following are the same

```js
var validate = require("valid-schema")
var Hash = require("valid-schema/hash")

var schema = validate({
    foo: {
        bar: String
    }
})

var schema = validate({
    foo: Hash({
        bar: String
    })
})
```

### Enum

Enums allow you to specifically enumerate all the allowed values
    for a particular property.

```js
var assert = require("assert")
var validate = require("valid-schema")
var Enum = require("valid-schema/enum")

var schema = validate({
    foo: Enum("one", "two", "three")
})

var correct = schema({ foo: "one" })
var wrong = schema({ foo: "four" })

assert.equal(null, correct)
assert.deepEqual([
    "four is not a valid enum member for foo"
], wrong)

console.log("correct", correct, "wrong", wrong)
```

### Maybe

Maybe allows you to specificy properties that may be validated
    by a validator but could also be `null`, `undefined` or just
    non existant

```js
var assert = require("assert")

var validate = require("valid-schema")
var Maybe = require("valid-schema/maybe")

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

console.log("correct", correct, "correct2", correct2, "correct3"
    , correct3, "\ncorrect4", correct4, "error", error)
```

## Installation

`npm install valid-schema`

## Contributors

 - Raynos

## MIT Licenced
