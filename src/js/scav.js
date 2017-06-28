let name = ''
let star = 5
let tier = 4
let lvl = 1
let xp = 0
let countMember = 2

// Elements
const eName = document.getElementById('ipt-name')

const eLblLvl = document.getElementById('lbl-lvl')
const eInputLvl = document.getElementById('range-lvl')

const eGroupStar = document.getElementById('g-star')
const eGroupTier = document.getElementById('g-tier')
const eBtnStar = eGroupStar.getElementsByTagName('button')
const eBtnTier = eGroupTier.getElementsByTagName('button')

const btnAddtoCamp = document.getElementById('btn-addtocamp')
const camp = document.getElementById('camp')
const campNodes = camp.getElementsByTagName('li')

const eXP = document.getElementById('ipt-xp')

// Input Change
eName.onchange = function() {
  name = this.value
}

// Input XP
eXP.onclick = function() {
  this.select()
}

eXP.onkeyup = function() {
  xp = parseInt(this.value, 10)
}

// Input Level
eInputLvl.oninput = function () {
  eLblLvl.innerHTML = lvl = parseInt(this.value)
}

// Input Star
for (let i = 0; i < eBtnStar.length; i++) {
  eBtnStar[i].onclick = function() {
    for (let j = 0; j < eBtnStar.length; j++) {
      eBtnStar[j].classList.remove('active')
    }

    this.classList.add('active')
    star = parseInt(this.dataset.value, 10)

    setMaxLevel()
  }
}

// Input Tier
for (let i = 0; i < eBtnTier.length; i++) { 
  eBtnTier[i].onclick = function() {
    for (let j = 0; j < eBtnTier.length; j++) {
      eBtnTier[j].classList.remove('active')
    }

    this.classList.add('active')
    tier = parseInt(this.dataset.value, 10)

    setMaxLevel()
  }
}

// Set max level
const setMaxLevel = function () {
  const maxLvl = MaxLevel[`s${star}`][`t${tier}`]

  eInputLvl.setAttribute('max', maxLvl)
  eInputLvl.value = eLblLvl.innerHTML = lvl = 1
}

// Add to camp
const addToCamp = function (data) {
  console.log(data)

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
  newMember.appendChild(addTier(data.tier))

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

const addTier = function (tier) {
  const wrapper = document.createElement('div')

  wrapper.className = 'tier-wrapper'

  for (let i = 0; i < tier; i++) {
    const tier = document.createElement('span')

    tier.className = 'tier'

    wrapper.appendChild(tier)
  }

  return wrapper
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

  addToCamp({
    name: name,
    star: star,
    tier: tier,
    lvl: lvl,
    xp: xp
  })
}
