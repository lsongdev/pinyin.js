const mandarin = require('./data/mandarin');

/**
 * [Pinyin description]
 * @param {[type]} str     [description]
 * @param {[type]} options [description]
 */
function Pinyin(str, options){
	var arr = [], t;
	str = str.replace(/[\u4E00-\uFA29]|[\uE7C7-\uE7F3]|\w+/ig, function(word){
		t = mandarin[ unicode(word) ];
		t && arr.push(t);
		return t;
	});
	return arr;
};
/**
 * [STYLE description]
 * @type {Number}
 */
Pinyin.STYLE_INITIAL = 0x00;
Pinyin.STYLE_TONE    = 0x01;

/**
 * [unicode description]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function unicode(str){
	return (escape(str).match(/^%u(\w+)$/) || [])[1];
};
/**
 * [normalize description]
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
function normalize(p){
	var notation = {
		  'a': "āáǎà"
		, 'e': "ēéěè"
		, 'i': "īíǐì"
		, 'o': "ōóǒò"
		, 'u': "ūúǔù"
	};
	Object.keys(notation).forEach(function(letter){
		p = p.replace(new RegExp('[' + notation[ letter ] + ']' ), letter);
	});
	return p;
};

Pinyin.unicode	 = unicode;
Pinyin.normalize = normalize;

module.exports = Pinyin;
