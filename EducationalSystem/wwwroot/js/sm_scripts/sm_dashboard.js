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
    };
    $scope.users = new dashContainer();
    $scope.users.dataGrid.onInitialized = function (e) {
        $scope.users_grid = e.component;
        $scope.users.getData();
    };
    $scope.users.getData = function () {
        //$scope.users_grid.beginCustomLoading('Loading...');
        //$http.get($scope.apiUrl).then((res) => {
        //    $scope.users_grid.endCustomLoading()
        //    $scope.users.data = res.data;
        //}, function (errorRes) {
        //    $scope.users_grid.endCustomLoading();
        //    serverErrorHandler(errorRes.status, 'Fetch data');
        //});
        for (var i = 1; i <= 10; i++) {
            $scope.users.data.push({
                ID: i,
                NAME: 'User ' + i,
                ONLINE: 1,
            });
        }
       
    };
    $scope.users.dataGrid.bindingOptions = {
        dataSource: 'users.data',
    };
    $scope.users.dataGrid.onEditorPreparing = function (e) {
        if (e.parentType == "dataRow" && e.dataField == "ONLINE") {
            e.editorName = "dxSwitch";
        }
    }
    $scope.users.dataGrid.columns = [
        {
            dataField: 'ID',
            dataType: 'number',
            allowEditing: false,
            width: 100,
            visible: false,
            alignment: 'center'
        }, {
            dataField: 'NAME',
            caption: 'Pro',
            alignment: 'center',
            width:40,
            cellTemplate(container, option) {
                $(container).append('<img class="img img-responsive data-row-img" src="/images/usersprofiles/user.png" />');
            }
        },{
            dataField: 'NAME',
        },{
            dataField: 'ONLINE',
            cellTemplate(container, option) {
                switch (option.value) {
                    case 1:
                        $(container).append('<span class="online">online</span>');
                        break;
                    default:
                        $(container).append('<span class="offline">offline</span>');
                        break;
                }
                
            },
            width: 40,
        },
    ];
    $scope.users.dataGrid.editing = {
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        useIcons: true
    };

    $scope.drag = {
        group: 'appointmentsGroup',
        onDragStart(e) {
            e.cancel = false;
        },
    }
        
});