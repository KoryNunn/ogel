var Control = require('./control');

function TextareaControl(){
    Control.apply(this, arguments);
}
TextareaControl.prototype = Object.create(Control.prototype);
TextareaControl.prototype.constructor = TextareaControl;
TextareaControl.prototype._bind = function(){
    Control.prototype._bind.apply(this, arguments);

    var control = this;

    if(control.value){
        control.value.onChange(function(value){
            control.element.value = value == null ? '' : value;
        });
    }
};

module.exports = TextareaControl;