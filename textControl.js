var jef = require('jef');

function TextControl(model, element, contentBinding){
    var control = this;

    this._render = function(){
        if(typeof window === 'undefined'){
            this.element = element;
        }else{
            this.element = document.createTextNode(element.textContent);
            element.parentNode.insertBefore(this.element, element);
            element.parentNode.removeChild(element);
        }
    };

    this._contentBinding = contentBinding;

    jef.Control.apply(this, arguments);

    jef.addProperty(control, 'content');

    this._bind();
}
TextControl.prototype = Object.create(jef.Control.prototype);
TextControl.prototype.constructor = TextControl;
TextControl.prototype._bind = function(){
    var control = this;

    this.content.onChange(function(value){
        control.element.textContent = value == null ? '' : value;
    });

    this.content.bindTo(control.model, this._contentBinding);
};

module.exports = TextControl;