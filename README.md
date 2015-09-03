# Home Automation Project
## General Description
A JavaScript application simulating house automation: pressing a button on a control panel would visually turn on a light, change the temperature or close the curtains
## Meet with Requirements
__The application must use jQuery__
 
 jQuery2 is used in this proof-of-concept project
 
__The components must interact with static server resources__
 
 In Server.js, interaction between server and client is achieved by getState (retrieving the current states from the server) and updateState (send the desired state to the server) functions in Server object.
 
__The solution has to be extensible and documented, so that we can develop our own components that react to events__

+ The project is developed bearing in mind of continuous development. So the Javascript and Html structure has been organised to ensure the code is easy to understand (e.g., module pattern in Global.js; Encapsulation in HomeAutomation.js; Bootstrap for easy extending).
+ Comments are embedded in line to help developers understand the code
+ Instructions are embedded in line to help developers extend the solution.
 
## Additional Features
The UI is responsive
 
## Frameworks implemented
The following frameworks/libraries are adopted (in addition to jQuery):
* Bootstrap
* Bootstrap Slider
* Bootstrap Switcher
 
## Limitations and potential improvements
* This project is intended for proof-of-concept. Therefore there is plenty of room to improve. For example, temperature min and max is hardcoded. Better error handling can be implemented.
 
* This project has been developed with performance optimisation in mind (e.g., http://lab.abhinayrathore.com/jquery-standards/). But there are further improvements can be done, e.g., optimise CSS selector.
 
* This project may not support legacy browsers (e.g., IE 8), since Jquery2 is implemented.
 
## Browser compatibility testing
* Lastest Firefox
* Latest Chrome
* IE 11

## Declariation

I have not copied any codes apart from css reset (which is referenced). Though I was inspired by a few home automation solutions on Github and a course on Pluralsight: http://www.pluralsight.com/courses/home-automation-fundamentals.