/// <reference path="../site.js" />

demoApp.controller("sm_moduleController", function ($scope, $http) {
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
    $scope.mainForm = new basicContainer();
    $scope.mainForm.getData = function () {
        $scope.treeView.beginCustomLoading('Loading...');
        $http.get($scope.apiUrl).then((res) => {
            $scope.treeView.endCustomLoading();
            $scope.mainForm.data = res.data;
            $scope.treeView.option('dataSource', $scope.mainForm.data);
        }, function (errorRes) {
            $scope.treeView.endCustomLoading();
            serverErrorHandler(errorRes.status, 'GET DATA');
        });
    }

    $scope.mainForm.treeList = {
        dataSource: [],
        keyExpr: 'ID',
        parentIdExpr: 'PARENT_ID',
        displayExpr: "NAME",
        onInitialized(e) {
            $scope.treeView = e.component;
            $scope.mainForm.getData();
        },
        showRowLines: true,
        showBorders: true,
        showColumnLines: true,
        columnAutoWidth: true,
        focusedRowEnabled: true,
        editing: {
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        columns: [
            {
                dataField: 'ID',
                alignment: "center",
                allowEditing: false,
                visible: false,
            },
            {
                dataField: 'ICON',
                alignment: "center",
                cellTemplate(container, option) {
                    $(container).append('<span class="' + option.value + '"></span>');
                }
            },
            {
                dataField: 'NAME',
                alignment: "center",
            }, {
                dataField: 'PATH',
                alignment: "center",
            }
        ],
        onRowInserted(e) {
            delete e.data.ID;
            var result = setInsertDefaultParams(e.data);
            $scope.mainForm.data.pop();
            $scope.flag = 'add';
            $scope.actionHandler(result);
        },
        onRowUpdated(e) {
            var result = setUpdatetDefaultParams(e.data);
            $scope.flag = 'edit';
            $scope.actionHandler(result);
        },
        onRowRemoved(e) {
            var result = setDeleteDefaultParams(e.data);
            $scope.flag = 'remove';
            $scope.actionHandler(result);
        },
    }
    $scope.actionHandler = function (data) {
        $scope.treeView.beginCustomLoading('Processing...');
        $http.post("/api/sm_master/modules/", data).then((res) => {
            $scope.treeView.endCustomLoading();
            console.log(res)
            if (res.status === 200) {
                showIndicator(res.data, 'success');
            } else {
                $scope.treeView.option('dataSource', $scope.mainForm.data);
                showIndicator(res.data, 'error');
            }
        }, function (errorRes) {
            $scope.treeView.endCustomLoading();
            serverErrorHandler(errorRes.status, 'Process');
        });
    }

    $scope.connection = new signalR.HubConnectionBuilder().withUrl("/moduleshub").build();
    $scope.connection.start().then(function () {}).catch((error) => {
        showIndicator('connection error', 'error')
    });
    
});