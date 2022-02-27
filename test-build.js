const assert = require("assert");
const mapper = require("./dist/index.js");
const browserMapper = require("./dist/index.min.js");
const mergeDeep = require("./dist/mergeDeep")
const output = require("./test-data/output");
const input = require("./test-data/input");
const map = require("./test-data/map");

const resultOne = mapper(input, map);
assert.deepStrictEqual(resultOne, output);
console.log('Node JS test passed');
const resultTwo = browserMapper.default(input, map);
assert.deepStrictEqual(resultTwo, output);
console.log('Browser test passed');
const resultThree = mergeDeep({ hi: { bye: 'hello' }}, { one: { two: 'three' }});
assert.deepStrictEqual(resultThree, { hi: { bye: 'hello' }, one: { two: 'three' }});
console.log('Merge Deep test passed');