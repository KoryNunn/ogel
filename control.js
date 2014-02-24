var jef = require('jef');

function Control(model, element, boundAttributes){
    var control = this;

    this._boundAttributes = boundAttributes;

    this._render = function(){
        this.element = element;
    };

    jef.Control.apply(this, arguments);

    boundAttributes.forEach(function(boundAttribute){
        jef.addProperty(control, boundAttribute.name);
    });
    this._bind();
}
Control.prototype = Object.create(jef.Control.prototype);
Control.prototype.constructor = Control;
Control.prototype._bind = function(){
    var control = this;

    this._boundAttributes.forEach(function(boundAttribute){
        var handler;

        if(boundAttribute.name === 'scope'){
            control.model = control.model.scopeTo(boundAttribute.path);

            return;
        }else if(boundAttribute.name === 'text'){
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

        if('form' in control.element){
            control.element.addEventListener('change', function(){
                control.value(control.element.value);
            });
        }

        control[boundAttribute.name].onChange(handler);

        control[boundAttribute.name].bindTo(control.model, boundAttribute.path);
    });
};

module.exports = Control;