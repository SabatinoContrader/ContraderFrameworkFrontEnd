window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../css/styles.css');
var utils = require('./utils/utils');


//initialise globals


window.onload = function(){

    //register router
    window.addEventListener(
        "hashchange", 
        function(){utils.router()}
    );

    utils.router();
};