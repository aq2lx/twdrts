'use strict';

var countMember = 2;

// Elements
var btnAddtoCamp = document.getElementById('btn-addtocamp');
var camp = document.getElementById('camp');
var campNodes = camp.getElementsByTagName('li');

// Add to camp
var addToCamp = function addToCamp(data) {
  var idx = void 0;

  // Check empty nodes
  for (var i = 0; i < 5; i++) {
    if (!campNodes[i].hasChildNodes()) {
      idx = i;

      break;
    }
  }

  // Create element
  var newMember = document.createElement('div');

  // Append child
  newMember.appendChild(addBtnRemove(idx));

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

  addToCamp();
};