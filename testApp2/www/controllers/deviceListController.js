app.controller('deviceListController', function ($scope, $location, $routeParams)
{
    $scope.devices = JSON.parse($routeParams.data);
    $scope.selectedDevice = '';

    $scope.$parent.reset(false);

    $scope.showChannels = function (deviceIndex)
    {
        $scope.selectedDevice = $scope.devices[deviceIndex];

        $scope.$parent.changeTitle($scope.selectedDevice.name + ' - ' + $scope.selectedDevice.channels[0].name, false);
        $scope.$parent.changeThemeColor('theme-' + $scope.selectedDevice.channels[0].color, false);

        $location.path('/channelsGraph/' + JSON.stringify($scope.selectedDevice));
    };

    $scope.showDeviceInfos = function (deviceIndex)
    {
        $scope.selectedDevice = $scope.devices[deviceIndex];

        fw7.popup(".popup-about");
    };
});