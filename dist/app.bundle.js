var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: ScavengerCamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/app.scss */ \"./src/sass/app.scss\");\n/* harmony import */ var _sass_app_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_app_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _module_ScavengerCamp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/ScavengerCamp.js */ \"./src/module/ScavengerCamp.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ScavengerCamp\", function() { return _module_ScavengerCamp_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://app/./src/app.js?");

/***/ }),

/***/ "./src/db.json":
/*!*********************!*\
  !*** ./src/db.json ***!
  \*********************/
/*! exports provided: maxLevel, xp, renown, default */
/***/ (function(module) {

eval("module.exports = {\"maxLevel\":{\"s4\":{\"t1\":40,\"t2\":50,\"t3\":60,\"t4\":70},\"s5\":{\"t1\":50,\"t2\":60,\"t3\":70,\"t4\":80},\"s6\":{\"t1\":60,\"t2\":70,\"t3\":80,\"t4\":90}},\"xp\":{\"s4\":{\"t1\":[263,264,266,270,274,278,283,288,294,300,306,313,320,327,335,343,351,360,368,377,386,396,405,415,425,436,446,457,468,479,490,502,513,525,537,549,562,574,587],\"t2\":[300,302,305,309,314,320,326,332,340,347,355,364,373,382,392,402,412,423,434,445,456,468,481,493,506,519,532,545,559,573,587,602,617,632,647,662,678,694,710,726,743,759,776,793,811,828,846,864,882],\"t3\":[338,340,345,351,358,366,375,385,396,407,419,431,444,458,472,487,502,517,533,550,567,584,602,620,639,658,678,697,718,738,759,780,802,824,846,869,892,915,938,962,986,1011,1036,1061,1086,1112,1138,1164,1191,1217,1244,1272,1299,1327,1355,1384,1412,1441,1471],\"t4\":[375,380,389,402,416,432,450,470,490,513,536,561,587,614,642,671,702,733,765,798,831,866,902,938,975,1013,1052,1091,1131,1172,1214,1256,1299,1342,1387,1432,1477,1524,1570,1618,1666,1715,1764,1814,1864,1916,1967,2019,2072,2125,2179,2234,2289,2344,2400,2457,2514,2571,2629,2688,2747,2806,2866,2927,2988,3049,3111,3174,3237]},\"s5\":{\"t1\":[300,302,305,309,314,320,326,332,340,347,355,364,373,382,392,402,412,423,434,445,456,468,481,493,506,519,532,545,559,573,587,602,617,632,647,662,678,694,710,726,743,759,776,793,811,828,846,864,882],\"t2\":[338,340,345,351,358,366,375,385,396,407,419,431,444,458,472,487,502,517,533,550,567,584,602,620,639,658,678,697,718,738,759,780,802,824,846,869,892,915,938,962,986,1011,1036,1061,1086,1112,1138,1164,1191,1217,1244,1272,1299,1327,1355,1384,1412,1441,1471],\"t3\":[375,380,389,402,416,432,450,470,490,513,536,561,587,614,642,671,702,733,765,798,831,866,902,938,975,1013,1052,1091,1131,1172,1214,1256,1299,1342,1387,1432,1477,1524,1570,1618,1666,1715,1764,1814,1864,1916,1967,2019,2072,2125,2179,2234,2289,2344,2400,2457,2514,2571,2629,2688,2747,2806,2866,2927,2988,3049,3111,3174,3237],\"t4\":[413,419,431,446,464,485,507,532,559,587,617,648,681,715,751,788,826,865,906,948,990,1034,1079,1125,1172,1220,1269,1319,1370,1422,1474,1528,1582,1638,1694,1751,1808,1867,1926,1986,2047,2109,2171,2235,2299,2363,2429,2495,2562,2629,2697,2766,2836,2906,2977,3048,3121,3193,3267,3341,3416,3491,3567,3644,3721,3799,3877,3956,4036,4116,4197,4279,4360,4443,4526,4610,4694,4779,4863]},\"s6\":{\"t1\":[338,340,345,351,358,366,375,385,396,407,419,431,444,458,472,487,502,517,533,550,567,584,602,620,639,658,678,697,718,738,759,780,802,824,846,869,892,915,938,962,986,1011,1036,1061,1086,1112,1138,1164,1191,1217,1244,1272,1299,1327,1355,1384,1412,1441,1471],\"t2\":[375,380,389,402,416,432,450,470,490,513,536,561,587,614,642,671,702,733,765,798,831,866,902,938,975,1013,1052,1091,1131,1172,1214,1256,1299,1342,1387,1432,1477,1524,1570,1618,1666,1715,1764,1814,1864,1916,1967,2019,2072,2125,2179,2234,2289,2344,2400,2457,2514,2571,2629,2688,2747,2806,2866,2927,2988,3049,3111,3174,3237],\"t3\":[413,419,431,446,464,485,507,532,559,587,617,648,681,715,751,788,826,865,906,948,990,1034,1079,1125,1172,1220,1269,1319,1370,1422,1474,1528,1582,1638,1694,1751,1808,1867,1926,1986,2047,2109,2171,2235,2299,2363,2429,2495,2562,2629,2697,2766,2836,2906,2977,3048,3121,3193,3267,3341,3416,3491,3567,3644,3721,3799,3877,3956,4036,4116,4197,4279,4360,4443,4526,4610,4694,4779,4863],\"t4\":[435,442,455,471,491,513,538,564,593,624,656,690,725,762,801,841,882,925,968,1014,1060,1107,1156,1206,1256,1308,1361,1415,1470,1526,1583,1641,1699,1759,1820,1881,1944,2007,2071,2136,2202,2269,2336,2405,2474,2544,2614,2686,2758,2831,2905,2979,3054,3130,3207,3284,3362,3441,3520,3601,3681,3763,3845,3928,4011,4096,4180,4266,4352,4439,4526,4614,4703,4792,4882,4972,5063,5155,5247,5340,5433,5527,5622,5717,5813,5909,6006,6103,6201]}},\"renown\":{\"s4\":[105,210,420,875],\"s5\":[875,1750,3500,7000],\"s6\":[1725,3450,6900,13800]}};\n\n//# sourceURL=webpack://app/./src/db.json?");

/***/ }),

