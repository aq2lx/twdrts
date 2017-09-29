'use strict';

// Varible
var campMember = [];
var xpFromScav = 25000;

var name = '';
var star = 5;
var tier = 4;
var lvl = 1;
var xp = 0;
var countMember = 0;
var xpPerMember = 0;
var totalRenown = 0;

var getXpPerMember = function getXpPerMember() {
  return parseInt(xpFromScav / countMember, 10);
};

// Elements
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
eName.onchange = function () {
  name = this.value;
};

// Input XP
eXP.onclick = function () {
  this.select();
};

eXP.onkeyup = function () {
  xp = parseInt(this.value, 10);
};

// Input Level
eInputLvl.oninput = function () {
  eLblLvl.innerHTML = lvl = parseInt(this.value);
};

// Input Star
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

// Set max level
var setMaxLevel = function setMaxLevel() {
  var maxLvl = MaxLevel['s' + star]['t' + tier];

  eInputLvl.setAttribute('max', maxLvl);
  eInputLvl.value = eLblLvl.innerHTML = lvl = 1;
};

// Add to camp
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
var addBtnRemove = function addBtnRemove(idx) {
  var btnRemove = document.createElement('span');

  btnRemove.className = 'close';
  btnRemove.innerHTML = '&times;';
  btnRemove.idx = idx;

  // Add events
  btnRemove.addEventListener('click', removeMember, false);

  return btnRemove;
};

var addTier = function addTier(tier) {
  var wrapper = document.createElement('div');

  wrapper.className = 'tier-wrapper';

  for (var _i3 = 0; _i3 < tier; _i3++) {
    var _tier = document.createElement('span');

    _tier.className = 'tier';

    wrapper.appendChild(_tier);
  }

  return wrapper;
};

// Table
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

    for (var _i5 = 0; _i5 < num; _i5++) {
      var _star = document.createElement('i');

      _star.className = 'fa fa-star';

      col.appendChild(_star);
    }

    return col;
  };

  table.appendChild(addRow([addCol(data.name, {
    colspan: 2,
    className: 'text-center'
  })]));

  table.appendChild(addRow([addStar(data.star)]));

  table.appendChild(addRow([addCol('lvl', {
    className: 'text-right'
  }), addCol(data.lvl + ' > ', {
    id: 'lvl-' + data.idx
  })]));

  table.appendChild(addRow([addCol('xp', {
    className: 'text-right'
  }), addCol(data.xp)]));

  table.appendChild(addRow([addCol('xp gain', {
    className: 'text-right'
  }), addCol(null, {
    id: 'xp-gain-' + data.idx
  })]));

  table.appendChild(addRow([addCol('renown', {
    className: 'text-right'
  }), addCol(null, {
    id: 'renown-' + data.idx
  })]));

  return table;
};

// Remove member
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

var getRemainingXpChart = function getRemainingXpChart(idx) {
  var xpSet = Xp['s' + campMember[idx].star]['t' + campMember[idx].tier];
  var remainingXp = xpSet.slice(campMember[idx].lvl - 1);

  return remainingXp;
};

// Calculate
var calculate = function calculate() {
  xpPerMember = getXpPerMember();

  for (var _i6 = 0; _i6 <= 4; _i6++) {
    if (campMember[_i6]) {
      calculateMember(_i6);
    }
  }
  /*  const xpSet = Xp[`s${campMember[0].star}`][`t${campMember[0].tier}`]
    const lv = campMember[0].lvl
  
    console.log(campMember, getXpPerMember(), xpSet, lv)*/
};

var calculateMember = function calculateMember(idx) {
  var remainingXpChart = getRemainingXpChart(idx);

  // console.log(xpPerMember, remainingXp, campMember[idx].xp)

  if (remainingXpChart.length) {
    var sum = 0;
    var lvlGain = 0;
    var _xp = 0;

    for (var _i7 = 0; _i7 < remainingXpChart.length; _i7++) {
      sum += remainingXpChart[_i7];

      // console.log(xpPerMember)

      if (sum > xpPerMember) {
        lvlGain = _i7;
        _xp = xpPerMember + remainingXpChart[_i7] - sum;

        break;
      }
    }

    setResult(idx, { lvlGain: lvlGain, xp: _xp });
  }

  /*    const xpSet = Xp[`s${campMember[idx].star}`][`t${campMember[idx].tier}`]
      console.log('b', xpSet)
  
      xpSet.splice(0, campMember[idx].lvl -1)
  
      console.log('a', xpSet, campMember[idx].lvl, campMember[idx].xp)*/
  //xpSet
};

// Get Renown point
var getRenownPoint = function getRenownPoint(idx, lvl) {
  var renown = Renown['s' + campMember[idx].star][campMember[idx].tier - 1];

  return renown * lvl;
};

// Set result
var setResult = function setResult(idx, data) {
  var elemLvlGain = document.getElementById('lvl-' + idx);
  var elemXpGain = document.getElementById('xp-gain-' + idx);
  var elemRenown = document.getElementById('renown-' + idx);

  elemLvlGain.innerHTML = data.lvlGain;
  elemXpGain.innerHTML = xpPerMember.toLocaleString();
  elemRenown.innerHTML = getRenownPoint(idx, data.lvlGain).toLocaleString();

  console.log(elemLvlGain, data);
};

// Events
btnAddtoCamp.onclick = function () {
  if (countMember === 5) {
    return false;
  }

  addToCamp({ name: name, star: star, tier: tier, lvl: lvl, xp: xp });
};