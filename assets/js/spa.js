angular.module("Platzi", []);
angular.module("Platzi").controller("BaseCtrl", [
  "$scope",
  function($scope) {
    io.socket.get("/emoji", data => {
      $scope.emojis = data;
      $scope.$apply();
    });

    io.socket.on("emoji", event => {
      switch (event.verb) {
        case "created":
          $scope.emojis.push(event.data);
          $scope.$apply();
          break;
      }
    });
  }
]);
