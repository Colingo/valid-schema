var validate = require("valid-schema")
var Email = require("valid-schema/email")

var schema = validate()
    .prop("name", String)
    .prop("email", Email)
    .prop("number")
        .maybe()
        .range({ start: 1, end: 99 })
        .is(Number)
    .schema("address")
        .prop("street")
            .maybe()
            .is(String)
        .prop("city", String)
        .prop("zip")
            .maybe()
            .range({ size: 8 })
            .is(String)
        .end()
    .list("array")
        .maybe()
        .range({ start: 1 })
        .value(Number)

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
