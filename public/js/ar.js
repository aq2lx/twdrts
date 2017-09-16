'use strict';

// Varible
var apAtttack = 20;

// Report
var reportArRound = function reportArRound(idx, ap, aprcv) {
  var eleApRound = document.getElementById('r' + idx);
  var eleApFSWRound = document.getElementById('rs' + idx);
  var inputAp = getInputAp(idx);

  if (aprcv) {
    var rs = 0;

    while (aprcv < inputAp) {
      aprcv += ap;
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

var reportApPerTurn = function reportApPerTurn(idx, ap, aprcv) {
  var eleApPerTurn = document.getElementById('apt' + idx);

  eleApPerTurn.innerHTML = ap + aprcv;
};

var reportApReceived = function reportApReceived(idx, aprcv) {
  var eleApFromSpecialWeapon = document.getElementById('sap' + idx);

  if (aprcv) {
    eleApFromSpecialWeapon.innerHTML = '(+ ' + aprcv + ')';
  } else {
    eleApFromSpecialWeapon.innerHTML = '';
  }
};

var report = function report(idx, ap, aprcv) {
  reportArRound(idx, ap, aprcv);
  reportApPerTurn(idx, ap, aprcv);
  reportApReceived(idx, aprcv);
};

//Calculate
var calculateAp = function calculateAp(idx) {
  report(idx, calculateNode(idx), getApReceived(idx, 15) + getApReceived(idx, 20) + getApReceived(idx, 40) + getApSpecialFast(idx) + getApSpecialTough(idx));
};

var calculateNode = function calculateNode(idx) {
  return parseFloat(((apAtttack + getApFromLeader(idx) + getApWeapon(idx)) * getMethod()).toFixed(1));
};

var calculateAll = function calculateAll() {
  for (var i = 0; i <= 4; i++) {
    calculateAp(i);
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
    apFromLeader = parseFloat(document.querySelector('input[name="leader-ap"]:checked').value);
  }

  return apFromLeader;
};

var getApWeapon = function getApWeapon(idx) {
  var apWeapon = parseFloat(document.getElementById('w' + idx).value);

  return apWeapon;
};

var getInputAp = function getInputAp(idx) {
  var inputAp = document.getElementById('ipt-ap' + idx).value || 0;

  return parseInt(inputAp, 10);
};

var getApSpecialFast = function getApSpecialFast(idx) {
  var apSpecialPercent = 0;
  var apSpecialPoint = 0;

  var eSpecials = document.querySelectorAll('input[name="special-apf"]:checked');
  var inputAp = getInputAp(idx);

  for (var i = 0; i < eSpecials.length; i++) {
    apSpecialPercent += parseInt(eSpecials[i].value, 10);
  }

  apSpecialPoint = Math.round(inputAp * apSpecialPercent / 100);

  return apSpecialPoint;
};

var getApSpecialTough = function getApSpecialTough(idx) {
  var apSpecialPoint = 0;

  var eSpecial = document.getElementById('chk-art' + idx);
  var inputAp = getInputAp(idx);

  if (eSpecial.checked) {
    apSpecialPoint = Math.round(inputAp * parseInt(eSpecial.value, 10) / 100);
  }

  return apSpecialPoint;
};

var getApReceived = function getApReceived(idx, percent) {
  var apReceived = 0;

  var eReceived = document.getElementById('chk-apr' + percent + '-' + idx);
  var inputAp = getInputAp(idx);

  if (eReceived.checked) {
    apReceived = Math.round(inputAp * parseInt(percent, 10) / 100);
  }

  return apReceived;
};

// Elements
var eMethods = document.querySelectorAll('input[name="method"]');
var eLeaders = document.querySelectorAll('input[name="leader"]');
var eLeaderAPs = document.querySelectorAll('input[name="leader-ap"]');
var eWeaponAPs = document.querySelectorAll('select[name="weapon-ap"]');
var eSpecialAPfs = document.querySelectorAll('input[name="special-apf"]');
var eSpecialAPts = document.querySelectorAll('input[name="special-apt"]');
var eReceived15 = document.querySelectorAll('input[name="apr15"]');
var eReceived20 = document.querySelectorAll('input[name="apr20"]');
var eReceived40 = document.querySelectorAll('input[name="apr40"]');
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
    calculateAp(i);
  };
};

for (var i = 0; i < eWeaponAPs.length; i++) {
  _loop2(i);
}

var _loop3 = function _loop3(i) {
  eInputAPs[i].oninput = function () {
    if (this.value.length > 3) {
      this.value = this.value.slice(0, 3);
    }
  };

  eInputAPs[i].onclick = function () {
    this.select();
  };

  eInputAPs[i].onkeyup = function () {
    calculateAp(i);
  };
};

for (var i = 0; i < eInputAPs.length; i++) {
  _loop3(i);
}

var _loop4 = function _loop4(i) {
  eSpecialAPts[i].onchange = function () {
    calculateAp(i);
  };
};

for (var i = 0; i < eSpecialAPts.length; i++) {
  _loop4(i);
}

var _loop5 = function _loop5(i) {
  eReceived15[i].onchange = function () {
    calculateAp(i);
  };
};

for (var i = 0; i < eReceived15.length; i++) {
  _loop5(i);
}

var _loop6 = function _loop6(i) {
  eReceived20[i].onchange = function () {
    calculateAp(i);
  };
};

for (var i = 0; i < eReceived20.length; i++) {
  _loop6(i);
}

var _loop7 = function _loop7(i) {
  eReceived40[i].onchange = function () {
    calculateAp(i);
  };
};

for (var i = 0; i < eReceived40.length; i++) {
  _loop7(i);
}

// Initialize
calculateAll();