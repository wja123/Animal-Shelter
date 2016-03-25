'use strict';

var app = angular.module("petApp");

app.service("clientService", function($http) {

    this.allClients = [];
    this.currClient = {};

    this.getAll = function() {
        $http.get('/clients').then(res => {
            this.allClients = res.data;
        }, err => {
            console.log(err);
        });
    };

    this.getClient = function(clientId) {
        $http.get(`/clients/${clientId}`).then(res => {
            this.currClient = res.data;
        }, err => {
            console.log(err);
        });
    };

    this.updateClient = function(clientInfo) {
        $http.put(`/clients/${clientInfo._id}`, clientInfo).then(res => {
            this.currClient = res.data;
        }, err => {
            console.log(err);
        });
    };

    this.addClient = function(inp) {
        $http.post('/clients', inp).then(res => {
            console.log("Added!");
            this.getAll();
        }, err => {
            console.log(err);
        });
    }


    this.deleteClient = function(clientInfo) {
        $http.delete(`/clients/$clientInfo._id`).then(res => {
            console.log("Deleted!");
        }, err => {
            console.log(err);
        });
    };
});


app.service("petService", function($http) {

    this.allPets = [];

    this.getAllPets = function() {
        $http.get('/pets').then(res => {
            this.allPets = res.data;
        }, err => {
            console.log(err);
        });
    }

    this.getAvailablePets = function() {
        $http.get('/pets/available').then(res => {
            this.allPets = res.data;
        }, err => {
            console.log(err);
        });
    }


    this.addPet = function(inp) {
        $http.post('/pets', inp).then(res => {
            console.log("Added!");
            this.getAllPets();
        }, err => {
            console.log(err);
        });
    }

    this.updatePet = function(inp) {
        $http.put(`/pets/${inp._id}`, inp).then(res => {
            console.log("Updated!");
            this.getAllPets();
        }, err => {
            console.log(err);
        });
    }

    this.deletePet = function(inp) {
        $http.delete(`/pets/${inp._id}`).then(res => {
            console.log("Updated!");
            this.getAllPets();
        }, err => {
            console.log(err);
        });
    }
});