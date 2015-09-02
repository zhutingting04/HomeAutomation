//Manages communication between control panel and server. Handling request and response to server

server = {
    settings: {
        url_check: "http://tingtingz.com/TTZ.WebAPI/api/HomeControls",
        url_update: "http://tingtingz.com/TTZ.WebAPI/api/UpdateHomeControls",
        defaultState: {
            light: true, //boolean value for light state; true= on
            temperature: 22, //for simplicity, integer for temperature; between 15-30
            curtain: true //boolean value for curtain state. true: open
        }
    },

    getState: function (state) {
        //$.ajax({
        //    type:"GET",
        //    data: {},
        //    url: server.settings.url_check,
        //    success: function (result) {
        //        return result;
        //        console.log(result);
        //    },
        //    error:function(XMLHttpRequest, textStatus, errorThrown){
        //        console.log("Error status: " + textStatus);
        //    }
        //});
        return server.settings.defaultState;
    },

    //Post request to update server of the current states
    updateState: function (state) {
        //$.ajax({
        //    type:"POST",
        //    data: state,
        //    url: server.settings.url_update,
        //    dataType:'json',
        //    success: function (result) {
        //        console.log(result)
        //    },
        //    error:function(XMLHttpRequest, textStatus, errorThrown){
        //        console.log("Error status: " + textStatus);
        //    }
        //});
    }
}