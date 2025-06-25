const path = require("path");

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.extname(__filename).slice(1));
console.log(path.parse(__filename));
console.log(path.resolve(__dirname, "..", "./1_ES_Modules", "./app.js"));
console.log(path.join(__dirname, "..", "./1_ES_Modules", "./app.js"));
