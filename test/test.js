var assert = require('assert');
var pinyin = require('../index');

describe('Pinyin', function(){

	describe('#toUnicode', function(){
		it('should be convert chinese word to unicode', function(){
			assert.equal(pinyin.unicode("中"), '4E2D');
		});
	});
	
	describe('#pinyin', function(){
		it('should be get pinyin from chinese ', function(){
			assert.equal(pinyin("中文").join(''),  'zhōngwén')
		});
	});
	
	describe('#normalize', function(){
		it('should be get normalize pinyin from chinese ', function(){
			assert.equal(pinyin("中文").map(pinyin.normalize).join(''),  'zhongwen')
		});
	});

});
