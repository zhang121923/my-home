(function travel() {
    // travel 脚本

    /**
     * 静态数据，没有自己的服务器，所以所有数据直接从配置文件json中获取
     */
    var travelData = [];

    // 列元素
    var columns = null;

    // 页码,初始值显示第一页
    var page = 1;
    // 限定一页5
    var pageSize = 10;


    /**
     * 计算列数并插入列，根据屏幕宽度确定瀑布列应该是多少
     */
    function insertColumn() {
        var ul = document.querySelector('.photo-wall-content');
        var columnNum = 0;
        var deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
        columnNum = deviceWidth >= 1290 ? 5 : deviceWidth >= 980 ? 4 : deviceWidth >= 720 ? 3 : deviceWidth >= 490 ? 2 : 1;
        for (var i = 0; i < columnNum; i++) {
            var li = document.createElement('li');
            li.className = 'photo-wall-column column-' + (i + 1);
            li.style.width = deviceWidth / columnNum + 'px';
            ul.appendChild(li);
        }
        columns = document.querySelectorAll('.photo-wall-column');
    }

    /**
     * 插入卡片
     */
    function insertCard(page) {
        if (pageSize * (page - 1) > travelData.length) {
            // 加载完成，无需再增加
            return false;
        }
        var pageData = travelData.slice(pageSize * (page - 1), pageSize * page); // 下标从0开始
        pageData.forEach(function (item) {
            var sortestIndex = calcSortest().index;
            var col = document.querySelector('.column-' + sortestIndex);
            var card = getCardElement(item);
            col.appendChild(card);
        });
    }


    /**
     * 创建card元素
     */
    function getCardElement(data) {
        // 创建元素
        var divContent = document.createElement('div');
        divContent.className = 'card';
        var img = document.createElement('img');
        img.style.height = data.height + 'px';
        img.setAttribute('alt', data.desc);
        img.setAttribute('src', data.img);
        divContent.appendChild(img);
        // desc块
        var descDIV = document.createElement('div');
        descDIV.className = 'card-desc';
        // 时间显示
        var timeContent = document.createElement('H4');
        timeContent.innerText = data.time;
        descDIV.appendChild(timeContent);
        // 文案显示
        var descContent = document.createElement('p');
        descContent.innerText = data.desc;
        descDIV.appendChild(descContent);
        // 追加
        divContent.appendChild(descDIV);
        return divContent;
    }

    /**
     * 计算最短列，获取最短列的index
     */
    function calcSortest() {
        var columnInfo = Array.prototype.map.call(columns, function (col) {
            return {
                index: col.className.substring(col.className.lastIndexOf('-') + 1) - 0,
                offsetHeight: col.offsetHeight
            }
        });
        var result = columnInfo.sort(function (c1, c2) {
            return c1.offsetHeight - c2.offsetHeight
        })[0];
        return result;
    }


    /**
     * 数据加载
     */
    function loadData() {
        $.get('./travel.json').then(function (res) {
            travelData = res.data;
            insertCard(page++);
        }, function (err) {
            alert('数据加载失败！');
        })
    }

    /**
     * 监听滚动条，当最短的那一列滚动到最下面那个时加载下一页数据
     */
    window.addEventListener('scroll', function () {
        // 获取最短的列
        var shortest = calcSortest().index;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var travelContent = document.querySelector('.travel-content');
        var shortestElement = document.querySelector('.column-' + shortest);
        var scrollTop = travelContent.scrollTop;
        var eleOffsetTop = shortestElement.offsetHeight;
        if (scrollTop + clientHeight > eleOffsetTop) {
            insertCard(page++);
        }
    }, true);

    window.onload = function () {
        // 插入列
        insertColumn();
        // 数据请求
        loadData();
    }
})();
