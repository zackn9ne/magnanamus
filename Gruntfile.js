'use strict';

var request = require('request');
var bowerPath = "public/components/";

//start grunt
module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    require('load-grunt-tasks')(grunt, { pattern: 'grunt-contrib-*' });


    var reloadPort = 35729,
        files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //tasks below here

        uglify: { //grunt uglify
            options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
              files: {
                'public/build/bower_concat.min.js':
                // my awesome dependancy system
                [
                  bowerPath+'jquery/dist/jquery.js',
                  bowerPath+'bootstrap/dist/js/bootstrap.js',
                  bowerPath+'vanilla-lazyload/dist/vanilla-lazyload.js',
                  bowerPath+'jquery-scrollstop/jquery.scrollstop.js',
                  bowerPath+'jquery-backstretch/jquery.backstretch.js',
                  bowerPath+'scrollup/dist/jquery.scrollUp.js',
                  bowerPath+'instafeed.js/instafeed.js'
                ]
              }
            }

        },


        cssmin: {
          options: {
            keepSpecialComments: 0,
            advanced: false
          },
            target: {
              files: {
                "public/build/all_the.css": [
                // my awesome dependancy system
                    "public/components/font-awesome/css/font-awesome.css",
                    "public/components/bootstrap/dist/css/bootstrap.css",
                    "public/css/app.css"
                ]
              }
            }
        },


        develop: {
            server: {
                file: 'bin/www'
            }
        },

        sass: {
            dist: {
                files: {
                    'public/css/app.css': 'public/css/app.scss'
                }
            }
        },

        watch: {
            options: {
                nospawn: true,
                livereload: reloadPort
            },
            server: {
                files: [
                    'bin/www',
                    'app.js',
                    'routes/*.js'
                ],
                tasks: ['develop', 'delayed-livereload']
            },
            js: {
                files: ['public/js/*.js'],
                options: {
                    livereload: reloadPort
                }
            },
            css: {
                files: [
                    'public/css/*.scss'
                ],
                tasks: ['sass'],
                options: {
                    livereload: reloadPort
                }
            },
            views: {
                files: ['views/*.jade'],
                options: {
                    livereload: reloadPort
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "public/dest.html": ["views/*.jade", "views/portfolio/*.jade"]
                }
            }
        }

    });

    grunt.config.requires('watch.server.files');
    files = grunt.config('watch.server.files');
    files = grunt.file.expand(files);

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');



    // register grunt tasks down here
    grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function() {
        var done = this.async();
        setTimeout(function() {
            request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function(err, res) {
                var reloaded = !err && res.statusCode === 200;
                if (reloaded) {
                    grunt.log.ok('Delayed live reload successful.');
                } else {
                    grunt.log.error('Unable to make a delayed live reload.');
                }
                done(reloaded);
            });
        }, 500);
    });

    //logging task
    grunt.registerTask('something', 'Do something interesting.', function(arg) {
        var msg = 'Doing something...';
        grunt.verbose.write(msg);
        try {
            doSomethingThatThrowsAnExceptionOnError(arg);
            // Success!
            grunt.verbose.ok();
        } catch (e) {
            // Something went wrong.
            grunt.verbose.or.write(msg).error().error(e.message);
            grunt.fail.warn('Something went wrong.');
        }
    });

    grunt.registerTask('default',

        [
            'sass',
            'develop',
            'watch'
        ]);
    grunt.registerTask('uglify_it', [
        'uglify',
        'cssmin'
    ]);
    grunt.registerTask('build', [
        'sass',
        'develop',
        'jade'
    ]);
};