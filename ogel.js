var arrayProto = [],
    Control = require('./control'),
    TextControl = require('./textControl'),
    ogel = {};

function bindElement(element, model, boundAttributes){
    var ogel = this;
    if(element.tagName in ogel.controls){
        new ogel.controls[element.tagName](model, element, boundAttributes);
    }else{
        new Control(model, element, boundAttributes);
    }
}

function init(elements, model){
    var ogel = this;
    arrayProto.forEach.call(elements, function(element){
        if(element.tagName === 'OGEL-TEXT'){
            new TextControl(model, element, element.getAttribute('content'));
            return;
        }

        var boundAttributes = [];

        for(var i = 0; i < element.attributes.length; i++){
            var attribute = element.attributes[i];
            if (!attribute.specified) {
                continue;
            }

            if(attribute.name.indexOf('ogel') === 0){
                var boundAttribute = {
                    name: attribute.name.slice(5),
                    path: attribute.value
                };
                boundAttributes.push(boundAttribute);
            }
        }

        if(boundAttributes.length){
            ogel.bindElement(element, model, boundAttributes);
        }
    });
};

function Ogel(){
    this.controls = {};
}
Ogel.prototype.init = init;
Ogel.prototype.bindElement = bindElement;

module.exports = Ogel;