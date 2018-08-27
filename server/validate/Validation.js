module.exports.IsMail = function (email) {
    var r0 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return r0.test(String(email).toLowerCase());
};

module.exports.IsName = function (name) {
    //var r1 = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    //var r1 = /^[a-zA-Z]{3,15}(([ ][a-zA-Z]{1,15})?[a-zA-Z]{2,15})*/;
    var r1 = /^([a-zA-Z]{3,20})+([ ]?[a-zA-Z]{3,15})?$/;
    return r1.test(String(name)) && name != null && String(name).length > 2 && String(name).length < 40;
}

module.exports.IsPassword = function (password) {
    var r2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?,.:;&#_])[A-Za-z\d$@$!%*?,.:;&#_]{8,20}$/;
    return r2.test(String(password));
}