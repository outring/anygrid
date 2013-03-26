module.exports = function (grunt) {

    grunt.initConfig({

        copy: {
            www: {
                files: [
                    { expand: true, cwd: './www/', src: ['*.html', '*.png'], dest: './build/www/' }
                ]
            },

            'tests-markup': {
                files: [
                    { expand: true, cwd: './tests/markup/', src: ['*.html', '**/*.css', '**/*.png'], dest: './build/tests-markup/' }
                ]
            }
        },

        concat: {
            www: {
                src: './www/*.css',
                dest: './build/www/index.css'
            }
        },

        cssmin: {
            www: {
                files: {
                    './build/www/index.min.css': ['./build/www/index.css']
                }
            }
        },

        lmd: {
            www: {
                projectRoot: './',
                build: 'www'
            },
            'tests-markup': {
                projectRoot: './',
                build: 'tests-markup'
            }
        },

        watch: {
            'www': {
                files: ['./src/*', './www/*'],
                tasks: ['www']
            },
            'tests-markup': {
                files: ['./src/*', './tests/markup/**/*'],
                tasks: ['tests-markup']
            }
        }

    });

    grunt.loadNpmTasks('grunt-lmd');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('www', ['copy:www', 'concat:www', 'cssmin:www', 'lmd:www']);
    grunt.registerTask('tests-markup', ['copy:tests-markup', 'lmd:tests-markup']);

};