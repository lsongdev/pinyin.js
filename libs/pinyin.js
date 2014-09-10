var mandarin = require('./mandarin');

var Pinyin = function(str, options){
	this.str = str;
};

Pinyin.toUnicode = function(str){
	var results = [];
	var unicodeRegexp = /^%u(\w+)$/;
	Pinyin.split(str).forEach(function(word){
		var unicode = escape(word);
		if(unicodeRegexp.test(unicode)){
			var match = unicodeRegexp.exec(unicode);
			results.push( match[1] );
		}else{
			results.push(word);
		}
	});
	return results;
};

Pinyin.split = function(str){
	return str.match(/[\u4E00-\uFA29]|[\uE7C7-\uE7F3]|\w+/ig);	
};

Pinyin.prototype.convert = function(){
	var results = [];
	Pinyin.toUnicode(this.str).forEach(function(unicode){
		var pinyin = mandarin[ unicode ];
		if(pinyin){
			results.push( pinyin.split(' ') );
		}else{
			results.push(unicode);
		}
	});
	return results;
};

Pinyin.prototype.translate = function(){
	var results = [];
	this.convert().forEach(function(pinyin){
		if(Array.isArray(pinyin)){
			var t = [];
			pinyin.forEach(function(p){
				t.push( Pinyin.phoneticize(p) );
			});
			results.push(t);
		}else{
			results.push(pinyin);
		}
	});
	return results;
};

Pinyin.phoneticize = function(pinyin){
	var notation = {
  	  'a': "āáǎà"
  	, 'e': "ēéěè"
  	, 'i': "īíǐì"
  	, 'o': "ōóǒò"
  	, 'u': "ūúǔù"
	};
	var toneRegexp = /\d$/;
	if(toneRegexp.test(pinyin)){
		var tone = parseInt( toneRegexp.exec(pinyin) );
		pinyin = pinyin.slice(0, -1).toLowerCase();
		return pinyin.replace(/([aeiou])/i, function(i, match){
			return notation[ match ][ tone - 1 ];
		});
	}
};

Pinyin.prototype.letter = function(){
	var result = [];
	this.convert().forEach(function(pinyin){
		result.push(Array.isArray(pinyin) ? pinyin[0].slice(0,-1).toLowerCase() : pinyin);	
	});
	return result.join(' ');
};


module.exports = Pinyin;
