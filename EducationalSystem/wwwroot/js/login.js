demoApp = angular.module('demoApp', ['dx']).
    controller("loginController", function ($scope, $http) {

        $scope.msg = "SignalR Go On";
        $scope.counter = 0;
        $scope.login = {
            userEmail: {
                placeholder: 'Your Email',
                showClearButton:true,
            },
            userPassword: {
                placeholder: 'Your Password',
                showClearButton: true,
                mode:'*'
            },
            submit: {
                text: 'Login',
                type:'default',
                onClicl() {
                    showIndicator("Login", "success");
                },
                width:'100%',
            },
            google: {
                elementAttr: {class:'login-btn'},
                type: 'danger',
                icon:'fa-brands fa-google-plus-g',
                onClick() {
                    location.replace("Home/ExternalLogin");
                },
            }
        };
        $scope.buildBtn = function (data) {
            console.log(data)
            /*return {
                text:data.displayName
            }*/
        }
        $scope.resizable = {
            handles: "bottom right",
            keepAspectRatio:true
        }

       
    });