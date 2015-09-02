//Home Automation Module
var s;
HomeAutomation = {
    settings: {
        //Various swiths in control panel
        switchs: {
            lightswitch: $('#bedroom-light').find('input[name="switch"]'), //light control button
            temperaturecontrol: $('#bedroom-thermometer').find('input[id="thermometer-control"]'), //temperature control
            temperaturemeter: $('#temperature-meter'), //temperature control meter value
            curtaincontrol: $('#bedroom-curtain').find('input[name="switch"]') //curtain control button
        },

        home_state: server.getState(), //get current home state

        //House simulating UI
        homeUI: {
            light: $('#light-simulate'),
            curtain: $('#curtain-simulate'),
            thermometer: $('#thermometer-simulate')
        }
    },

    init: function () {
        s = this.settings;
        //initialise bootstrap switch and slider
        $("input[name='switch']").bootstrapSwitch();
        $('#thermometer-control').slider();
        this.Actions.lightAction(null, false);
        this.Actions.curtainAction(null, false);
        this.Actions.temperatureAction(null);
        this.bindControlActions();
    },

    //bind control panel to actions
    bindControlActions: function () {
        //binding control actions when light switches
        s.switchs.lightswitch.on('switchChange.bootstrapSwitch', function (event, state) {
            HomeAutomation.Actions.lightAction(event, state)
        });

        //binding control actions when curtain switches
        s.switchs.curtaincontrol.on('switchChange.bootstrapSwitch', function (event, state) {
            HomeAutomation.Actions.curtainAction(event, state)
        });

        //binding control actions of temperature change
        //using slideStop, update server when slide stops
        s.switchs.temperaturecontrol.on('slideStop', function (event) {
            s.switchs.temperaturemeter.html(event.value);
            HomeAutomation.Actions.temperatureAction(event);
        });
    },

    //define actions for various controls
    Actions: {
        lightAction: function (event, state) {
            var flag = false; //update flag
            //trigged by click event or init
            if (event != null) {
                if (state == true) {
                    s.home_state.light = true;
                } else {
                    s.home_state.light = false;
                }
                flag = true;
            } else {
                s.switchs.lightswitch.bootstrapSwitch('state', s.home_state.light);
            }
            //Simulating Lights actions
            if (s.home_state.light == true) {
                s.homeUI.light.animate({ opacity: "0.1" }, 300);
            } else {
                s.homeUI.light.animate({ opacity: "0.7" }, 300);
            }
            //Update Server
            if (flag) {
                server.updateState(s.home_state);
            }
        },

        curtainAction: function (event, state) {
            var flag = false; //update flag
            //trigged by click event or init
            if (event != null) {
                if (state == true) {
                    s.home_state.curtain = true;
                } else {
                    s.home_state.curtain = false;
                }
                flag = true;
            } else {
                s.switchs.curtaincontrol.bootstrapSwitch('state', s.home_state.curtain);
            }
            //Simulating curtain actions
            if (s.home_state.curtain == true) {
                s.homeUI.curtain.animate({ height: "20px" }, 1200);
            } else {
                s.homeUI.curtain.animate({ height: "200px" }, 1200);
            }
            //Update Server
            if (flag) {
                server.updateState(s.home_state);
            }
        },

        temperatureAction: function (event) {
            var flag = false; //update flag
            var currentTemp; //current temperature
            //trigged by click event or init
            if (event != null) {
                currentTemp = event.value;
                s.home_state.temperature = currentTemp;
                flag = true;
            } else {
                currentTemp = s.home_state.temperature;
                s.switchs.temperaturecontrol.slider('setValue', currentTemp)
                s.switchs.temperaturemeter.html(currentTemp);
            }
            //Simulating thermometer actions
            //temperature is between 15 and 22
            //calculate percentage of progress bar. The min is 15, the max is 30. So the variation is 30 -15.
            var percentage = Math.ceil((currentTemp - 15) * 100 / (30 - 15));
            var width = percentage + "%";
            s.homeUI.thermometer.width(width);
            s.homeUI.thermometer.attr('aria-valuenow', currentTemp);
            s.homeUI.thermometer.html(currentTemp);
            //Update Server
            if (flag) {
                server.updateState(s.home_state);
            }
        }
    }
}
