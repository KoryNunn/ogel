var jsdom = require('jsdom'),
    jef = require('jef'),
    Ooze = require('ooze'),
    WeakMap = require('weakmap');

function Control(model, element, boundAttributes){
    var control = this;

    this._boundAttributes = boundAttributes;

    this._render = function(){
        this.element = element;
    };

    jef.Control.apply(this, arguments);

    boundAttributes.forEach(function(boundAttribute){
        jef.addProperty(control, boundAttribute.name);

        var handler;

        if(boundAttribute.name === 'text'){
            handler = function(value){
                control.element.textContent = value == null ? '' : value;
            };
        }else{
            handler = function(value){
                if(value == null){
                    control.element.removeAttribute(boundAttribute.name);
                }else{
                    control.element.setAttribute(boundAttribute.name, value);
                }
            };
        }

        control[boundAttribute.name].onChange(control.model, handler);
    });
    this._bind();
}
Control.prototype = Object.create(jef.Control.prototype);
Control.prototype.constructor = Control;
Control.prototype._bind = function(){
    var control = this;

    this._boundAttributes.forEach(function(boundAttribute){
        control[boundAttribute.name].bindTo(boundAttribute.path);
    });
};

function Renderer(template){
    var renderer = this;
    this.model = new Ooze();

    var pageElements = [];

    function bindElement(element, boundAttributes){
        var control = new Control(renderer.model, element, boundAttributes);
        pageElements.push(control);
    }

    function parseTemplate(template){
        jsdom.env(
            template,
            function (errors, window) {
                var elements = window.document.querySelectorAll('*');
                [].forEach.call(elements, function(element){
                    var boundAttributes = [];
                    Object.keys(element.attributes).filter(function(key){
                        if(key.indexOf('ogel') === 0){
                            var boundAttribute = {
                                name: key.slice(5),
                                path: element.getAttribute(key)
                            };
                            boundAttributes.push(boundAttribute);
                        }
                    })
                    if(boundAttributes.length){
                        bindElement(element, boundAttributes);
                    }
                });


            }
        );
    }

    parseTemplate(template.toString());

    setTimeout(function(){
        renderer.model.set('deals', 'abc')
    },1000);
}

module.exports = Renderer;