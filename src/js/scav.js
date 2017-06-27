let countMember = 2

// Elements
const btnAddtoCamp = document.getElementById('btn-addtocamp')
const camp = document.getElementById('camp')
const campNodes = camp.getElementsByTagName('li')

// Add to camp
const addToCamp = function (data) {
  let idx

  // Check empty nodes
  for (let i = 0; i < 5; i++) {
    if (!campNodes[i].hasChildNodes()) {
      idx = i

      break;
    }
  }

  // Create element
  const newMember = document.createElement('div')

  // Append child
  newMember.appendChild(addBtnRemove(idx))
  
  campNodes[idx].appendChild(newMember)

  countMember++
}

// Add element
const addBtnRemove = function (idx) {
  const btnRemove = document.createElement('span')

  btnRemove.className = 'close'
  btnRemove.innerHTML = '&times;'
  btnRemove.idx = idx

  // Add events
  btnRemove.addEventListener('click', removeMember, false)

  return btnRemove;
}

// Remove member
const removeMember = function (evt) {
  const node = campNodes[evt.target.idx]

  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }

  countMember--
}

// Events
btnAddtoCamp.onclick = function() {
  if (countMember === 5) {
    return false
  }

  addToCamp()
}
