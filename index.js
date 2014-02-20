var fs = require('fs'),
    template = fs.readFileSync('./html/index.html'),
    Ogel = require('./ogel'),
    renderer = new Ogel(template);

renderer.model.set({
    a:'123'
})