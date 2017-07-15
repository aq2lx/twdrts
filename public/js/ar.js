'use strict';

// Varible
var apAtttack = 20;

// Report
var reportArRound = function reportArRound(idx, ap, apsp) {
  var eleApRound = document.getElementById('r' + idx);
  var eleApFSWRound = document.getElementById('rs' + idx);
  var inputAp = parseInt(document.getElementById('ipt-ap' + idx).value, 10);

  if (apsp) {
    var rs = 0;

    while (apsp < inputAp) {
      apsp += ap;
      rs++;
    }

    eleApFSWRound.innerHTML = rs + ' / ';
  } else {
    eleApFSWRound.innerHTML = '';
  }

  var r = 0;
  var sap = 0;

  while (sap < inputAp) {
    sap += ap;
    r++;
  }

  eleApRound.innerHTML = r;
};

var reportApPerTurn = function reportApPerTurn(idx, ap, apsp) {
  var eleApPerTurn = document.getElementById('apt' + idx);

  eleApPerTurn.innerHTML = ap + apsp;
};

var reportApFromSpecialWeapon = function reportApFromSpecialWeapon(idx, apsp) {
  var eleApFromSpecialWeapon = document.getElementById('sap' + idx);

  if (apsp) {
    eleApFromSpecialWeapon.innerHTML = '(+ ' + apsp + ')';
  } else {
    eleApFromSpecialWeapon.innerHTML = '';
  }
};

var report = function report(idx, ap, apsp) {
  reportArRound(idx, ap, apsp);
  reportApPerTurn(idx, ap, apsp);
  reportApFromSpecialWeapon(idx, apsp);
};

//Calculate
var calculateNode = function calculateNode(idx) {
  return Math.round((apAtttack + getApFromLeader(idx) + getApWeapon(idx)) * getMethod());
};

var calculateAll = function calculateAll() {
  for (var i = 0; i <= 4; i++) {
    report(i, calculateNode(i), getApSpecialFast(i) + getApSpecialTough(i));
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

var getApSpecialFast = function getApSpecialFast(idx) {
  var apSpecialPercent = 0;
  var apSpecialPoint = 0;

  var eSpecials = document.querySelectorAll('input[name="special-apf"]:checked');
  var inputAp = parseInt(document.getElementById('ipt-ap' + idx).value, 10);

  for (var i = 0; i < eSpecials.length; i++) {
    apSpecialPercent += parseInt(eSpecials[i].value, 10);
  }

  apSpecialPoint = Math.round(inputAp * apSpecialPercent / 100);

  return apSpecialPoint;
};

var getApSpecialTough = function getApSpecialTough(idx) {
  var apSpecialPercent = 0;
  var apSpecialPoint = 0;

  var eSpecial = document.getElementById('chk-art' + idx);
  var inputAp = parseInt(document.getElementById('ipt-ap' + idx).value, 10);

  if (eSpecial.checked) {
    apSpecialPoint = Math.round(inputAp * parseInt(eSpecial.value, 10) / 100);
  }

  return apSpecialPoint;
};

// Elements
var eMethods = document.querySelectorAll('input[name="method"]');
var eLeaders = document.querySelectorAll('input[name="leader"]');
var eLeaderAPs = document.querySelectorAll('input[name="leader-ap"]');
var eWeaponAPs = document.querySelectorAll('select[name="weapon-ap"]');
var eSpecialAPfs = document.querySelectorAll('input[name="special-apf"]');
var eSpecialAPts = document.querySelectorAll('input[name="special-apt"]');
var eSelectTraits = document.querySelectorAll('select[name="triat"]');
var eInputAPs = document.querySelectorAll('input[name="input-ap"]');

// Events
Array.prototype.slice.call(eMethods).concat(Array.prototype.slice.call(eLeaders), Array.prototype.slice.call(eLeaderAPs), Array.prototype.slice.call(eSpecialAPfs)).forEach(function (elem) {
  elem.onchange = function () {
    calculateAll();
  };
});

var _loop = function _loop(i) {
  eSelectTraits[i].onchange = function () {
    var elSpecialApFast = document.getElementById('spf' + i);
    var elSpecialApTough = document.getElementById('spt' + i);
    var chkSpecialFast = document.getElementById('chk-arf' + i);
    var chkSpecialTough = document.getElementById('chk-art' + i);

    chkSpecialFast.checked = false;
    chkSpecialTough.checked = false;

    var fx = {
      fast: function fast() {
        elSpecialApFast.classList.remove('hide');
        elSpecialApTough.classList.add('hide');
      },
      strong: function strong() {
        elSpecialApFast.classList.add('hide');
        elSpecialApTough.classList.add('hide');
      },
      alert: function alert() {
        elSpecialApFast.classList.add('hide');
        elSpecialApTough.classList.add('hide');
      },
      tough: function tough() {
        elSpecialApFast.classList.add('hide');
        elSpecialApTough.classList.remove('hide');
      }
    };

    fx[this.value]();

    calculateAll();
  };
};

for (var i = 0; i < eSelectTraits.length; i++) {
  _loop(i);
}

var _loop2 = function _loop2(i) {
  eWeaponAPs[i].onchange = function () {
    report(i, calculateNode(i), getApSpecialFast(i) + getApSpecialTough(i));
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
    report(i, calculateNode(i), getApSpecialFast(i) + getApSpecialTough(i));
  };
};

for (var i = 0; i < eInputAPs.length; i++) {
  _loop3(i);
}

var _loop4 = function _loop4(i) {
  eSpecialAPts[i].onchange = function () {
    report(i, calculateNode(i), getApSpecialFast(i) + getApSpecialTough(i));
  };
};

for (var i = 0; i < eSpecialAPts.length; i++) {
  _loop4(i);
}

// Initialize
calculateAll();