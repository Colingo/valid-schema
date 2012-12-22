module.exports = union

function union(as, bs) {
    var list = as.concat(bs)
    return list.filter(function (value, key) {
        if (list.indexOf(value) === key) {
            return true
        }
    })
}
