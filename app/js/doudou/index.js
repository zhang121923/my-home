(function doudou() {
    // doudou 脚本

    /**
     * 静态数据，没有自己的服务器，所以所有数据直接从配置文件json中获取
     */
    var doudouData = [];

    // 列元素
    var listElement = null;

    // video元素
    var videoContent = null;
    var videoElement = null;

    // 页码,初始值显示第一页
    var page = 1;

    /**
     * 插入卡片
     */
    function insertCard(page) {
        // 限定一页20条
        var pageSize = 20;
        if (pageSize * (page - 1) > doudouData.length) {
            // 加载完成，无需再增加
            return false;
        }
        var pageData = doudouData.slice(pageSize * (page - 1), pageSize * page); // 下标从0开始
        pageData.forEach(function (item) {
            var card = getCardElement(item);
            listElement.appendChild(card);
        });
    }


    /**
     * 创建card元素
     */
    function getCardElement(data) {
        // 创建元素
        var divContent = document.createElement('li');
        divContent.className = 'card';
        divContent.style.backgroundColor = data.bgColor;
        divContent.style.color = data.fontColor;
        divContent.setAttribute('data-src', data.video);
        // 标题显示
        var titleContent = document.createElement('H1');
        titleContent.innerText = data.title;
        divContent.appendChild(titleContent);
        // 时间显示
        var timeContent = document.createElement('H5');
        timeContent.innerText = data.time;
        divContent.appendChild(timeContent);
        // 文案显示
        var descContent = document.createElement('p');
        descContent.innerText = data.desc;
        divContent.appendChild(descContent);
        if (data.video !== '') {
            // 播放图标显示
            var startContent = document.createElement('div');
            startContent.className = 'start-icon iconfont';
            startContent.innerHTML = '&#xe754;';
            divContent.appendChild(startContent);

            // 绑定播放事件
            divContent.addEventListener('click', function (e) {
                showVideo(e);
            }, true);
            if (document.documentElement.clientWidth < 980) {
                // 绑定播放事件
                divContent.addEventListener('touch', function (e) {
                    showVideo(e);
                }, true);
            }
        }
        return divContent;
    }


    /**
     * 数据加载
     */
    function loadData() {
        $.get('./doudou.json').then(function (res) {
            doudouData = res.data;
            insertCard(page++);
        }, function (err) {
            alert('数据加载失败！');
        })
    }

    /**
     * 监听滚动加载下一页数据
     */
    window.addEventListener('scroll', function () {
        var bottomDistance = listElement.getBoundingClientRect().bottom;
        var clientheight = document.documentElement.clientHeight;
        // 只要ul的高度大于当前视口高度100时，加载下一页数据
        if (bottomDistance > clientheight && bottomDistance - clientheight > 100) {
            insertCard(page++);
        }
    }, true);

    window.onload = function () {
        // 找到相应元素
        listElement = document.querySelector('.doudou-wall-content');
        // 数据请求
        loadData();

        document.querySelector('.close-content').addEventListener('click', function (e) {
            closeVideoModal();
        }, true);
    }

    /**
     * 展示模态框
     * @param e
     */
    function showVideo(e) {
        if (e.currentTarget.className === 'card') {
            videoContent = document.querySelector('.video-content');
            videoElement = document.querySelector('#videoEntity');
            videoContent.style.display = 'block';
            videoElement.setAttribute('src', e.currentTarget.getAttribute('data-src'));
        }
    }

    /**
     * 关闭视频播放模态框
     */
    function closeVideoModal() {
        videoContent.style.display = 'none';
        videoElement.src = '';
    }
})();
