/// <reference path="../site.js" />

demoApp.controller("sm_dashboardController", function ($scope, $http) {
    $scope.loadingVisible = false;
    $scope.loadOptions = {
        container: '.treeBox',
        message: "Loading modules...",
        position: 'center',
        shading: true,
        shadingColor: "transparent",
        bindingOptions: {
            visible: 'loadingVisible',
        },
    };
    $scope.scrollViewOptions = {
        width: '100%',
        height: '100%',
    };
    $scope.apiUrl = "/api/sm_master/modules/";
    $scope.resizable = {
        handles: "all",
        keepAspectRatio: true
    }
});