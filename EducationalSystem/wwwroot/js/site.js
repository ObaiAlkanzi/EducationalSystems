demoApp = angular.module('demoApp', ['dx']).
    controller("mainController", function ($scope, $http) {

        $scope.msg = "SignalR Go On";
        $scope.counter = 0;
        $scope.connection = new signalR.HubConnectionBuilder().withUrl("/moduleshub").build();
        $scope.connection.start().then().catch((error) => {
            showIndicator('connection error','error')
        });
        $scope.connection.on("newModuleCreated", function (module) { 
            var data = $scope._sidebarInit.option('dataSource');
            data.push(convertKeysToUpper(module));
            $scope._sidebarInit.option('dataSource', data);
        });


        
        $scope.resizable = {
            handles: "bottom right",
            keepAspectRatio:true
        }
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
                            $scope._drawerInstance.toggle();
                        }
                    }
                }, {
                    widget: 'dxButton',
                    location: "after",
                    options: {
                        elementAttr: { class: 'header-button' },
                        icon: 'fa-regular fa-bell',
                        text:"0",
                    }
                },{
                    widget: 'dxButton',
                    location: "after",
                    options: {
                        elementAttr: { class: 'header-button' },
                        icon: 'fa-regular fa-user'
                    }
                }
            ],
        };
        $scope._drawer = {
            openedStateMode: 'shrink',
            revealMode: 'slide',
            opened: true,
            height: 'auto',
            closeOnOutsideClick: false,
            template: 'listTemplate',
            onInitialized(e) {
                $scope._drawerInstance = e.component;
            },
        };
        //$scope._sidebarList = {
        //    onInitialized(e) {
        //        $scope._sidebarInit = e.component;
        //    },
        //    dataSource: [],
        //    hoverStateEnabled: false,
        //    focusStateEnabled: false,
        //    activeStateEnabled: false,
        //    width: 200,
        //    height: '100%',
        //    itemTemplate(data, index, element) {
        //        $(element).append("<span class='" + data.ICON + "'></span><span><a href='" + data.PATH +"'>" + data.NAME + "</a></span>");
        //    },
        //    elementAttr: {
        //        id: 'sidebar-list',
        //        //class: 'panel-list dx-theme-accent-as-background-color',
        //    },
        //};

        $scope.getModules = function () {
            $http.get("/api/sm_master/modules/").then((res) => {                                
                $scope._sidebarInit.option('dataSource', res.data);
            }, function (errorRes) {
                serverErrorHandler(errorRes.status, 'GET DATA');
            });
        };
        $scope.getModules();
    });