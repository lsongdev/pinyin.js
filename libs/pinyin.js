var mandarin = require('./mandarin');

var Pinyin = function(options){

};

Pinyin.prototype.toUnicode = function(str){
	var regexp = /^%u(\w+)$/
	var unicode = escape(str);
	if(regexp.test(unicode)){
		var match = regexp.exec(unicode);
		if(match.length > 1){
			return match[1];
		}
	}
};

Pinyin.prototype.convert = function(unicode){
	for(var code in mandarin){
		var pinyin = mandarin[ code ];
		if( unicode == code )
			return pinyin;
	}
};

Pinyin.prototype.translate = function(words){
	var arr = [];
	for(var i in words){
		var unicode = this.toUnicode( words[i] );
		var pinyin = this.convert(unicode);
		arr.push( pinyin );
	}
	return arr;
};

module.exports = function(words, options){
	return new Pinyin(options).translate(words);
};
