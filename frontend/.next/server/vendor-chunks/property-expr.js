"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/property-expr";
exports.ids = ["vendor-chunks/property-expr"];
exports.modules = {

/***/ "(ssr)/./node_modules/property-expr/index.js":
/*!*********************************************!*\
  !*** ./node_modules/property-expr/index.js ***!
  \*********************************************/
/***/ ((module) => {

eval("/**\n * Based on Kendo UI Core expression code <https://github.com/telerik/kendo-ui-core#license-information>\n */\n\n\nfunction Cache(maxSize) {\n  this._maxSize = maxSize\n  this.clear()\n}\nCache.prototype.clear = function () {\n  this._size = 0\n  this._values = Object.create(null)\n}\nCache.prototype.get = function (key) {\n  return this._values[key]\n}\nCache.prototype.set = function (key, value) {\n  this._size >= this._maxSize && this.clear()\n  if (!(key in this._values)) this._size++\n\n  return (this._values[key] = value)\n}\n\nvar SPLIT_REGEX = /[^.^\\]^[]+|(?=\\[\\]|\\.\\.)/g,\n  DIGIT_REGEX = /^\\d+$/,\n  LEAD_DIGIT_REGEX = /^\\d/,\n  SPEC_CHAR_REGEX = /[~`!#$%\\^&*+=\\-\\[\\]\\\\';,/{}|\\\\\":<>\\?]/g,\n  CLEAN_QUOTES_REGEX = /^\\s*(['\"]?)(.*?)(\\1)\\s*$/,\n  MAX_CACHE_SIZE = 512\n\nvar pathCache = new Cache(MAX_CACHE_SIZE),\n  setCache = new Cache(MAX_CACHE_SIZE),\n  getCache = new Cache(MAX_CACHE_SIZE)\n\nvar config\n\nmodule.exports = {\n  Cache: Cache,\n\n  split: split,\n\n  normalizePath: normalizePath,\n\n  setter: function (path) {\n    var parts = normalizePath(path)\n\n    return (\n      setCache.get(path) ||\n      setCache.set(path, function setter(obj, value) {\n        var index = 0\n        var len = parts.length\n        var data = obj\n\n        while (index < len - 1) {\n          var part = parts[index]\n          if (\n            part === '__proto__' ||\n            part === 'constructor' ||\n            part === 'prototype'\n          ) {\n            return obj\n          }\n\n          data = data[parts[index++]]\n        }\n        data[parts[index]] = value\n      })\n    )\n  },\n\n  getter: function (path, safe) {\n    var parts = normalizePath(path)\n    return (\n      getCache.get(path) ||\n      getCache.set(path, function getter(data) {\n        var index = 0,\n          len = parts.length\n        while (index < len) {\n          if (data != null || !safe) data = data[parts[index++]]\n          else return\n        }\n        return data\n      })\n    )\n  },\n\n  join: function (segments) {\n    return segments.reduce(function (path, part) {\n      return (\n        path +\n        (isQuoted(part) || DIGIT_REGEX.test(part)\n          ? '[' + part + ']'\n          : (path ? '.' : '') + part)\n      )\n    }, '')\n  },\n\n  forEach: function (path, cb, thisArg) {\n    forEach(Array.isArray(path) ? path : split(path), cb, thisArg)\n  },\n}\n\nfunction normalizePath(path) {\n  return (\n    pathCache.get(path) ||\n    pathCache.set(\n      path,\n      split(path).map(function (part) {\n        return part.replace(CLEAN_QUOTES_REGEX, '$2')\n      })\n    )\n  )\n}\n\nfunction split(path) {\n  return path.match(SPLIT_REGEX) || ['']\n}\n\nfunction forEach(parts, iter, thisArg) {\n  var len = parts.length,\n    part,\n    idx,\n    isArray,\n    isBracket\n\n  for (idx = 0; idx < len; idx++) {\n    part = parts[idx]\n\n    if (part) {\n      if (shouldBeQuoted(part)) {\n        part = '\"' + part + '\"'\n      }\n\n      isBracket = isQuoted(part)\n      isArray = !isBracket && /^\\d+$/.test(part)\n\n      iter.call(thisArg, part, isBracket, isArray, idx, parts)\n    }\n  }\n}\n\nfunction isQuoted(str) {\n  return (\n    typeof str === 'string' && str && [\"'\", '\"'].indexOf(str.charAt(0)) !== -1\n  )\n}\n\nfunction hasLeadingNumber(part) {\n  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX)\n}\n\nfunction hasSpecialChars(part) {\n  return SPEC_CHAR_REGEX.test(part)\n}\n\nfunction shouldBeQuoted(part) {\n  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part))\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcHJvcGVydHktZXhwci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLElBQUk7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixXQUFXO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWV4cHIvaW5kZXguanM/ZGMyYiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJhc2VkIG9uIEtlbmRvIFVJIENvcmUgZXhwcmVzc2lvbiBjb2RlIDxodHRwczovL2dpdGh1Yi5jb20vdGVsZXJpay9rZW5kby11aS1jb3JlI2xpY2Vuc2UtaW5mb3JtYXRpb24+XG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBDYWNoZShtYXhTaXplKSB7XG4gIHRoaXMuX21heFNpemUgPSBtYXhTaXplXG4gIHRoaXMuY2xlYXIoKVxufVxuQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zaXplID0gMFxuICB0aGlzLl92YWx1ZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG59XG5DYWNoZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5fdmFsdWVzW2tleV1cbn1cbkNhY2hlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0aGlzLl9zaXplID49IHRoaXMuX21heFNpemUgJiYgdGhpcy5jbGVhcigpXG4gIGlmICghKGtleSBpbiB0aGlzLl92YWx1ZXMpKSB0aGlzLl9zaXplKytcblxuICByZXR1cm4gKHRoaXMuX3ZhbHVlc1trZXldID0gdmFsdWUpXG59XG5cbnZhciBTUExJVF9SRUdFWCA9IC9bXi5eXFxdXltdK3woPz1cXFtcXF18XFwuXFwuKS9nLFxuICBESUdJVF9SRUdFWCA9IC9eXFxkKyQvLFxuICBMRUFEX0RJR0lUX1JFR0VYID0gL15cXGQvLFxuICBTUEVDX0NIQVJfUkVHRVggPSAvW35gISMkJVxcXiYqKz1cXC1cXFtcXF1cXFxcJzssL3t9fFxcXFxcIjo8PlxcP10vZyxcbiAgQ0xFQU5fUVVPVEVTX1JFR0VYID0gL15cXHMqKFsnXCJdPykoLio/KShcXDEpXFxzKiQvLFxuICBNQVhfQ0FDSEVfU0laRSA9IDUxMlxuXG52YXIgcGF0aENhY2hlID0gbmV3IENhY2hlKE1BWF9DQUNIRV9TSVpFKSxcbiAgc2V0Q2FjaGUgPSBuZXcgQ2FjaGUoTUFYX0NBQ0hFX1NJWkUpLFxuICBnZXRDYWNoZSA9IG5ldyBDYWNoZShNQVhfQ0FDSEVfU0laRSlcblxudmFyIGNvbmZpZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ2FjaGU6IENhY2hlLFxuXG4gIHNwbGl0OiBzcGxpdCxcblxuICBub3JtYWxpemVQYXRoOiBub3JtYWxpemVQYXRoLFxuXG4gIHNldHRlcjogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB2YXIgcGFydHMgPSBub3JtYWxpemVQYXRoKHBhdGgpXG5cbiAgICByZXR1cm4gKFxuICAgICAgc2V0Q2FjaGUuZ2V0KHBhdGgpIHx8XG4gICAgICBzZXRDYWNoZS5zZXQocGF0aCwgZnVuY3Rpb24gc2V0dGVyKG9iaiwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMFxuICAgICAgICB2YXIgbGVuID0gcGFydHMubGVuZ3RoXG4gICAgICAgIHZhciBkYXRhID0gb2JqXG5cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbGVuIC0gMSkge1xuICAgICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaW5kZXhdXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcGFydCA9PT0gJ19fcHJvdG9fXycgfHxcbiAgICAgICAgICAgIHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHxcbiAgICAgICAgICAgIHBhcnQgPT09ICdwcm90b3R5cGUnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGF0YSA9IGRhdGFbcGFydHNbaW5kZXgrK11dXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtwYXJ0c1tpbmRleF1dID0gdmFsdWVcbiAgICAgIH0pXG4gICAgKVxuICB9LFxuXG4gIGdldHRlcjogZnVuY3Rpb24gKHBhdGgsIHNhZmUpIHtcbiAgICB2YXIgcGFydHMgPSBub3JtYWxpemVQYXRoKHBhdGgpXG4gICAgcmV0dXJuIChcbiAgICAgIGdldENhY2hlLmdldChwYXRoKSB8fFxuICAgICAgZ2V0Q2FjaGUuc2V0KHBhdGgsIGZ1bmN0aW9uIGdldHRlcihkYXRhKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgbGVuID0gcGFydHMubGVuZ3RoXG4gICAgICAgIHdoaWxlIChpbmRleCA8IGxlbikge1xuICAgICAgICAgIGlmIChkYXRhICE9IG51bGwgfHwgIXNhZmUpIGRhdGEgPSBkYXRhW3BhcnRzW2luZGV4KytdXVxuICAgICAgICAgIGVsc2UgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgIH0pXG4gICAgKVxuICB9LFxuXG4gIGpvaW46IGZ1bmN0aW9uIChzZWdtZW50cykge1xuICAgIHJldHVybiBzZWdtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKHBhdGgsIHBhcnQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHBhdGggK1xuICAgICAgICAoaXNRdW90ZWQocGFydCkgfHwgRElHSVRfUkVHRVgudGVzdChwYXJ0KVxuICAgICAgICAgID8gJ1snICsgcGFydCArICddJ1xuICAgICAgICAgIDogKHBhdGggPyAnLicgOiAnJykgKyBwYXJ0KVxuICAgICAgKVxuICAgIH0sICcnKVxuICB9LFxuXG4gIGZvckVhY2g6IGZ1bmN0aW9uIChwYXRoLCBjYiwgdGhpc0FyZykge1xuICAgIGZvckVhY2goQXJyYXkuaXNBcnJheShwYXRoKSA/IHBhdGggOiBzcGxpdChwYXRoKSwgY2IsIHRoaXNBcmcpXG4gIH0sXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVBhdGgocGF0aCkge1xuICByZXR1cm4gKFxuICAgIHBhdGhDYWNoZS5nZXQocGF0aCkgfHxcbiAgICBwYXRoQ2FjaGUuc2V0KFxuICAgICAgcGF0aCxcbiAgICAgIHNwbGl0KHBhdGgpLm1hcChmdW5jdGlvbiAocGFydCkge1xuICAgICAgICByZXR1cm4gcGFydC5yZXBsYWNlKENMRUFOX1FVT1RFU19SRUdFWCwgJyQyJylcbiAgICAgIH0pXG4gICAgKVxuICApXG59XG5cbmZ1bmN0aW9uIHNwbGl0KHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgubWF0Y2goU1BMSVRfUkVHRVgpIHx8IFsnJ11cbn1cblxuZnVuY3Rpb24gZm9yRWFjaChwYXJ0cywgaXRlciwgdGhpc0FyZykge1xuICB2YXIgbGVuID0gcGFydHMubGVuZ3RoLFxuICAgIHBhcnQsXG4gICAgaWR4LFxuICAgIGlzQXJyYXksXG4gICAgaXNCcmFja2V0XG5cbiAgZm9yIChpZHggPSAwOyBpZHggPCBsZW47IGlkeCsrKSB7XG4gICAgcGFydCA9IHBhcnRzW2lkeF1cblxuICAgIGlmIChwYXJ0KSB7XG4gICAgICBpZiAoc2hvdWxkQmVRdW90ZWQocGFydCkpIHtcbiAgICAgICAgcGFydCA9ICdcIicgKyBwYXJ0ICsgJ1wiJ1xuICAgICAgfVxuXG4gICAgICBpc0JyYWNrZXQgPSBpc1F1b3RlZChwYXJ0KVxuICAgICAgaXNBcnJheSA9ICFpc0JyYWNrZXQgJiYgL15cXGQrJC8udGVzdChwYXJ0KVxuXG4gICAgICBpdGVyLmNhbGwodGhpc0FyZywgcGFydCwgaXNCcmFja2V0LCBpc0FycmF5LCBpZHgsIHBhcnRzKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc1F1b3RlZChzdHIpIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBzdHIgJiYgW1wiJ1wiLCAnXCInXS5pbmRleE9mKHN0ci5jaGFyQXQoMCkpICE9PSAtMVxuICApXG59XG5cbmZ1bmN0aW9uIGhhc0xlYWRpbmdOdW1iZXIocGFydCkge1xuICByZXR1cm4gcGFydC5tYXRjaChMRUFEX0RJR0lUX1JFR0VYKSAmJiAhcGFydC5tYXRjaChESUdJVF9SRUdFWClcbn1cblxuZnVuY3Rpb24gaGFzU3BlY2lhbENoYXJzKHBhcnQpIHtcbiAgcmV0dXJuIFNQRUNfQ0hBUl9SRUdFWC50ZXN0KHBhcnQpXG59XG5cbmZ1bmN0aW9uIHNob3VsZEJlUXVvdGVkKHBhcnQpIHtcbiAgcmV0dXJuICFpc1F1b3RlZChwYXJ0KSAmJiAoaGFzTGVhZGluZ051bWJlcihwYXJ0KSB8fCBoYXNTcGVjaWFsQ2hhcnMocGFydCkpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/property-expr/index.js\n");

/***/ })

};
;