module.exports = function(grunt) {

  grunt.initConfig({
    shell: {
      start: {
        command: 'npm start'
      }
    },

    less: {
      development: {
        options: {
          compress: true,
          ieCompat: true,
          plugins: [ new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}) ]
        },
        files: {
          'public/style.min.css': 'resources/less/base.less'
        }
      }
    },

    uglify: {
      development: {
        options: {
          sourceMap: true,
          sourceMapName: 'public/bundle.min.js.map'
        },
        files: {
          'public/bundle.min.js': ['resources/js/*.js']
        }
      }
    },

    watch: {
      js: {
        files: ['resources/js/*.js'],
        tasks: ['uglify:development']
      },
      less: {
        files: ['resources/less/*.less'],
        tasks: ['less:development']
      },
      reload: {
        files: ['app/**/*.js', 'resources/views/**/*.html', 'public/*.css', 'public/*.js'],
        tasks: ['shell']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default',  ['less:development', 'uglify:development', 'shell']);
  grunt.registerTask('compile',  ['less:development', 'watch:less']);
  grunt.registerTask('concat',   ['uglify:development', 'watch:js']);
  grunt.registerTask('reload',   ['watch:reload']);

}
