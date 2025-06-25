const os = require("os");

console.log(os.platform());
console.log(os.arch());
console.log(os.cpus());
console.log(os.freemem());
console.log(os.totalmem());

const totalTime = os.uptime();
console.log(`Total time (sec): ${totalTime}`);
console.log(`Total time (min): ${Math.round(totalTime / 60)}`);
console.log(`Total time (hr): ${Math.round(totalTime / 60 / 60)}`);
console.log(`Total time (days): ${Math.round(totalTime / 60 / 60 / 24)}`);

console.log(os.homedir());
