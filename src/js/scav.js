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
  newMember.className = 'fill'

  // Append child
  newMember.appendChild(addBtnRemove(idx))
  newMember.appendChild(addTier(data.tier))
  newMember.appendChild(createTable(data))

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

// Table
const createTable = function (data) {
  let row
  let col

  const table = document.createElement('table')

  const addRow = function (colnode) {
    const row = document.createElement('tr')

    for (let i = 0; i < colnode.length; i++) {
      row.appendChild(colnode[i])
    }

    return row
  }

  const addCol = function (data, className, colspan) {
    const col = document.createElement('td')

    if (colspan) {
      col.setAttribute('colspan', colspan)
    }

    if (className) {
      col.className = className
    }

    if (data === null || data === '') {
      data = '&nbsp;'
    }

    col.innerHTML = data

    return col
  }

  const addStar = function (num) {
    const col = document.createElement('td')

    col.setAttribute('colspan', 2)
    col.className = 'text-center'

    for (let i = 0; i < num; i++) {
      const star = document.createElement('i')

      star.className = 'fa fa-star'

      col.appendChild(star)
    }

    return col
  }

  table.appendChild(addRow([addCol(data.name, 'text-center', 2)]))
  table.appendChild(addRow([addStar(data.star)]))
  table.appendChild(addRow([addCol('lvl', 'text-right'), addCol(`${data.lvl} > `)]))
  table.appendChild(addRow([addCol('xp', 'text-right'), addCol(data.xp)]))
  table.appendChild(addRow([addCol('xp gain', 'text-right'), addCol('25,000')]))
  table.appendChild(addRow([addCol('renown', 'text-right'), addCol('1,200')]))

  return table
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