/***/ "./src/module/ScavengerCamp.js":
/*!*************************************!*\
  !*** ./src/module/ScavengerCamp.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _db_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db.json */ \"./src/db.json\");\nvar _db_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/Object.assign({}, _db_json__WEBPACK_IMPORTED_MODULE_0__, {\"default\": _db_json__WEBPACK_IMPORTED_MODULE_0__});\n\n\nconst ScavengerCamp = {\n\n  state: {\n    counMember: 0,\n  },\n\n  init(options = {}) {\n    this.mergeOptions(options)\n        .defineEl()\n        .iniCamp()\n        .iniModal();\n  },\n\n  mergeOptions(options) {\n    const opt = {\n      xpFromScav: options.xpFromScav || 100000,\n      star: options.star || 6,\n      tier: options.tier || 1,\n    };\n\n    this.state = { ...this.state, ...opt };\n\n    return this;\n  },\n\n  defineEl() {\n    this.el = {\n      modalAddMember: document.getElementById('modal-addmember'),\n      btnCloseModal: document.getElementById('btn-close-md'),\n    }\n\n    return this;\n  },\n\n  iniCamp() {\n    const camp = document.getElementById('camp');\n    const campNodes = this.el.campNodes = camp.getElementsByTagName('li');\n\n    Array.prototype.forEach.call(this.el.campNodes, el => {\n      el.onclick = (() => {\n        this.toggleModal(this.el.modalAddMember);\n      })\n    })\n\n    return this;\n  },\n\n  iniModal() {\n    const eGroupStar = document.getElementById('g-star');\n    const eGroupTier = document.getElementById('g-tier');\n    const eName = document.getElementById('ipt-name');\n    const eInputLvl = document.getElementById('ipt-lvl');\n    const eInputXp = document.getElementById('ipt-xp');\n    const eBtnAddtoCamp = document.getElementById('btn-addtocamp');\n    const eBtnStar = eGroupStar.getElementsByTagName('button');\n    const eBtnTier = eGroupTier.getElementsByTagName('button');\n\n    // Input star\n    for (let i = 0; i < eBtnStar.length; i++) {\n      eBtnStar[i].onclick = (e) => {\n        for (let j = 0; j < eBtnStar.length; j++) {\n          eBtnStar[j].classList.remove('active');\n        }\n\n        const el = e.target || e.currentTarget;\n        el.classList.add('active');\n\n        this.state.star = parseInt(el.dataset.value, 10);\n        this.setMaxLevel();\n      }\n    }\n\n    // Input tier\n    for (let i = 0; i < eBtnTier.length; i++) {\n      eBtnTier[i].onclick = (e) => {\n        for (let j = 0; j < eBtnTier.length; j++) {\n          eBtnTier[j].classList.remove('active');\n        }\n\n        const el = e.target || e.currentTarget;\n        el.classList.add('active');\n\n        this.state.tier = parseInt(el.dataset.value, 10);\n        this.setMaxLevel();\n      }\n    }\n\n    // Input lvl\n    eInputLvl.onkeyup = (e) => {\n      const el = e.target || e.currentTarget;\n\n      if (el.value > this.state.maxLevel) {\n        el.value = this.state.maxLevel;\n      }\n    }\n\n    // Input xp\n    eInputXp.onkeyup = function() {\n      if (this.value > 9999) {\n        this.value = 9999;\n      }\n    }\n\n    // Button add to camp\n    eBtnAddtoCamp.onclick = () => {\n      console.log(this.state);\n    }\n\n    // Close modal\n    this.el.btnCloseModal.onclick = (() => {\n      this.toggleModal(this.el.modalAddMember);\n    })\n\n    return this;\n  },\n\n  toggleModal(modal) {\n    modal.classList.toggle('md-show');\n  },\n\n  setMaxLevel() {\n    this.state.maxLevel = _db_json__WEBPACK_IMPORTED_MODULE_0__.maxLevel[`s${this.state.star}`][`t${this.state.tier}`];\n\n    console.log(this.state.maxLevel);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ScavengerCamp);\n\n\n//# sourceURL=webpack://app/./src/module/ScavengerCamp.js?");

/***/ }),

/***/ "./src/sass/app.scss":
/*!***************************!*\
  !*** ./src/sass/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack://app/./src/sass/app.scss?");

/***/ })

/******/ });