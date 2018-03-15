// Varible
//==============================
const campMember = []

let xpFromScav = 100000
let name = ''
let star = 6
let tier = 1
let lvl = 1
let xp = 0
let countMember = 0
let xpPerMember = 0
let maxLvl = MaxLevel[`s${star}`][`t${tier}`]

// Elements
//==============================
const eScavType = document.querySelectorAll('input[name="scav-type"]')
const eChkBonus = document.getElementById('chk-bonus')
const eSBonus = document.getElementById('s-bonus')
const eName = document.getElementById('ipt-name')

const eLblLvl = document.getElementById('lbl-lvl')
const eInputLvl = document.getElementById('range-lvl')

const eGroupStar = document.getElementById('g-star')
const eGroupTier = document.getElementById('g-tier')
const eBtnStar = eGroupStar.getElementsByTagName('button')
const eBtnTier = eGroupTier.getElementsByTagName('button')
const eXP = document.getElementById('ipt-xp')

const btnAddtoCamp = document.getElementById('btn-addtocamp')
const camp = document.getElementById('camp')
const campNodes = camp.getElementsByTagName('li')

// Input Change
//==============================
eName.onchange = function() {
  name = this.value
}

eName.onclick = function() {
  this.select()
}

// Input XP
//==============================
eXP.oninput = function() {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4)
  }
}

eXP.onclick = function() {
  this.select()
}

eXP.onkeyup = function() {
  xp = parseInt(this.value || 0, 10)
}

// Input Level
//==============================
eInputLvl.oninput = function () {
  eLblLvl.value = lvl = parseInt(this.value)
}

eLblLvl.onclick = function () {
  this.select()
}

eLblLvl.onkeyup = function () {
  if (this.value > maxLvl) {
    eLblLvl.value = maxLvl
  }

  eInputLvl.value = lvl = parseInt(this.value || 1, 0)
}

// Input Star
//==============================
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
//==============================
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

// Add to camp
//==============================
const addToCamp = (data) => {
  let idx

  // Check empty nodes
  for (let i = 0; i < 5; i++) {
    if (!campNodes[i].hasChildNodes()) {
      idx = i

      break
    }
  }

  data.idx = idx
  campMember[idx] = data

  // Create element
  const newMember = document.createElement('div')
  newMember.className = 'fill'

  // Append child
  newMember.appendChild(addBtnRemove(idx))
  newMember.appendChild(addTier(data.tier))
  newMember.appendChild(createTable(data))
  newMember.appendChild(addLblArrow(idx))

  campNodes[idx].appendChild(newMember)

  countMember++

  calculate()
}

// Add element
//==============================
const addBtnRemove = (idx) => {
  const btnRemove = document.createElement('span')

  btnRemove.className = 'close'
  btnRemove.innerHTML = '&times;'
  btnRemove.idx = idx

  // Add events
  btnRemove.addEventListener('click', removeMember, false)

  return btnRemove;
}

const addLblArrow = (idx) => {
  const lblArrow = document.createElement('span')

  lblArrow.className = 'lbl-arrow'
  lblArrow.innerHTML = '<i class="icon icon-right-open"></i>'

  return lblArrow;
}

// Add tier
//==============================
const addTier = (tier) => {
  const wrapper = document.createElement('div')

  wrapper.className = 'tier-wrapper'

  for (let i = 0; i < 4; i++) {
    const elm = document.createElement('span')

    elm.className = 'tier'

    if (i < tier) {
      elm.className += ' fill'
    }

    wrapper.appendChild(elm)
  }

  return wrapper
}

// Table builder
//==============================
const createTable = (data) => {
  let row
  let col

  const table = document.createElement('table')

  const addRow = (colnode) => {
    const row = document.createElement('tr')

    for (let i = 0; i < colnode.length; i++) {
      row.appendChild(colnode[i])
    }

    return row
  }

  const addId = (id) => {
    const span = document.createElement('span')

    span.id = id

    return span
  }

  const addCol = (data, property) => {
    const col = document.createElement('td')

    if (data === '') { data = '&nbsp;' }

    col.innerHTML = data

    if (property) {
      if (property.colspan) {
        col.setAttribute('colspan', property.colspan)
      }

      if (property.rowspan) {
        col.setAttribute('rowspan', property.rowspan)
      }

      if (property.id) {
        col.appendChild(addId(property.id))
      }

      if (property.className) {
        col.className = property.className
      }
    }

    return col
  }

  const addStar = (num) => {
    const col = document.createElement('td')

    col.setAttribute('colspan', 2)
    col.className = 'text-center'

    if (num === 6) {
      col.className += ' clr-amber'
    }

    for (let i = 0; i < num; i++) {
      const star = document.createElement('i')

      star.className = 'icon icon-star'

      col.appendChild(star)
    }

    return col
  }

  table.appendChild(addRow([
    addCol(data.name, {
      colspan: 2,
      className: 'text-center name'
    })
  ]))

  table.appendChild(addRow([addStar(data.star)]))

  table.appendChild(addRow([
    addCol(`${data.lvl}`, { className: 'text-right nw'}),
    addCol(null, { id: `lvl-${data.idx}`, className: 'clr-success ne' })
  ]))

  table.appendChild(addRow([
    addCol(`${data.xp}`, { className: 'text-right sw' }),
    addCol(null, { id: `xp-to-${data.idx}`, className: 'clr-success se' })
  ]))

  table.appendChild(addRow([
    addCol('xp gain', { className: 'text-right clr-lightyellow' }),
    addCol(null, { id: `xp-gain-${data.idx}` })
  ]))

  table.appendChild(addRow([
    addCol('renown', { className: 'text-right clr-lightyellow' }),
    addCol(null, { id: `renown-${data.idx}`, className: 'clr-amber' })
  ]))

  return table
}

