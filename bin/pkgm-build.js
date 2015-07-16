#!/usr/bin/env node

var path = require('path');
var pkgm = require('pkgm');
var log = console.log.bind(console);


// Get target folder to build
if(process.argv.length < 3) {
    console.error('Please specify input folder');
    process.exit(-1);
}
var targetFolder = path.resolve(process.argv[2]);

var m = new pkgm({
    'engine': "codebox",
    'lessInclude': path.resolve(__dirname, "../node_modules/codebox/editor/resources/stylesheets/variables.less"),
});

m.loadPackage(targetFolder)
.then(function(pkg) {
    return pkg.installDependencies()
    .then(function(pkg) {
        return pkg.optimizeClient();
    });
})
.then(function() {
    log("Done :)");
})
.fail(function(err) {
    log("Failed :(");
    log(err);
});
