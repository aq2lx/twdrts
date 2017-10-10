'use strict';

// Config
//==============================
var xpFromScav = 100000;

// Varible
var campMember = [];

var name = '';
var star = 6;
var tier = 1;
var lvl = 1;
var xp = 0;
var countMember = 0;
var xpPerMember = 0;
var maxLvl = 80;

// Elements
//==============================
var eName = document.getElementById('ipt-name');

var eLblLvl = document.getElementById('lbl-lvl');
var eInputLvl = document.getElementById('range-lvl');

var eGroupStar = document.getElementById('g-star');
var eGroupTier = document.getElementById('g-tier');
var eBtnStar = eGroupStar.getElementsByTagName('button');
var eBtnTier = eGroupTier.getElementsByTagName('button');

var btnAddtoCamp = document.getElementById('btn-addtocamp');
var camp = document.getElementById('camp');
var campNodes = camp.getElementsByTagName('li');

var eXP = document.getElementById('ipt-xp');

// Input Change
//==============================
eName.onchange = function () {
  name = this.value;
};

eName.onclick = function () {
  this.select();
};

// Input XP
//==============================
eXP.oninput = function () {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
};

eXP.onclick = function () {
  this.select();
};

eXP.onkeyup = function () {
  xp = parseInt(this.value || 0, 10);
};

// Input Level
//==============================
eInputLvl.oninput = function () {
  eLblLvl.value = lvl = parseInt(this.value);
};

eLblLvl.onclick = function () {
  this.select();
};

eLblLvl.onkeyup = function () {
  if (this.value > maxLvl) {
    eLblLvl.value = maxLvl;
  }

  eInputLvl.value = lvl = parseInt(this.value || 1, 0);
};

// Input Star
//==============================
for (var i = 0; i < eBtnStar.length; i++) {
  eBtnStar[i].onclick = function () {
    for (var j = 0; j < eBtnStar.length; j++) {
      eBtnStar[j].classList.remove('active');
    }

    this.classList.add('active');
    star = parseInt(this.dataset.value, 10);

    setMaxLevel();
  };
}

// Input Tier
//==============================
for (var _i = 0; _i < eBtnTier.length; _i++) {
  eBtnTier[_i].onclick = function () {
    for (var j = 0; j < eBtnTier.length; j++) {
      eBtnTier[j].classList.remove('active');
    }

    this.classList.add('active');
    tier = parseInt(this.dataset.value, 10);

    setMaxLevel();
  };
}

// Add to camp
//==============================
var addToCamp = function addToCamp(data) {
  var idx = void 0;

  // Check empty nodes
  for (var _i2 = 0; _i2 < 5; _i2++) {
    if (!campNodes[_i2].hasChildNodes()) {
      idx = _i2;

      break;
    }
  }

  data.idx = idx;
  campMember[idx] = data;

  // Create element
  var newMember = document.createElement('div');
  newMember.className = 'fill';

  // Append child
  newMember.appendChild(addBtnRemove(idx));
  newMember.appendChild(addTier(data.tier));
  newMember.appendChild(createTable(data));

  campNodes[idx].appendChild(newMember);

  countMember++;

  calculate();
};

// Add element
//==============================
var addBtnRemove = function addBtnRemove(idx) {
  var btnRemove = document.createElement('span');

  btnRemove.className = 'close';
  btnRemove.innerHTML = '&times;';
  btnRemove.idx = idx;

  // Add events
  btnRemove.addEventListener('click', removeMember, false);

  return btnRemove;
};

// Add tier
//==============================
var addTier = function addTier(tier) {
  var wrapper = document.createElement('div');

  wrapper.className = 'tier-wrapper';

  for (var _i3 = 0; _i3 < 4; _i3++) {
    var elm = document.createElement('span');

    elm.className = 'tier';

    if (_i3 < tier) {
      elm.className += ' fill';
    }

    wrapper.appendChild(elm);
  }

  return wrapper;
};

// Table builder
//==============================
var createTable = function createTable(data) {
  var row = void 0;
  var col = void 0;

  var table = document.createElement('table');

  var addRow = function addRow(colnode) {
    var row = document.createElement('tr');

    for (var _i4 = 0; _i4 < colnode.length; _i4++) {
      row.appendChild(colnode[_i4]);
    }

    return row;
  };

  var addId = function addId(id) {
    var span = document.createElement('span');

    span.id = id;

    return span;
  };

  var addCol = function addCol(data, property) {
    var col = document.createElement('td');

    if (data === '') {
      data = '&nbsp;';
    }

    col.innerHTML = data;

    if (property) {
      if (property.colspan) {
        col.setAttribute('colspan', property.colspan);
      }

      if (property.id) {
        col.appendChild(addId(property.id));
      }

      if (property.className) {
        col.className = property.className;
      }
    }

    return col;
  };

  var addStar = function addStar(num) {
    var col = document.createElement('td');

    col.setAttribute('colspan', 2);
    col.className = 'text-center';

    if (num === 6) {
      col.className += ' clr-amber';
    }

    for (var _i5 = 0; _i5 < num; _i5++) {
      var _star = document.createElement('i');

      _star.className = 'icon icon-star';

      col.appendChild(_star);
    }

    return col;
  };

  table.appendChild(addRow([addCol(data.name, {
    colspan: 2,
    className: 'text-center name'
  })]));

  table.appendChild(addRow([addStar(data.star)]));

  table.appendChild(addRow([addCol('lvl', { className: 'text-right clr-lightyellow' }), addCol(data.lvl + ' <i class="icon icon-right-open"></i> ', { id: 'lvl-' + data.idx, className: 'clr-success' })]));

  table.appendChild(addRow([addCol('xp', { className: 'text-right clr-lightyellow' }), addCol(null, { id: 'xp-' + data.idx })]));

  table.appendChild(addRow([addCol('xp gain', { className: 'text-right clr-lightyellow' }), addCol(null, { id: 'xp-gain-' + data.idx })]));

  table.appendChild(addRow([addCol('renown', { className: 'text-right clr-lightyellow' }), addCol(null, { id: 'renown-' + data.idx, className: 'clr-amber' })]));

  return table;
};

