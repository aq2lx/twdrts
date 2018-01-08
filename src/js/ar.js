// Varible
const apAtttack = 20

// Report
const reportArRound = (idx, ap, aprcv) => {
  const eleApRound = document.getElementById(`r${idx}`)
  const eleApFSWRound = document.getElementById(`rs${idx}`)
  const inputAp = getInputAp(idx)

  let r = 0
  let sap = 0

  while (sap < inputAp) {
    sap += ap
    r++
  }

  if (aprcv) {
    let rs = 0

    while (aprcv < inputAp) {
      aprcv += ap
      rs++
    }

    eleApFSWRound.innerHTML = `${rs}`
    eleApRound.innerHTML = ` (${r})`
  } else {
    eleApFSWRound.innerHTML = ''
    eleApRound.innerHTML = r
  }

  
}

const reportApPerTurn = (idx, ap, aprcv) => {
  const eleApPerTurn = document.getElementById(`apt${idx}`)

  if (aprcv) {
    eleApPerTurn.innerHTML = ap + aprcv
  } else {
    eleApPerTurn.innerHTML = ap
  }
}

const reportApReceived = (idx, aprcv) => {
  const eleApFromSpecialWeapon = document.getElementById(`sap${idx}`)

  if (aprcv) {
    eleApFromSpecialWeapon.innerHTML = `(+ ${aprcv})`
  } else {
    eleApFromSpecialWeapon.innerHTML = ''
  }
}

const report = (idx, ap, aprcv) => {
  reportArRound(idx, ap, aprcv)
  reportApPerTurn(idx, ap, aprcv)
  reportApReceived(idx, aprcv)
}

//Calculate
const calculateAp = (idx) => {
  report(idx, calculateNode(idx), getApReceived(idx, 15) + getApReceived(idx, 20) + getApReceived(idx, 40) + getApReceived(idx, 50) + getApSpecialFast(idx) + getApSpecialTough(idx))
}

const calculateNode = (idx) => {
  return (apAtttack + getApFromLeader(idx) + getApWeapon(idx)) * getMethod()
}

const calculateAll = () => {
  for (let i = 0; i <= 4; i++) {
    calculateAp(i)
  }
}

// Get
const getMethod = () => {
  const method = parseFloat(document.querySelector('input[name="method"]:checked').value)

  return method
}

const getApFromLeader = (idx) => {
  let typeToon
  let apFromLeader = 0

  const traitToon = document.getElementById(`t${idx}`).value
  const leader = document.querySelector('input[name="leader"]:checked').value

  if (traitToon === 'fast' || traitToon === 'strong') {
    typeToon = 'melee'
  } else if (traitToon === 'alert' || traitToon === 'tough') {
    typeToon = 'ranged'
  } else {
    typeToon = undefined
  }

  if (leader === 'all' || traitToon === leader || typeToon === leader) {
    apFromLeader = parseFloat(document.querySelector('input[name="leader-ap"]:checked').value)
  }

  return apFromLeader
}

const getApWeapon = (idx) => {
  const apWeapon = parseFloat(document.getElementById(`w${idx}`).value)

  return apWeapon
}

const getInputAp = (idx) => {
  const inputAp = document.getElementById(`ipt-ap${idx}`).value || 0

  return parseInt(inputAp, 10)
}

const getApSpecialFast = (idx) => {
  let apSpecialPercent = 0
  let apSpecialPoint = 0

  const eSpecials = document.querySelectorAll('input[name="special-apf"]:checked')
  const inputAp = getInputAp(idx)

  for (let i = 0; i < eSpecials.length; i++) {
    apSpecialPercent += parseInt(eSpecials[i].value, 10)
  }

  apSpecialPoint = Math.ceil(((inputAp * apSpecialPercent) / 100))

  return apSpecialPoint
}

const getApSpecialTough = (idx) => {
  let apSpecialPoint = 0

  const eSpecial = document.getElementById(`chk-art${idx}`)
  const inputAp = getInputAp(idx)

  if (eSpecial.checked) {
    apSpecialPoint = Math.ceil(((inputAp * parseInt(eSpecial.value, 10)) / 100))
  }

  return apSpecialPoint
}

