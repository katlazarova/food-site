module.exports = function(grunt) {
  // Project configuration.
  const sass = require('node-sass');
  require('load-grunt-tasks')(grunt);
  // Initialise Grunt config.
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        // Generate CSS sourcemap from sass files.
        sourceMap: true,
        includePaths: ['node_modules']
      },
      dist: {
        options: {
          // Minifies the CSS file.
          outputStyle: 'compressed'
        },
        files: {
          // Converts sass files into CSS file and puts it into the build folder.
          'css/pineapple.styles.min.css': 'sass/pineapple.styles.scss'
        }
      }
    },
    sass_globbing: {
      dist: {
        // Compile all files in the respective folders with the .scss extension into one scss file in each folder.
        files: {
          'sass/core/__core.scss': 'sass/core/**/*.scss',
          'sass/base/__base.scss': 'sass/base/**/*.scss',
          'sass/layouts/__layouts.scss': 'sass/layouts/**/*.scss',
          'sass/components/__components.scss': 'sass/components/**/*.scss'
        },
        options: {
          useSingleQuotes: false,
          signature: '// Generated by grunt-sass-globbing, do NOT edit manually.'
        }
      }
    },
    watch: {
      sass: {
        // Watches for changes in the following files/folders and runs the appropriate tasks.
        files: ['sass/**/*.scss'],
        tasks: ['sass_globbing:dist', 'sass']
      }
    },
  });

  // Load tasks.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-globbing');

  // Register tasks.
  grunt.registerTask('default', ['sass_globbing:dist', 'sass']);
  grunt.registerTask('scss', ['watch']);

};
