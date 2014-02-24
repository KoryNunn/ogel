function Controller(ogel, getTemplate, fakeWindow){
    if(getTemplate){
        this.getTemplate = getTemplate;
    }

    this.ogel = ogel;
    this.window = fakeWindow || window;
}
Controller.prototype.render = function(done) {
    var controller = this,
        complete = function(error){
            if(error){
                // throw?
                return;
            }
            done(null, controller.window.document.innerHTML);
        };

    if((this.getTemplate && !('_template' in this)) || this.debug){
        this.getTemplate(function(error, template){
            if(error){
                // throw?
                return;
            }
            controller._template = template;
            controller.window.document.innerHTML = template;
            controller.run(complete);
        });
    }else{
        controller.run(complete);
    }
};

module.exports = Controller;