// Remove member
//==============================
const removeMember = (evt) => {
  const idx = evt.target.idx
  const node = campNodes[idx]

  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }

  countMember--
  campMember[idx] = null

  calculate()
}

// Get XP gain per member
//==============================
const getXpPerMember = () => {
  return parseInt(xpFromScav / countMember, 10)
}

// Get remaning XP chart
//==============================
const getRemainingXpChart = (idx) => {
  const xpSet = Xp[`s${campMember[idx].star}`][`t${campMember[idx].tier}`]
  const remainingXp = xpSet.slice(campMember[idx].lvl - 1)

  return remainingXp
}

// Get Renown point
//==============================
const getRenownPoint = (idx, lvl) => {
  const renown = Renown[`s${campMember[idx].star}`][campMember[idx].tier - 1]

  return renown * lvl
}

// Set result
//==============================
const setResult = (idx, data) => {
  const elemLvlGain = document.getElementById(`lvl-${idx}`)
  const elemXpTo = document.getElementById(`xp-to-${idx}`)
  const elemXpGain = document.getElementById(`xp-gain-${idx}`)
  const elemRenown = document.getElementById(`renown-${idx}`)

  elemLvlGain.innerHTML = campMember[idx].lvl + data.lvlGain

  elemXpTo.innerHTML = data.xp.toLocaleString()
  if (data.xp === 'max!') {
    elemXpTo.className = 'max'
  } else {
    elemXpTo.className = ''
  }

  elemXpGain.innerHTML = data.xpGain.toLocaleString()
  elemRenown.innerHTML = getRenownPoint(idx, data.lvlGain).toLocaleString()
}

// Set total
//==============================
const setTotal = (totalRenown) => {
  const elemTotal = document.getElementById('total')

  elemTotal.innerHTML = totalRenown.toLocaleString()
}

// Set Summary
//==============================
let totalRenown = 0

const setSummary = (renown) => {
  totalRenown += renown
}

// Set max level
//==============================
const setMaxLevel = () => {
  maxLvl = MaxLevel[`s${star}`][`t${tier}`]

  eInputLvl.setAttribute('max', maxLvl)

  if (eLblLvl.value > maxLvl) {
    eLblLvl.value = lvl = maxLvl
  }
}

// Calculate
//==============================
const calculate = () => {

  // Get xp gain per member
  xpPerMember = getXpPerMember()

  // Reset total renown
  totalRenown = 0

  for (let i = 0; i <= 4; i++) {

    // If member not null
    if (campMember[i]) {
      const data = calculateMember(i)

      // Report data
      setResult(i, data)
      totalRenown += getRenownPoint(i, data.lvlGain)
    }
  }

  setTotal(totalRenown)
}

// Calculate member gain lv, xp
//==============================
const calculateMember = (idx) => {

  // Get xp remaining Array by current level
  const remainingXpChart = getRemainingXpChart(idx)

  let xpGain = 0
  let lvlGain = 0
  let xp = 0

  if (remainingXpChart.length) {

    // Set current xp member
    if (campMember[idx].xp > remainingXpChart[0]) {
      campMember[idx].xp = remainingXpChart[0]
    }

    remainingXpChart[0] = remainingXpChart[0] - campMember[idx].xp

    for (let i = 0; i < remainingXpChart.length; i++) {
      xpGain += remainingXpChart[i]

      if (xpGain > xpPerMember) {
        lvlGain = i
        xp = xpPerMember + remainingXpChart[i] - xpGain
        xpGain = xpPerMember

        break
      }

      lvlGain = i + 1
      xp = 'max!'
    }
  } else {
    xp = 'max!'
  }

  return { lvlGain, xp, xpGain }
}

// Events
//==============================
const getXPFromScavBonus = () => {
  if (eSBonus.checked) {
    return 90000
  } else {
    return 60000
  }
}

eScavType.forEach(function(elem) {
  elem.onchange = function() {
    if (this.value === 'bnm') {
      eChkBonus.classList.remove('disabled')
      xpFromScav = getXPFromScavBonus()
    } else {
      eChkBonus.classList.add('disabled')
      xpFromScav = 100000
    }

    if (countMember) {
      calculate()
    }
  }
})

eSBonus.onchange = function() {
  xpFromScav = getXPFromScavBonus()

  if (countMember) {
    calculate()
  }
}

campNodes.forEach(function(elem) {
  console.log(elem)
  elem.onclick = function() {
    console.log(1)
  }
})

btnAddtoCamp.onclick = function() {
  if (countMember === 5) {
    return false
  }

  addToCamp({ name, star, tier, lvl, xp })
}
