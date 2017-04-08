'use strict';

angular
  .module("myApp")
  .factory("placeService",placeService);

  placeService.$inject = ['$http'];

  function placeService($http){

    var service = {
      getAllPlaces: getAllPlaces,
      create: create,
      remove: remove,
      update: update,
      getPlaceById: getPlaceById,
      setPlaces: setPlaces,
      getPlaces: getPlaces,
    };

    return service;

    function getAllPlaces () {
      return $http.get("/places");
    }

    function create(data) {
      return $http.post("/places/add", data);
    }

    function remove(id) {
      return $http.delete("/places/" + id, { params: { id: id } });
    }

    function update(data, id) {
      return $http.put("/places/" + id, data);
    }

    function getPlaceById(id) {
      return $http.get("/places/" + id);
    }

    var Places = "";

    function setPlaces(places) {
      Places = places;
    }

    function getPlaces() {
      return Places;
    }
}