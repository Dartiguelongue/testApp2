app.controller('deviceListController', function ($scope, $location)
{
    $scope.devices = devicesList;    

    $scope.$parent.reset(false);

    $scope.showChannels = function (deviceIndex)
    {        
        $scope.$parent.changeTitle(devicesList[deviceIndex].getChannels()[0].getFullName(), false);
        //$scope.$parent.changeThemeColor('theme-' + $scope.selectedDevice.getChannel(0).color, false);

        $location.path('/channelsGraph/' + deviceIndex);
    };

    $scope.showDeviceInfos = function (deviceIndex)
    {
        $scope.selectedDevice = $scope.devices[deviceIndex];

        fw7.popup(".popup-about");
    };
});