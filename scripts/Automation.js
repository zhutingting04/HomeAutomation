//Home Automation Module
var s;
HomeAutomation = {
    settings: {
        //Various swiths in control panel
        // Can be extended if required
        switches: {
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
        //initialise bootstrap switch and slider; Can be encapsulated when frameworks grow.
        $("input[name='switch']").bootstrapSwitch();
        $('#thermometer-control').slider();
        //initialise the house states. Can be encapsulated when more controls are used.
        this.Actions.lightAction(null, false);
        this.Actions.curtainAction(null, false);
        this.Actions.temperatureAction(null);
        //bind control panel buttons to listeners
        this.bindControlActions();
    },

    //bind control panel to listeners
    bindControlActions: function () {
        //binding kight control with listner
        s.switches.lightswitch.on('switchChange.bootstrapSwitch', function (event, state) {
            HomeAutomation.Actions.lightAction(event, state);
        });

        //binding curtain control with listener
        s.switches.curtaincontrol.on('switchChange.bootstrapSwitch', function (event, state) {
            HomeAutomation.Actions.curtainAction(event, state);
        });

        //binding temperature control with listener
        //using slideStop, update server when slide stops
        s.switches.temperaturecontrol.on('slideStop', function (event) {
            s.switches.temperaturemeter.html(event.value);
            HomeAutomation.Actions.temperatureAction(event);
        });
    },

    //define actions for various controls
    Actions: {
        lightAction: function (event, state) {
            var flag = false; //update flag
            //trigged by click event or init
            //when event equals to null, this is trigged by init. Otherwise, this is trigged by control toggle
            if (event != null) {
                s.home_state.light = state;
                flag = true;
            } else {
                s.switches.lightswitch.bootstrapSwitch('state', s.home_state.light);
            }
            //Simulating Lights actions
            if (s.home_state.light === true) {
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
            //when event equals to null, this is trigged by init. Otherwise, this is trigged by control toggle
            if (event != null) {
                s.home_state.curtain = state;
                flag = true;
            } else {
                s.switches.curtaincontrol.bootstrapSwitch('state', s.home_state.curtain);
            }
            //Simulating curtain actions
            if (s.home_state.curtain === true) {
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
            //Validate temperature.
            if (s.home_state.temperature < 15 || s.home_state.temperature > 30) {
                alert("Temperature is out of range. Please check server response");
                return;
            };
            //trigged by click event or init
            //when event equals to null, this is trigged by init. Otherwise, this is trigged by control panel update
            if (event != null) {
                currentTemp = event.value;
                s.home_state.temperature = currentTemp;
                flag = true;
            } else {
                currentTemp = s.home_state.temperature;
                s.switches.temperaturecontrol.slider('setValue', currentTemp);
                s.switches.temperaturemeter.html(currentTemp);
            }
            //Simulating thermometer actions
            //calculate percentage of progress bar. For simplicity, value is round up to the next close integer. 
            //The min temperature is 15, the max is 30. So the variation is 30 -15.
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
