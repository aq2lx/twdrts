// Config
//==============================
const xpFromScav = 100000

// Varible
const campMember = []

let name = ''
let star = 5
let tier = 4
let lvl = 1
let xp = 0
let countMember = 0
let xpPerMember = 0

// Elements
//==============================
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
//==============================
eName.onchange = function() {
  name = this.value
}

// Input XP
//==============================
eXP.onclick = function() {
  this.select()
}

eXP.onkeyup = function() {
  xp = parseInt(this.value || 0, 10)
}

// Input Level
//==============================
eInputLvl.oninput = function () {
  eLblLvl.innerHTML = lvl = parseInt(this.value)
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

// Add tier
//==============================
const addTier = (tier) => {
  const wrapper = document.createElement('div')

  wrapper.className = 'tier-wrapper'

  for (let i = 0; i < tier; i++) {
    const tier = document.createElement('span')

    tier.className = 'tier'

    wrapper.appendChild(tier)
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

      star.className = 'fa fa-star'

      col.appendChild(star)
    }

    return col
  }

  table.appendChild(addRow([
    addCol(data.name, {
      colspan: 2,
      className: 'text-center'
    })
  ]))

  table.appendChild(addRow([addStar(data.star)]))

  table.appendChild(addRow([
    addCol('lvl', { className: 'text-right' }),
    addCol(`${data.lvl} > `, { id: `lvl-${data.idx}`, className: 'clr-success' })
  ]))

  /*table.appendChild(addRow([
    addCol('xp', { className: 'text-right' }),
    addCol(data.xp)
  ]))*/

  table.appendChild(addRow([
    addCol('xp gain', { className: 'text-right' }),
    addCol(null, { id: `xp-gain-${data.idx}` })
  ]))

  table.appendChild(addRow([
    addCol('renown', { className: 'text-right' }),
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
  const elemXpGain = document.getElementById(`xp-gain-${idx}`)
  const elemRenown = document.getElementById(`renown-${idx}`)

  elemLvlGain.innerHTML = campMember[idx].lvl + data.lvlGain
  elemXpGain.innerHTML = xpPerMember.toLocaleString()
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
  const maxLvl = MaxLevel[`s${star}`][`t${tier}`]

  eInputLvl.setAttribute('max', maxLvl)
  eInputLvl.value = eLblLvl.innerHTML = lvl = 1
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

  // Get xp remaing Array by current level
  const remainingXpChart = getRemainingXpChart(idx)

  let xpGain = 0
  let lvlGain = 0
  let xp = 0

  if (remainingXpChart.length) {

    // Set current xp member
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
      xp = 'max'
    }
  }

  return { lvlGain, xp, xpGain }
}

// Events
//==============================
btnAddtoCamp.onclick = function() {
  if (countMember === 5) {
    return false
  }

  addToCamp({ name, star, tier, lvl, xp })
}
