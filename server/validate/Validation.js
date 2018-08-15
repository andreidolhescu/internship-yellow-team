module.exports.IsMail = function(email)
{
    var r0 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return r0.test(String(email).toLowerCase());
};

module.exports.IsName = function(name)
{
    var r1 = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return r1.test(String(name));
}

module.exports.IsPassword = function(password)
{
    var r2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?,.:;&#_])[A-Za-z\d$@$!%*?,.:;&#_]{8,15}$/;
    return r2.test(String(password));
}