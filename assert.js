var assert = require('assert');
var oper = require('./mathoper');

assert.equal(oper.evenDoublerSync(2), 4);
assert.throws(() => {
    oper.evenDoublerSync(3);
}, /Odd/);

/*When i call evenDouble method with a value of 2 I should retrieve 4*/
oper.evenDoubler(2, (err, results) => {
    assert.ifError(err);
    assert.equal(results, 4, "evenDoubler failed on even number.");
});

oper.evenDoubler(3, (err, results) => {
    assert.notEqual(err, null);
});