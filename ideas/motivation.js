var validate = require("valid-schema")
var Email = require("valid-schema/email")
var Range = require("valid-schema/range")
var Maybe = require("valid-schema/maybe")

var schema = validate({
    name: String
    , email: Email
    , number: Maybe(Range(Number, {
        start: 1
        , end: 99
    }))
    , address: {
        street: Maybe(String)
        , city: String
        , zip: Maybe(Range(String, {
            size: 8
        }))
    }
    , array: Maybe(Range([Number], {
        start: 1
    }))
})

var data = {
    /* data to validate */
}

var errors = schema(data)

if (errors) {
    // handle Errors
} else {
    /*global db*/
    db.insert(data, function (err) {
        // blah blah
    })
}
