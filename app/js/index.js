var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope){
    //初始状态
    $scope.state ={
        isActiveAbout:false,
        isActiveIntro:false
    },

    //事件
    $scope.events = {
        show:function (type){
            if(type == 'isActiveAbout'){
                $scope.state.isActiveIntro = false;
            }else{
                $scope.state.isActiveAbout = false;
            }
            $scope.state[type] = !$scope.state[type];
        }
    }
});