var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');

var HTMLFILE_DEFAULT = "index.html";
var CHECKAFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile){
 var instr = infile.toString();
 if(!fs.existsSync(instr)){
   console.log("% does not exist. Existing .",instr);
   process.exit(1);
 
 }
 return instr;
};

var cheerioHtmlFile = function(htmlFile){
 return cheerio.load(fs.readFileSync(htmlFile));
}

var loadChecks = function(checksFile){
  return JSON.parse(fs.readFileSync(checksFile));
}

var checkHtmlFile = function(htmlFile,checksFile){
  $ = cheerioHtmlFile(htmlFile);
  var checks = loadChecks(checkFile).sort();
  var out = {};
  for(var ii in checks){
    var present = $(checks[ii]).length>0;
    out[checks[ii]] = present;
  }
  return out;
}

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main==module){
  program
    .option('-c,--checks<check_file>', 'Path to check file', clone(assertFileExists),CHECKSFILE_DEFAULT);

    .option('-f,--checks<html_file>', 'Path to html file',clone(assertFileExists),HTMLFILE_DEFAULT);
    .parse(process.argv);
  var checkJSON = checkHtmlFile(program.file,program.checks)
  var outJson = JSON.stringify(checkjson,null,4);
}else{
  exports.checkHtmlFile = checkHtmlFiles
}
