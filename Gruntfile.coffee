path = require 'path'


module.exports = (grunt) ->

    pkg = grunt.file.readJSON('package.json')
    modules = ['babelify/polyfill'].concat(Object.keys(pkg.dependencies or {}))

    grunt.initConfig
        pkg: pkg
        root: '.'
        src: '<%= root %>/src'
        dist: '<%= root %>/dist'
        babel:
            options:
                sourceMap: true
            dist:
                files: [
                    expand: true
                    src: ['**/*.js']
                    dest: '<%= dist %>'
                    cwd: '<%= src %>'
                ]
        uglify:
            options:
                sourceMap: true
            dist:
                files: [
                    expand: true
                    cwd: '<%= dist %>'
                    src: ['**/*.js']
                    dest: '<%= dist %>'
                    ext: '.min.js'
                    extDot: 'last'
                    # Don't re-minimize already minimized files
                    filter: (filename) ->
                        not /.min.js$/.test filename
                ]
        watch:
            options:
                atBegin: true
            js:
                files: [
                    "<%= src %>/**/*.js"
                ]
                tasks: ['babel:dist']
        clean:
            dist: ['<%= dist %>']
    
    require('load-grunt-tasks')(grunt)

    grunt.registerTask 'build', [
        'babel',
        'uglify',
    ]

    grunt.registerTask 'default', ['build']
