var http = require('http');
var uaparser = require('ua-parser-js');

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
    res.end(JSON.stringify(result));
});

//server.listen(process.env.PORT || 5000);
server.listen(8080);