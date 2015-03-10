This project demonstrates a possible bug in WebGME. The plugin loads all the objects in a project and returns. I assume it shouldn't insert the objects back to database when no changes are made. When I run the same plugin with thousands of objects multiple times, the run time increases in the order of 10s each time. It seems somehow these objects are replicated in the database.

* Clone the project `git clone https://github.com/hakantunc/webgme_load.git`
* Install the modules `npm install`
* Run the server `node app.js`
* Go to your browser and import the project from the file 'mcr_ctm.json'
* Run the plugin from your terminal `node node_modules/webgme/src/bin/run_plugin.js -c config.json -p <name_of_the_project_you_created> -b master -n NewPlugin > newplugin_ctm.js.log`
* In the log file, we see the insertObject calls.
