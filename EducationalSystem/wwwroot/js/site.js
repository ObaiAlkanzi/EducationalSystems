demoApp = angular.module('demoApp', ['dx']).
    controller("mainController", function ($scope, $http) {

        $scope.msg = "SignalR";
        $scope.counter = 0;
        $scope.connection = new signalR.HubConnectionBuilder().withUrl("/firsthub").build();
        $scope.connection.start().then(function () {
            $scope.connection.invoke("UserConnected",1).then(() => {

            }).catch((error) => {

            });
        }).catch((error) => {
            showIndicator('connection error','error')
        });
        $scope._headerToolbar = {
            onInitialized(e) {
                $scope._headerInit = e.component;
            },
            items: [
                {
                    widget: 'dxButton',
                    location: "before",
                    options: {
                        elementAttr: { class: 'header-button' },
                        icon: 'menu',
                        onClick() {
                            $scope.connection.invoke("SendMessage", "obai", "this is my message").then(() => {
                                
                            }).catch((error) => {
                                
                            });
                        }
                    }
                }, {
                    widget: 'dxButton',
                    location: "after",
                    options: {
                        elementAttr: { class: 'header-button' },
                        icon: 'fa-regular fa-bell'
                    }
                }, {
                    
                    location: "after",
                    text: '0',
                }, {
                    widget: 'dxButton',
                    location: "after",
                    options: {
                        elementAttr: { class: 'header-button' },
                        icon: 'fa-regular fa-user'
                    }
                }
            ],
        };

        $scope.connection.on("ReseciveMessage", function (user,msg) {
            $scope.counter = $scope.counter + 1;
            $scope._headerInit.option('items[2].text', $scope.counter)
        });
        $scope.connection.on("UserConnected", function (connectionId,userId) {
            console.log(connectionId, userId)
        });
        $scope.connection.on("UserDisconnected", function (connectionId) {
            console.log(connectionId, 'offline')
        });
       
    });