if (typeof require !== 'undefined') {importScripts = require;} 
importScripts("../lib/std.js");
function startup(argc, argv)
{
    print(_("Hello world!\n"));
}
end(startup);
