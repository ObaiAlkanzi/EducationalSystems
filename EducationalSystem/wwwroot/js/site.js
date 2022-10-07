demoApp = angular.module('demoApp', ['dx']).
    controller("mainController", function ($scope, $http) {

        $scope.msg = "SignalR Go On";
        $scope.counter = 0;
        //$scope.connection = new signalR.HubConnectionBuilder().withUrl("/firsthub").build();
        //$scope.connection.start().then(function () {
        //    $scope.connection.invoke("UserConnected",1).then(() => {

        //    }).catch((error) => {

        //    });
        //}).catch((error) => {
        //    showIndicator('connection error','error')
        //});
        //$scope.connection.on("ReseciveMessage", function (user, msg) {
        //    $scope.counter = $scope.counter + 1;
        //    $scope._headerInit.option('items[1].options.text', $scope.counter)
        //});
        //$scope.connection.on("UserConnected", function (connectionId, userId) {
        //    console.log(connectionId, userId)
        //});
        //$scope.connection.on("UserDisconnected", function (connectionId) {
        //    console.log(connectionId, 'offline')
        //});


        $scope.elementAttr = {
            class: 'panel-list dx-theme-accent-as-background-color',
        };
        const navigation = [
            { id: 1, text: 'Modules', icon: 'product', link:'/Sm_Masters/Modules' },
        ];
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
            height: 400,
            closeOnOutsideClick: true,
            template: 'listTemplate',
            onInitialized(e) {
                $scope._drawerInstance = e.component;
            },
        };
        $scope._sidebarList = {
            dataSource: navigation,
            hoverStateEnabled: false,
            focusStateEnabled: false,
            activeStateEnabled: false,
            width: 200,
            itemTemplate(data, index, element) {
                $(element).append("<span>" + data.text + "</span>");
            },
            onItemClick(e) {
                location.replace(e.itemData.link)
            },
            elementAttr: $scope.elementAttr
        };

        
       
    });