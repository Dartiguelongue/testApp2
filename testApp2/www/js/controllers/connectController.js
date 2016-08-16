app.controller('connectController', function ($scope, $location, $http, md5, $translate)
{
    $scope.userName = '';
    $scope.password = '';

    $scope.checkLogin = function ()
    {
        fw7.showPreloader();

        $http.get('data/users.json').success(function (data)
        {
            var connectionOK = false;

            for(var i = 0 ; i < data.length ; i++)
            {
                if (data[i].login == $scope.userName)
                {
                    if (data[i].password == md5.createHash($scope.password))
                    {
                        connectionOK = true;
                        break;
                    }
                }
            }

            if (connectionOK)
            {
                $http.get('data/devices.json', {header: {'Content-Type': 'application/json; charset=UTF-8'}}).success(function (data)
                {
                    devicesList = [];

                    for (var i = 0 ; i < data.length ; i++)
                    {
                        var device = new Device();

                        device.loadJsonString(JSON.stringify(data[i]));

                        devicesList.push(device);
                    }
                    
                    $location.path('/deviceList');

                    fw7.hidePreloader();

                }).error(function ()
                {
                    fw7.hidePreloader();
                });
            }
            else
            {
                fw7.hidePreloader();
                fw7.alert($translate.instant('Trad_erreurIdentification'), 'Erreur');
            }

        }).error(function()
        {
            fw7.hidePreloader();
        });
    };
});