'use strict';

var app = angular.module("petApp");

app.controller("clientsCtrl", function($scope, $state, clientService, petService) {
    $scope.allClients = [];
    $scope.editView = false;
    getAllClients();

    function getAllClients() {
        clientService.getAll();
    };

    $scope.$watch(function() {
        return clientService.allClients;
    }, function(curVal, prevVal) {
        $scope.allClients = curVal;
    });

    $scope.editClient = function(inp) {
        $scope.editView = true;
        $scope.editClient = inp;
    };

    $scope.updateClient = function(inp) {
        clientService.updateClient(inp);
        $scope.editView = false;
        getAllClients();
    };

    $scope.closeCard = function() {
        $scope.editView = false;
    };

    $scope.deleteClient = function(inp) {
        clientService.deleteClient(inp);
    };

    $scope.seeYourPets = function(inp) {
        $state.go("clientPets", {
            "client": inp
        });
    };

    $scope.getMorePets = function(inp) {
        $state.go("pets", {
            "client": inp
        });
    };

    $scope.addClient = function(inp) {
        clientService.addClient(inp);
    };
});

app.controller("petsCtrl", function($scope, $state, clientService, petService) {

    $scope.editView = false;
    console.log($state.params.client);
    $scope.allPets = [];

    getAllPets();

    function getAllPets() {
        petService.getAllPets();
    }

    $scope.addPet = function(inp) {
        petService.addPet(inp);
    }

    $scope.$watch(function() {
        return petService.allPets;
    }, function(curVal, prevVal) {
        $scope.allPets = curVal;
    });


    $scope.editPets = function(inp) {
        $scope.editView = true;
        inp.birthDate = new Date(inp.birthDate);
        $scope.editPet = inp;
    }

    $scope.updatePet = function(inp) {
        petService.updatePet(inp);
        $scope.editView = false;
        getAllPets();
    }

    $scope.closeCard = function() {
        $scope.editView = false;
    }

    $scope.deletePet = function(inp) {
        petService.deletePet(inp);
    }

});

app.controller("clientPetsCtrl", function($scope, $state, clientService, petService) {

    $scope.editView = false;
    console.log($state.params.client);
    $scope.allPets = [];

    getAvailablePets();

    function getAvailablePets() {
        petService.getAvailablePets();
    }

    $scope.addPet = function(inp) {
        petService.addPet(inp);
    }

    $scope.$watch(function() {
        return petService.allPets;
    }, function(curVal, prevVal) {
        $scope.allPets = curVal;
        console.log(curVal);
    });


    $scope.editPets = function(inp) {
        $scope.editView = true;
        inp.birthDate = new Date(inp.birthDate);
        $scope.editPet = inp;
    }

    $scope.updatePet = function(inp) {
        petService.updatePet(inp);
        $scope.editView = false;
        getAllPets();
    }

    $scope.closeCard = function() {
        $scope.editView = false;
    }

    $scope.deleteClient = function(inp) {
        clientService.deleteClient(inp);
    }


});