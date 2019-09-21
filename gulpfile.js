// Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browsersSync = require('browser-sync').create();

// Funçao para compilar o SASS e adicionar os prefixos
function compilaSass() {
    return gulp.src('css/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browsersSync.stream());
}

// Tarefa de gulp para a função de SASS
gulp.task('sass', compilaSass);

// Função para iniciar o browser
function browsers() {
    browsersSync.init({
        server: {
            baseDir: "./"
        }
    })
}

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browsers);

// Função de watch do Gulp
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch('*.html').on('change', browsersSync.reload);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync'));