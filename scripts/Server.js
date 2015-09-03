//Manage communication between control panel and server. Retrieves the current state from the server and also sends the desired one back to the server

server = {
    settings: {
        url_check: "http://tingtingz.com/TTZ.WebAPI/api/HomeControls",
        url_update: "http://tingtingz.com/TTZ.WebAPI/api/UpdateHomeControls",
        defaultState: {
            light: true, //boolean value for light state; true = on
            temperature: 22, //for simplicity, integer is used for temperature. Temperature is between 15-30
            curtain: true //boolean value for curtain state. true = open
        }
    },

    getState: function () {
        //$.ajax({
        //    type:"GET",
        //    data: {},
        //    url: server.settings.url_check,
        //    success: function (result) {
        //        return result;
        //        console.log(result);
        //    },
        //    error: function(xmlHttpRequest, status, error){
        //        console.log("Error status: " + status);
        //      console.log("Error message: " + error);
        //    }
        //});
        //return statement below is for simulating and testing purpose. When interacting with real server, please comment out this statement
        return server.settings.defaultState;
    },

    //Post request to update server of the current state. state needs to be passed from client
    updateState: function (state) {
        //$.ajax({
        //    type:"POST",
        //    data: state,
        //    url: server.settings.url_update,
        //    dataType: "json",
        //    success: function (result) {
        //        console.log(result);
        //    },
        //    error: function(xmlHttpRequest, status, error){
        //        console.log("Error status: " + status);
        //        console.log("Error message: " + error);
        //    }
        //});
    }
}