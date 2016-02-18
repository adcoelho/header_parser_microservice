var http = require('http');
var uaparser = require('ua-parser-js');
var locale = require('locale');

var server = http.createServer(function (req, res) {
    var result = {
        ipaddress: null,
        language: null,
        software: null
    }
    var ua = uaparser(req.headers['user-agent']);
    result.software = `${ua.os.name} ${ua.os.version}`;
    var ip = req.connection.remoteAddress;
    result.ipaddress = ip.substring(ip.lastIndexOf(':') + 1); // Strip the ::ffff:
    var locales = new locale.Locales(req.headers["accept-language"])
    result.language = locales.best();
    res.end(JSON.stringify(result));
});

server.listen(process.env.PORT || 5000);
//server.listen(8080);