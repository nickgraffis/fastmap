const brotli = require('brotli');

brotli.compress(fs.readFileSync('myfile.bin'));