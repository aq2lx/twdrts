'use strict';

// Varible
var apAtttack = 20;
var apPerTurn = [0, 0, 0, 0, 0];

// Report
var reportArRound = function reportArRound(idx, val) {
  var eleApRound = document.getElementById('r' + idx);
  var inputAp = parseInt(document.getElementById('ipt-ap' + idx).value, 10);

  eleApRound.innerHTML = Math.ceil(inputAp / val);
};

var reportApPerTurn = function reportApPerTurn(idx, val) {
  var eleApPerTurn = document.getElementById('apt' + idx);

  eleApPerTurn.innerHTML = val;
};

var report = function report(idx, val) {
  reportArRound(idx, val);
  reportApPerTurn(idx, val);
};

//Calculate
var calculateNode = function calculateNode(idx) {
  return apPerTurn[idx] = Math.round((apAtttack + getApFromLeader(idx) + getApWeapon(idx) + getApSpecial(idx)) * getMethod());
};

var calculateAll = function calculateAll() {
  for (var i = 0; i <= 4; i++) {
    report(i, calculateNode(i));
  }
};

// Get
var getMethod = function getMethod() {
  var method = parseFloat(document.querySelector('input[name="method"]:checked').value);

  return method;
};

var getApFromLeader = function getApFromLeader(idx) {
  var typeToon = void 0;
  var apFromLeader = 0;

  var traitToon = document.getElementById('t' + idx).value;
  var leader = document.querySelector('input[name="leader"]:checked').value;

  if (traitToon === 'fast' || traitToon === 'strong') {
    typeToon = 'melee';
  } else if (traitToon === 'alert' || traitToon === 'tough') {
    typeToon = 'ranged';
  } else {
    typeToon = undefined;
  }

  if (leader === 'all' || traitToon === leader || typeToon === leader) {
    apFromLeader = parseInt(document.querySelector('input[name="leader-ap"]:checked').value, 10);
  }

  return apFromLeader;
};

var getApWeapon = function getApWeapon(idx) {
  var apWeapon = parseInt(document.getElementById('w' + idx).value, 10);

  return apWeapon;
};

var getApSpecial = function getApSpecial(idx) {
  var apSpecialPercent = 0;
  var apSpecialPoint = 0;

  var eSpecials = document.querySelectorAll('input[name="special-ap"]:checked');
  var inputAp = parseInt(document.getElementById('ipt-ap' + idx).value, 10);

  for (var i = 0; i < eSpecials.length; i++) {
    apSpecialPercent += parseInt(eSpecials[i].value, 10);
  }

  apSpecialPoint = Math.round(inputAp * apSpecialPercent / 100);

  return apSpecialPoint;
};

// Elements
var eMethods = document.querySelectorAll('input[name="method"]');
var eLeaders = document.querySelectorAll('input[name="leader"]');
var eLeaderAPs = document.querySelectorAll('input[name="leader-ap"]');
var eWeaponAPs = document.querySelectorAll('select[name="weapon-ap"]');
var eSpecialAPs = document.querySelectorAll('input[name="special-ap"]');
var eSelectTraits = document.querySelectorAll('select[name="triat"]');
var eInputAPs = document.querySelectorAll('input[name="input-ap"]');

// Events
Array.prototype.slice.call(eMethods).concat(Array.prototype.slice.call(eLeaders), Array.prototype.slice.call(eLeaderAPs), Array.prototype.slice.call(eSpecialAPs)).forEach(function (elem) {
  elem.onchange = function () {
    calculateAll();
  };
});

var _loop = function _loop(i) {
  eSelectTraits[i].onchange = function () {
    var elSpecialAp = document.getElementById('sp' + i);
    var chkSpecial = document.getElementById('chk-ar' + i);

    chkSpecial.checked = false;

    if (this.value != 'fast') {
      elSpecialAp.className = 'hide';
    } else {
      elSpecialAp.className = '';
    }

    calculateAll();
  };
};

for (var i = 0; i < eSelectTraits.length; i++) {
  _loop(i);
}

var _loop2 = function _loop2(i) {
  eWeaponAPs[i].onchange = function () {
    report(i, calculateNode(i));
  };
};

for (var i = 0; i < eWeaponAPs.length; i++) {
  _loop2(i);
}

var _loop3 = function _loop3(i) {
  eInputAPs[i].onclick = function () {
    this.select();
  };

  eInputAPs[i].onkeyup = function () {
    report(i, calculateNode(i));
  };
};

for (var i = 0; i < eInputAPs.length; i++) {
  _loop3(i);
}

// Initialize
calculateAll();