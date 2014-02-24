var jsdom = require('jsdom'),
    EventEmitter = require('events').EventEmitter;

function Renderer(template, done){
    var renderer = this;

    template = template || '<!DOCTYPE html>';

    function parseTemplate(template){
        jsdom.env(
            template,
            function (errors, window) {
                renderer.window = window;

                renderer.emit('ready');
            }
        );
    }

    parseTemplate(template.toString());
}
Renderer.prototype = Object.create(EventEmitter.prototype);
Renderer.prototype.constructor = Renderer;

module.exports = Renderer;