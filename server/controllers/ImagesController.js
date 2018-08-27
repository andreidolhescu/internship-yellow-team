var fs = require('fs');

module.exports =
    {
        getByName(req, res) {
            fs.readFile('public/images/' + req.params.name, function (err, content) {
                if (err) {
                    return res.status(404).send("Nu exista imaginea respectiva");
                }
                else {
                    res.writeHead(200, {
                        'Content-type': 'image/jpg'
                    });
                    return res.end(content);
                }
            });
        }
    }