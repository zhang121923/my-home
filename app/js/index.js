var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    //初始状态
    $scope.state = {
        isActiveAbout: false,
        isActiveIntro: false
    };

    // 菜单项
    $scope.menuList = [
        {
            title: 'Jack zhang`s Blog',
            content: '个人博客,写写记记,做一个进击的coder',
            href: 'http://zhang121923.coding.me/'
        }, {
            title: '爱生活，爱音乐',
            content: '小小的那么展示一下我才艺，哈哈',
            href: ''
        }, {
            title: '新的旅途',
            content: 'You can either travel or read,but either your body or soul must be on the way。这里我选择身体在路上，鄙人不会拍照，仅仅作为留念',
            href: './app/html/travel/index.html'
        }, {
            title: '随笔',
            content: '小时候听大人说写日记是为以后怀念过去的',
            href: ''
        }, {
            title: '小作品',
            content: '有时并不知道自己这么能创造',
            href: './app/html/production/index.html'
        },
    ];

    //事件
    $scope.events = {
        show: function (type) {
            if (type == 'isActiveAbout') {
                $scope.state.isActiveIntro = false;
            } else {
                $scope.state.isActiveAbout = false;
            }
            $scope.state[type] = !$scope.state[type];
        }
    }
});
