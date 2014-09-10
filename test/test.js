var assert = require('assert');
var Pinyin = require('../index');

describe('Pinyin', function(){

	describe('#split', function(){
		it('should be split string to words', function(){
			assert.equal(Pinyin.split('中文 Chinese').length, 3);
		});
	});

	describe('#toUnicode', function(){
		it('should be convert chinese word to unicode', function(){
			var unicode = Pinyin.toUnicode("中文 ABC");
			assert.equal(unicode.length, 3);
		});
	});

	describe('#convert', function(){
		it('should be convert chinese word to code', function(){
			var pinyin = new Pinyin("中文 ABC");
			var results = pinyin.convert();
			assert.equal(results.length, 3);
		});
	});

	describe('#translate', function(){
		it('should be translate chinese word to pinyin', function(){
			var pinyin = new Pinyin("中文 ABC");
      var results = pinyin.translate();
			assert.equal(results.length, 3);
		});
	});

	describe('#letter', function(){
		it('should be get letter from chinese ', function(){
			var pinyin = new Pinyin("中文 ABC");
			var result = pinyin.letter();
			assert.equal(result, 'zhong wen ABC')
		});
	});

});
