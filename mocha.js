/*To run tests with mocha... you have to type in terminal mocha and the name of your script in this case mocha.js
  When you want to run just one test you can use the word only for example it.only('') with this all test are ignored except that one and if you want 
  to ignore one or more test you can use the skip it.skip('')
*/

var should = require('should');
var fun = require('./mathoper');

describe('MathOper', function() {
    
    describe('when used synchronously', function() {
        
        it('should double even numbers correctly', function() {
            
            fun.evenDoublerSync(2).should.equal(4);
            
        });
        
        it('should throw on odd numbers', function(done) {
            /* Should thow says that the erro have to return in the message the word Odd is a regular expression */ 
            (function() { fun.evenDoublerSync(3) }).should.throw(/Odd/);
            done();
        });
        
    });
    
    describe('when used asynchronously', function() {
        
        it('should double even numbers correctly', function(done) {
            
            fun.evenDoubler(2, function(err, results) {
                
                should.not.exist(err);
                results.should.equal(4);
                done();
                
            });

        });
        
        it('should return error on odd numbers', function(done) {
            
            fun.evenDoubler(3, function(err, results) {
                
                should.exist(err);
                should.not.exist(results);
                done();
            
            });
            
        });
        
    });

});