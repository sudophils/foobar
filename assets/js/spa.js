angular.module("Platzi", []);
angular.module("Platzi").controller("BaseCtrl", [
  "$scope",
  function($scope) {
    io.socket.get("/emoji", data => {
      $scope.emojis = data;
      $scope.$apply();
    });
  }
]);
