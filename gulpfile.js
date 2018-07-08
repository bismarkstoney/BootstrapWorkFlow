const gulp =require('gulp');
const broswerSync=require('browser-sync').create();
const sass=require('gulp-sass');


//compile Sass & Inject Into Browser
gulp.task('sass',function(){

    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*scss'])
     .pipe(sass())
     .pipe(gulp.dest('src/css'))
     .pipe(broswerSync.stream());
});
//move js files to src/js
gulp.task('js',function () { 

    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(broswerSync.stream())
 });

//watch Sass $ Server

gulp.task('serve',['sass'],function () {

    broswerSync.init({
        server: "./src"
    });
    //watch commands
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*scss'],['sass']);
    gulp.watch("src/*.html").on('change',broswerSync.reload);
  });

  //move fonts folder to src
  gulp.task('fonts',function(){
      return gulp.src('node_modules/font-awesome/fonts/*')
       .pipe(gulp.dest("src/fonts"));
  })

  //move fonts awesom t0 src/scss 
  gulp.task('fa',function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
     .pipe(gulp.dest("src/css"));
});
gulp.task('default',['js','serve','fa','fonts']);