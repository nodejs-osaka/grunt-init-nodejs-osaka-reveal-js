var fs = require('fs');
var app = require('express')();
var lib = require("./lib");

lib.render.config("package", "./package.json");
lib.render.ejs("theme/index.ejs", "gen/index.html");
lib.render.sass("theme/node-osaka.scss", "gen/node-osaka.css");
lib.configure(app);
lib.get(app, 'README.md');

app.listen({%=port%});
console.log('Listening on port {%=port%}');