const getApReceived = (idx, percent) => {
  let apReceived = 0

  const eReceived = document.getElementById(`chk-apr${percent}-${idx}`)
  const inputAp = getInputAp(idx)

  if (eReceived.checked) {
    apReceived = Math.ceil(((inputAp * parseInt(percent, 10)) / 100))
  }

  return apReceived
}

// Elements
const eMethods = document.querySelectorAll('input[name="method"]')
const eLeaders = document.querySelectorAll('input[name="leader"]')
const eLeaderAPs = document.querySelectorAll('input[name="leader-ap"]')
const eWeaponAPs = document.querySelectorAll('select[name="weapon-ap"]')
const eSpecialAPfs = document.querySelectorAll('input[name="special-apf"]')
const eSpecialAPts = document.querySelectorAll('input[name="special-apt"]')
const eReceived15 = document.querySelectorAll('input[name="apr15"]')
const eReceived20 = document.querySelectorAll('input[name="apr20"]')
const eReceived40 = document.querySelectorAll('input[name="apr40"]')
const eReceived50 = document.querySelectorAll('input[name="apr50"]')
const eSelectTraits = document.querySelectorAll('select[name="triat"]')
const eInputAPs = document.querySelectorAll('input[name="input-ap"]')

// Events
Array.prototype.slice.call(eMethods).concat(Array.prototype.slice.call(eLeaders), Array.prototype.slice.call(eLeaderAPs), Array.prototype.slice.call(eSpecialAPfs)).forEach(function(elem) {
  elem.onchange = function() {
    calculateAll()
  }
})

for (let i = 0; i < eSelectTraits.length; i++) { 
  eSelectTraits[i].onchange = function() {
    const elSpecialApFast = document.getElementById(`spf${i}`)
    const elSpecialApTough = document.getElementById(`spt${i}`)
    const chkSpecialFast = document.getElementById(`chk-arf${i}`)
    const chkSpecialTough = document.getElementById(`chk-art${i}`)

    chkSpecialFast.checked = false
    chkSpecialTough.checked = false

    const fx = {
      fast() {
        elSpecialApFast.classList.remove('hide')
        elSpecialApTough.classList.add('hide')
      },

      strong() {
        elSpecialApFast.classList.add('hide')
        elSpecialApTough.classList.add('hide')
      },

      alert() {
        elSpecialApFast.classList.add('hide')
        elSpecialApTough.classList.add('hide')
      },

      tough() {
        elSpecialApFast.classList.add('hide')
        elSpecialApTough.classList.remove('hide')
      }
    }

    fx[this.value]()

    calculateAll()
  }
}

for (let i = 0; i < eWeaponAPs.length; i++) { 
  eWeaponAPs[i].onchange = function() {
    calculateAp(i)
  }
}

for (let i = 0; i < eInputAPs.length; i++) {
  eInputAPs[i].oninput = function() {
    if (this.value.length > 3) {
      this.value = this.value.slice(0, 3)
    }
  }

  eInputAPs[i].onclick = function() {
    this.select()
  }

  eInputAPs[i].onkeyup = function() {
    calculateAp(i)
  }
}

for (let i = 0; i < eSpecialAPts.length; i++) { 
  eSpecialAPts[i].onchange = function() {
    calculateAp(i)
  }
}

for (let i = 0; i < eReceived15.length; i++) { 
  eReceived15[i].onchange = function() {
    calculateAp(i)
  }
}

for (let i = 0; i < eReceived20.length; i++) { 
  eReceived20[i].onchange = function() {
    calculateAp(i)
  }
}

for (let i = 0; i < eReceived40.length; i++) { 
  eReceived40[i].onchange = function() {
    calculateAp(i)
  }
}

for (let i = 0; i < eReceived40.length; i++) { 
  eReceived50[i].onchange = function() {
    calculateAp(i)
  }
}

// Initialize
calculateAll()
