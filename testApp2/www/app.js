var app = angular.module('app', ['ngRoute', 'angular-md5', 'pascalprecht.translate']);
var fw7 = new Framework7({ swipePanel: 'left' });
var navBar = document.getElementById('navBar');
var devicesList = [];

// Table de routage
app.config(function ($routeProvider)
{
    $routeProvider.when('/connect',
    {
        templateUrl: 'views/connect.html',
        controller: 'connectController'
    });

    $routeProvider.when('/deviceList',
    {
        templateUrl: 'views/deviceList.html',
        controller: 'deviceListController'
    });

    $routeProvider.when('/channelsGraph/:deviceIndex',
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
        prefix: 'translations/',
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