// Remove member
//==============================
var removeMember = function removeMember(evt) {
  var idx = evt.target.idx;
  var node = campNodes[idx];

  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  countMember--;
  campMember[idx] = null;

  calculate();
};

// Get XP gain per member
//==============================
var getXpPerMember = function getXpPerMember() {
  return parseInt(xpFromScav / countMember, 10);
};

// Get remaning XP chart
//==============================
var getRemainingXpChart = function getRemainingXpChart(idx) {
  var xpSet = Xp['s' + campMember[idx].star]['t' + campMember[idx].tier];
  var remainingXp = xpSet.slice(campMember[idx].lvl - 1);

  return remainingXp;
};

// Get Renown point
//==============================
var getRenownPoint = function getRenownPoint(idx, lvl) {
  var renown = Renown['s' + campMember[idx].star][campMember[idx].tier - 1];

  return renown * lvl;
};

// Set result
//==============================
var setResult = function setResult(idx, data) {
  var elemLvlGain = document.getElementById('lvl-' + idx);
  var elemXp = document.getElementById('xp-' + idx);
  var elemXpGain = document.getElementById('xp-gain-' + idx);
  var elemRenown = document.getElementById('renown-' + idx);

  elemLvlGain.innerHTML = campMember[idx].lvl + data.lvlGain;

  elemXp.innerHTML = data.xp.toLocaleString();
  if (data.xp === 'max!') {
    elemXp.className = 'max';
  } else {
    elemXp.className = '';
  }

  elemXpGain.innerHTML = data.xpGain.toLocaleString();
  elemRenown.innerHTML = getRenownPoint(idx, data.lvlGain).toLocaleString();
};

// Set total
//==============================
var setTotal = function setTotal(totalRenown) {
  var elemTotal = document.getElementById('total');

  elemTotal.innerHTML = totalRenown.toLocaleString();
};

// Set Summary
//==============================
var totalRenown = 0;

var setSummary = function setSummary(renown) {
  totalRenown += renown;
};

// Set max level
//==============================
var setMaxLevel = function setMaxLevel() {
  maxLvl = MaxLevel['s' + star]['t' + tier];

  eInputLvl.setAttribute('max', maxLvl);

  if (eLblLvl.value > maxLvl) {
    eLblLvl.value = lvl = maxLvl;
  }
};

// Calculate
//==============================
var calculate = function calculate() {

  // Get xp gain per member
  xpPerMember = getXpPerMember();

  // Reset total renown
  totalRenown = 0;

  for (var _i6 = 0; _i6 <= 4; _i6++) {

    // If member not null
    if (campMember[_i6]) {
      var data = calculateMember(_i6);

      // Report data
      setResult(_i6, data);
      totalRenown += getRenownPoint(_i6, data.lvlGain);
    }
  }

  setTotal(totalRenown);
};

// Calculate member gain lv, xp
//==============================
var calculateMember = function calculateMember(idx) {

  // Get xp remaing Array by current level
  var remainingXpChart = getRemainingXpChart(idx);

  var xpGain = 0;
  var lvlGain = 0;
  var xp = 0;

  if (remainingXpChart.length) {

    // Set current xp member
    remainingXpChart[0] = remainingXpChart[0] - campMember[idx].xp;

    for (var _i7 = 0; _i7 < remainingXpChart.length; _i7++) {
      xpGain += remainingXpChart[_i7];

      if (xpGain > xpPerMember) {
        lvlGain = _i7;
        xp = xpPerMember + remainingXpChart[_i7] - xpGain;
        xpGain = xpPerMember;

        break;
      }

      lvlGain = _i7 + 1;
      xp = 'max!';
    }
  } else {
    xp = 'max!';
  }

  return { lvlGain: lvlGain, xp: xp, xpGain: xpGain };
};

// Events
//==============================
btnAddtoCamp.onclick = function () {
  if (countMember === 5) {
    return false;
  }

  addToCamp({ name: name, star: star, tier: tier, lvl: lvl, xp: xp });
};