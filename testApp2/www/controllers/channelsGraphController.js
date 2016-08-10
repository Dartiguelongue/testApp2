app.controller('channelsGraphController', function ($scope, $location, $routeParams, $rootScope)
{
    $scope.device = JSON.parse($routeParams.data);    

    $scope.$on('$viewContentLoaded', function (event)
    {
        mySwiper = fw7.swiper('.swiper-container',
        {
            pagination: '.swiper-pagination',
            onSlideChangeEnd: function ()
            {
                $scope.$parent.changeTitle($scope.device.name + ' - ' + $scope.device.channels[mySwiper.activeIndex].name, true);
                $scope.$parent.changeThemeColor('theme-' + $scope.device.channels[mySwiper.activeIndex].color, true);                  
            }
        });

        setTimeout(loadCharts, 100);
    });

    angular.element(window).bind('resize', loadCharts);

    function loadCharts()
    {
        mySwiper.update();

        for (var i = 0; i < $scope.device.channels.length ; i++)
        {
            var canvas = document.getElementById('canvas' + i);
            var range = document.getElementById('range' + i);
            var chart = new Chart(canvas);
            var titi;

            canvas.width = window.innerWidth;
            canvas.height = (window.innerHeight - navBar.offsetHeight - range.offsetHeight - 20);

            range.style.width = (window.innerWidth - 40) + 'px';
            range.style.position = 'absolute';
            range.style.left = '38px';
            range.min = '0';
            range.max = '9';

            range.addEventListener('input', function ()
            {
                var index = -1;

                for (var i = 0 ; i < 6 ; i++)
                {
                    if (this.id == 'range' + i)
                    {
                        index = i;
                    }
                }

                if (index > -1)
                {
                    $scope.device.channels[index].chart.setCursorIndex(this.value);
                    $scope.device.channels[index].chart.drawChart();
                }
            });

            chart.setCursorIndex(0);

            var values =
                [
                    { 'value': '15.3', 'date': '1000' },
                    { 'value': '16.7', 'date': '2000' },
                    { 'value': '18.1', 'date': '3000' },
                    { 'value': '17.5', 'date': '4000' },
                    { 'value': '17.4', 'date': '5000' },
                    { 'value': '16.8', 'date': '6000' },
                    { 'value': '16.2', 'date': '7000' },
                    { 'value': '15.6', 'date': '8000' },
                    { 'value': '14.9', 'date': '9000' },
                    { 'value': '15.0', 'date': '10000' }
                ];

            chart.setValues(values);

            switch (i)
            {
                case 0: chart.setColor('#0000FF'); break;
                case 1: chart.setColor('#FF0000'); break;
                case 2: chart.setColor('#00FF00'); break;
                case 3: chart.setColor('#FFFF00'); break;
                default: chart.setColor('#000000'); break;
            }

            chart.drawChart();

            $scope.device.channels[i].chart = chart;
        }
    }
});
