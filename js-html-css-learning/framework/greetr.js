(function(global,$){

    var Greetr = function(firstName,lastName, language){
        return new Greetr.init( firstName,lastName, language );
    }
    Greetr.prototype = {};
    Greetr.init = function(firstName,lastName,language){
        var self = this;
        self.firstName = firstName || 'Default';
        self.lastName = lastName || 'Default';
        self.language = language || 'en';

    }
    Greetr.init.prototype = Greetr.prototype;
    global.G$ = globla.Greetr = Greetr;


}(window,jQuery));