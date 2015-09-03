//global.js is for loading multiple modules. HomeAutomation is one of the modules. 
(function () {
    $(document).ready(function () {
        HomeAutomation.init();
        //Can be extended to have multiple module
        //CheckSafety.init();
    });
})();