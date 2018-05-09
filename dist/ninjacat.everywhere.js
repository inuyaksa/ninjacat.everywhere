/* 
  ####==--  Ninja Cat Everywhere v0.88.48 - Emoji polyfill support for old Windows, iOS, Android and other devices
  ###=-     created by InuYaksa*2018 
  ##=       https://github.com/inuyaksa/ninjacat.everywhere 
  ##=
  ##=       Inspired by Dillon de Voor, code from http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
  ##=       and by danalloway, code from https://github.com/danalloway/detect-emoji-support/blob/master/src/index.js
  ##=       thanks to Emojipedia for images https://emojipedia.org/
  ##=       thanks to Microsoft for ninjacat emojis and Visual Studio Code
*/


(function(document,window){

  "use strict";
  
  var _hassupport = null;
  var _custom = null;

  function _addcustom(emojis) {
    _custom = _custom || "";
    emojis.match(/.{2}/g).forEach(function(a){            
      _custom += "|\\u" + a.charCodeAt(0).toString(16).toUpperCase() + "\\u" + a.charCodeAt(1).toString(16).toUpperCase();
    });
  }

  function _parse(domortext) {
    
    var exp = (_hassupport) ? "" : "\uD83D\uDC64|\uD83D\uDCBB|\uD83D\uDE80|\uD83C\uDFCD|\uD83D\uDC53|\uD83D\uDC09";
    exp = exp + _custom;

    if (exp && exp.charAt(0) === '|') exp = exp.substr(1);

    var rx = exp && new RegExp("\uD83D\uDC31\u200D("+exp+")","g");

    var el = null;
    if (typeof el === "string") {
      el = document.createElement('div');    
      el.innerHTML = domortext;
    } else {
      el = ("length" in domortext) ? domortext[0] : domortext;
    }
    if (rx) el.innerHTML = el.innerHTML.replace(rx,'<span class="ninjacateverywhere-poly" data-emoji="$1"></span>');

    return el;

  }

  function _support() {
    if (_hassupport === null) _hassupport = _check();
    return _hassupport;
  }

  function _check() {
    var pixelRatio = window.devicePixelRatio || 1;
    var offset = 12 * pixelRatio;
    var node = window.document.createElement('canvas');

    var ctx = node.getContext('2d');
    if (!ctx) return false;
    
    ctx.fillStyle = '#f00';
    ctx.textBaseline = 'top';
    ctx.font = '32px Arial';
    
    //ctx.fillText('\uD83D\uDC31\u200D\uD83D\uDC64', 0, 0); // 🐱‍👤 ninja cat test
    //$("body").append(node);
    //return ctx.getImageData(offset * 2, offset, 1, 1).data[0] !== 0;

    var mt = ctx.measureText('\uD83D\uDC31\u200D\uD83D\uDC64');
    var chk = (mt) ? ((mt.width/32)<1.4) : false;
    var mode = document.documentMode || 0;

    if (!chk && mode && mode>=11) chk = true; // fix for IE11 does not support ninjacats on canvas

    return chk;
  }

  window.ninjacateverywhere = {
    parse: _parse,
    addcustom: _addcustom,
    support: _support,
    legacymode: function() {
      _hassupport = false;
    }
  };

})(document,window);

