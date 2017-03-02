const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    LessPluginAutoPrefix = require("less-plugin-autoprefix");

//CSS浏览器兼容性配置
var autoprefix = new LessPluginAutoPrefix({
    browsers: [
        "ie >= 8",
        "ie_mob >= 10",
        "ff >= 1",
        "chrome >= 30",
        "safari >= 6",
        "opera >= 1",
        "ios >= 5",
        "android >= 2.3",
        "bb >= 10"
    ],
    cascade: true, //是否美化属性值 默认：true
    remove: true //是否去掉不必要的前缀 默认：true 
});

gulp.task('dev-less', function(done) {
    //所有通用样式
    gulp.src('src/LesslsMore/*.less')
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        .pipe(plugins.concat('theme.min.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('dist/LesslsMore'))
        .on('end', done);
});

//文件监听 + 实时刷新
gulp.task('dev-watch', function() {
    gulp.watch('src/**/*', ['dev-less']);
});
//清空编译文件目录
gulp.task('cls', function(done) {
    gulp.src('dist')
        .pipe(plugins.clean())
        .on('end', done);
});

gulp.task('clean', ['cls']);
gulp.task('default', ['dev-less', 'dev-watch']);
gulp.task('dev', ['dev-less', 'dev-watch']);
gulp.task('prod', ['dev-less']);
