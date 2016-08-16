app.controller('deviceListController', function ($scope, $location)
{
    $scope.devices = devicesList;    

    $scope.$parent.reset();

    $scope.showChannels = function (deviceIndex)
    {        
        $scope.$parent.changeTitle(devicesList[deviceIndex].getChannels()[0].getFullName());
        $scope.$parent.changeColorTheme('theme-' + devicesList[deviceIndex].getChannels()[0].getTheme());

        $location.path('/channelsGraph/' + deviceIndex);
    };

    $scope.showDeviceInfos = function (deviceIndex)
    {
        $scope.selectedDevice = $scope.devices[deviceIndex];

        fw7.popup(".popup-about");
    };
});