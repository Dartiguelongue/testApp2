app.controller('mainController', function ($scope, $location, $http)
{    
    $scope.themeColor = "theme-blue";
    $scope.title = "testApp";

    $scope.exportPDF = function ()
    {     
        getBase64ImageFromUrl('resources/images/Koala.jpg', function (data)
        {
            var docDefinition = {
                content:
                    [
                        {
                            image: data,
                            width: 200,
                            absolutePosition: { x: 100, y: 100 }
                        },
                        {
                            text: 'Test position absolue',
                            width: 200,
                            absolutePosition: { x: 100, y: 300 }
                        },
                        {
                            canvas:
                                [
                                    {
                                        type: 'line',
                                        x1: 100, y1: 400,
                                        x2: 150, y2: 500,
                                        lineWidth: 0.5
                                    }
                                ]
                        }
                    ]
            };

            pdfMake.createPdf(docDefinition).getBuffer(function (buffer)
            {
                var binaryArray = new Uint8Array(buffer).buffer;

                writeBinaryFile(cordova.file.externalApplicationStorageDirectory, "test.pdf", buffer, function ()
                {
                    openFile(cordova.file.externalApplicationStorageDirectory, "test.pdf");
                });
            });
        });    
    };

    $scope.changeThemeColor = function (value, forceRefresh)
    {
        $scope.themeColor = value;
        
        if (forceRefresh)
        {
            $scope.$apply();
        }
    }

    $scope.changeTitle = function (value, forceRefresh)
    {
        $scope.title = value;

        if (forceRefresh)
        {
            $scope.$apply();
        }        
    }

    $scope.reset = function (forceRefresh)
    {
        $scope.themeColor = "theme-blue";
        $scope.title = "testApp";

        if (forceRefresh)
        {
            $scope.$apply();
        }
    };

    $scope.goBack = function ()
    {
        if ($window.location.hash == '#/connect')
        {
            if (navigator.app)
            {
                navigator.app.exitApp();
            }
            else if (navigator.device)
            {
                navigator.device.exitApp();
            }
        }
        else
        {
            $window.history.back();
        }
    };
});