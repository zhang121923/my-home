(function () {
    //全局变量num：关卡树，初始值为3
    var num = 2;
    //全局变量：随机数数组，用于存放区别于别的单元格，数组长度根据关卡定义
    var randomArry = [];
    //蒙版对象,过关提示对象,倒计时对象
    var layout, timeClock, success, interval;
    //倒计时次数
    var count;
    //点中不同的单元格的ID数组
    var successArry;
    // 屏幕宽度
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var screenMin = Math.min(screenWidth, screenHeight);
    window.onload = function () {
        layout = document.getElementById("layout");
        timeClock = document.getElementById("timeClock");
        success = document.getElementById("success");
        initGame(num);
    }

    function initGame(num) {
        count = num;
        successArry = [];
        randomArry = createRandomArry(num);
        createTable(num, randomArry);
        layout.style.display = "block";
        interval = setInterval(setGameStart, 1000);
    }

    /*
     *根据指定关卡数创建表格
     * 参数num: 指定关卡数
     */
    function createTable(num, randomArry) {
        var viewSize = document.documentElement.clientWidth;
        var table = document.createElement("table");
        //设置相关table属性
        var tableSize = num * 100 + 'px';
        table.style.width = tableSize;
        table.style.maxWidth = screenMin + 'px';
        table.style.height = tableSize;
        table.style.maxHeight = screenMin + 'px';
        table.style.border = "1px solid black";
        table.id = "gameTable";
        var cellIdInit = 0;
        //动态插入行和列
        for (var i = 0; i < num; i++) {
            var row = table.insertRow();
            //通过行插入列
            for (var j = 0; j < num; j++) {
                var cell = row.insertCell();
                //设置相关单元格cell属性
                var cellSize = 80 + 'px';
                cell.style.width = cellSize;
                var maxSize = screenMin / num + 'px';
                cell.style.maxWidth = maxSize;
                cell.style.height = cellSize;
                cell.style.maxHeight = maxSize;
                cell.style.border = "1px solid black";
                cell.id = "cId-" + (++cellIdInit);
                cell.className = "cell";
                cell.onclick = cellClick;
                cell.style.backgroundSize = 'cover';
                if (randomArry.indexOf(cellIdInit) > -1) {
                    cell.style.backgroundImage = "url(../../img/production/boxGame/moon.ico)";
                } else {
                    cell.style.backgroundImage = "url(../../img/production/boxGame/sun.ico)";
                }
            }
        }
        //添加到界面中
        document.getElementById("content").appendChild(table);
    }

    /*
     *cell单元格的点击事件
     */
    function cellClick(e) {
        //通过事件获取单元格ID
        var cellId = e.target.id;
        //获得单元格对象
        var cell = document.getElementById(cellId);
        var bgUrl = cell.getAttribute("data-bg");
        cell.style.backgroundImage = bgUrl;
        cell.style.backgroundColor = "white";
        checkIsSuccess(cellId);
    }

    /*
     *根据关卡生成不同的随机数，例如3x3表格，就从9个数中随机生成3个
     */
    function createRandomArry(num) {
        for (var i = 0; i < num; i++) {
            var randomNum = Math.ceil(Math.random() * (Math.pow(num, 2) - 1)) + 1;
            if (randomArry.indexOf(randomNum) < 0) {
                randomArry.push(randomNum);
            }
        }
        if (randomArry.length == num) {
            return randomArry;
        } else {
            randomArry = [];
            createRandomArry(num);
        }
        return randomArry;
    }

    /*
     *设置所有单元格被遮挡
     */
    function setAllCellShield() {
        var cells = document.getElementsByClassName("cell");
        for (var i = 0, len = cells.length; i < len; i++) {
            var cell = cells[i];
            cell.setAttribute("data-bg", cell.style.backgroundImage);
            cell.style.backgroundImage = '';
            cell.style.backgroundColor = "black";
        }
    }

    function resetAllCellShield() {
        var cells = document.getElementsByClassName("cell");
        for (var i = 0, len = cells.length; i < len; i++) {
            var cell = cells[i];
            cell.style.backgroundImage = '';
            cell.style.backgroundColor = "black";
        }
    }


    function setGameStart() {
        if (count > 0) {
            timeClock.innerText = count--;
        } else {
            timeClock.innerText = "start";
            setTimeout(function () {
                layout.style.display = "none";
                clearInterval(interval);
                setAllCellShield();
            }, 500);
        }
    }

    function checkIsSuccess(cId) {
        var id = parseInt(cId.substring(cId.indexOf("-") + 1));
        if (randomArry.indexOf(id) > -1) {
            successArry.push(id);
            var flag = arrysIsEqual(successArry, randomArry);
            if (flag == true) {
                gameSuccess();
            }
        } else {
            successArry = [];
            setTimeout(resetAllCellShield, 500);
        }
    }

    function gameSuccess() {
        success.style.display = "flex";
        var cells = document.getElementsByClassName("cell");
        for (var i = 0, len = cells.length; i < len; i++) {
            var cell = cells[i];
            if (cell.style.backgroundColor == "black") {
                var bgUrl = cell.getAttribute("data-bg");
                cell.style.backgroundImage = bgUrl;
                cell.style.backgroundColor = "white";
            }
        }
        setTimeout(function () {
            var table = document.getElementById("gameTable");
            table.parentNode.removeChild(table);
            success.style.display = "none";
            num++;
            initGame(num);
        }, 2000);
    }

    /*
     *工具方法：判断两数组是否相同
     */
    function arrysIsEqual(arr1, arr2) {
        var flag = true;
        //此比较特殊，如果两数组相同，排序之后两两元素一定相等
        arr1 = arr1.sort();
        arr2 = arr2.sort();
        if (arr1.length != arr2.length) {
            flag = false;
        } else {
            for (var i = 0, len1 = arr1.length; i < len1; i++) {
                if (arr1[i] != arr2[i]) {
                    flag = false;
                }
            }
        }
        return flag;
    }
}())
