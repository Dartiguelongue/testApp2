app.controller('channelsGraphController', function ($scope, $location, $routeParams)
{    
    $scope.currentIndex = 0;
    $scope.device = devicesList[$routeParams.deviceIndex];

    $scope.$on('$viewContentLoaded', function (event)
    {
        mySwiper = fw7.swiper('.swiper-container',
        {
            pagination: '.swiper-pagination',
            onSlideChangeEnd: function ()
            {
                $scope.currentIndex = mySwiper.activeIndex;
                $scope.$parent.changeTitle($scope.device.getChannels()[mySwiper.activeIndex].getFullName());
                $scope.$parent.changeColorTheme('theme-' + $scope.device.getChannels()[mySwiper.activeIndex].getTheme());
                $scope.$parent.refresh();
            }
        });

        setTimeout(loadCharts, 100);
    });

    angular.element(window).bind('resize', loadCharts);

    function loadCharts()
    {
        mySwiper.update();

        for (var i = 0; i < $scope.device.getChannels().length;  i++)
        {
            var channel = $scope.device.getChannels()[i];
            var canvas = document.getElementById('canvas' + i);
            var range = document.getElementById('range' + i);
            var chart = new Chart(canvas);
            
            canvas.width = window.innerWidth;
            canvas.height = (window.innerHeight - navBar.offsetHeight - range.offsetHeight - 20);

            range.style.width = (window.innerWidth - 40) + 'px';
            range.style.position = 'absolute';
            range.style.left = '38px';
            range.min = '0';
            range.max = channel.getValues().length;

            range.addEventListener('input', function ()
            {
                $scope.device.getChannels()[$scope.currentIndex].chart.setCursorIndex(this.value);
                $scope.device.getChannels()[$scope.currentIndex].chart.drawChart();
            });

            chart.setValues(channel.getValues());

            chart.setColor(channel.getColor());
            
            chart.setOnSelectedIndexChangeListener(function (index)
            {
                var ran = document.getElementById('range' + $scope.currentIndex);

                ran.value = index;
            });

            chart.drawChart();

            $scope.device.getChannels()[i].chart = chart;
        }
    }
});