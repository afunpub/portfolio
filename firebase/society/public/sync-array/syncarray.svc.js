'use strict';

app.factory('syncArraySvc', ['FIREBASE_URI', '$firebaseArray',
  function (FIREBASE_URI, $firebaseArray) {
    var buildingsUri = FIREBASE_URI + '/buildings';
    var ref = new Firebase(buildingsUri);
    console.log(ref);
    var buildings = $firebaseArray(ref);
console.log(buildings);
    var getBuildings = function () {
      return buildings;
    };

    var addBuilding = function (item) {
      buildings.$add(item);
    };



    var updateBuilding = function (id) {
      buildings.$save(id);
    };

    var removeBuilding = function (id) {
      buildings.$remove(id);
    };

    return {
      getBuildings: getBuildings,
      addBuilding: addBuilding,
      updateBuilding: updateBuilding,
      removeBuilding: removeBuilding
    }
  }]);