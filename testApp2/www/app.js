var app = angular.module('app', ['ngRoute', 'angular-md5', 'pascalprecht.translate']);
var fw7 = new Framework7({ swipePanel: 'left' });
var lan = navigator.language;
var navBar = document.getElementById('navBar');

// Table de routage
app.config(function ($routeProvider)
{
    $routeProvider.when('/connect',
    {
        templateUrl: 'views/connect.html',
        controller: 'connectController'
    });

    $routeProvider.when('/deviceList/:data',
    {
        templateUrl: 'views/deviceList.html',   
        controller: 'deviceListController'
    });

    $routeProvider.when('/channelsGraph/:data',
    {
        templateUrl: 'views/channelsGraph.html',
        controller: 'channelsGraphController'
    });

    $routeProvider.otherwise({ redirectTo: '/connect' });
});

// Traductions
app.config(function ($translateProvider)
{
    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/translations/',
      suffix: '.json'
    });

    $translateProvider.registerAvailableLanguageKeys(['en', 'es', 'fr'],
    {
        'en-*': 'en',
        'es-*': 'es',
        'fr-*': 'fr',
        "*": 'en'
    });

    $translateProvider.preferredLanguage(navigator.language);    
});