'use strict';

var name = '';
var star = 5;
var tier = 4;
var lvl = 1;
var xp = 0;
var countMember = 2;

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
  console.log(data);

  var idx = void 0;

  // Check empty nodes
  for (var _i2 = 0; _i2 < 5; _i2++) {
    if (!campNodes[_i2].hasChildNodes()) {
      idx = _i2;

      break;
    }
  }

  // Create element
  var newMember = document.createElement('div');

  // Append child
  newMember.appendChild(addBtnRemove(idx));
  newMember.appendChild(addTier(data.tier));

  campNodes[idx].appendChild(newMember);

  countMember++;
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

// Remove member
var removeMember = function removeMember(evt) {
  var node = campNodes[evt.target.idx];

  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  countMember--;
};

// Events
btnAddtoCamp.onclick = function () {
  if (countMember === 5) {
    return false;
  }

  addToCamp({
    name: name,
    star: star,
    tier: tier,
    lvl: lvl,
    xp: xp
  });
};