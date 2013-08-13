// app.factory("AuthenticationService", function($location) {
//   return {
//     login: function(credentials) {
//       if (credentials.username !== "ralph" || credentials.password !== "wiggum") {
//         alert("Username must be 'ralph', password must be 'wiggum'");
//       } else {
//         $location.path('/home');
//       }
//     },
//     logout: function() {
//       $location.path('/login');
//     }
//   };
// });

app.controller("LoginController", function($scope, $location) {
  $scope.credentials = { username: "", password: "" };

  $scope.login = function() {
    if (credentials.username !== "fer" || credentials.password !== "fer") {
      alert("Wrong credentials");
    } else {
      alert("Success!");
    }
  }
});