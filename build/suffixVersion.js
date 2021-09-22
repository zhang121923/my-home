/**
 * 该文件用于打包、本地调试时为html中的静态文件增加版本号。防止上线后静态资源缓存问题
 */
var through = require("through2");
var fs = require('fs');

// 版本号
var version = null;

// 获取版本号，追加到静态文件名后
(function getVersion() {
    var packageJson = JSON.parse(fs.readFileSync('./package.json'));
    version = packageJson.version;
})();

// 正则替换
function addVersion(fileContent) {
    var css = /<link\s*rel=\"stylesheet\"\s*href\s*=(\s*[\"|\']{1}\s*)([^>]*)(\s*[^>])/ig;
    var js = /<script\s*src\s*=(\s*[\"\']{1}\s*)([^>]*)(\s*[^>]*[\"\']{1})/ig;
    var str1 = fileContent.replace(css, ($0, $1, $2, $3) => {
        // 防止每次追加
        if ($2.indexOf('?v=') > -1) {
            return '' + $0.slice(0, $0.lastIndexOf('?v=')) + '?v=' + version + '"';
        }
        return '' + $0.slice(0, $0.lastIndexOf('.css') + 4) + '?v=' + version + '"'
    });
    var str2 = str1.replace(js, ($0, $1, $2, $3) => {
        if ($2.indexOf('?v=') > -1) {
            return '' + $0.slice(0, $0.lastIndexOf('?v=')) + '?v=' + version + '"';
        }
        return '' + $0.slice(0, $0.lastIndexOf('.js') + 3) + '?v=' + version + '"'
    });
    return str2;
}

module.exports = function () {
    return through.obj(function (file, encoding, callback) {
        // 如果file类型不是buffer 退出不做处理
        if (!file.isBuffer()) {
            return callback();
        }
        // 获取内容
        fileString = file.contents.toString('utf-8');
        // 为匹配的内容增加版本号
        file.contents = Buffer.from(addVersion(fileString), 'utf-8');
        // 下一步
        this.push(file);
        // 完成
        callback();

    });
};