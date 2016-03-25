'use strict';

var app = angular.module("petApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("clients", {
            url: "/",
            templateUrl: "/partials/clients.html",
            controller: "clientsCtrl"
        })
        .state("pets", {
            url: "/client/pets",
            templateUrl: "/partials/pets.html",
            controller: "petsCtrl",
            params:{"client":null}
        })
        .state("clientPets", {
            url: "/client/adoptedpets",
            templateUrl: "/partials/yourpets.html",
            controller: "clientPetsCtrl",
            params:{"client":null}
        })

    $urlRouterProvider.otherwise("/");
});