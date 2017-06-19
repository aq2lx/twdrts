// Varible
const apAtttack = 20
const apPerTurn = [0, 0, 0, 0, 0]

// Report
const reportArRound = function (idx, val) {
  const eleApRound = document.getElementById('r' + idx)
  const inputAp = parseInt(document.getElementById('ipt-ap' + idx).value, 10)

  eleApRound.innerHTML = Math.ceil(inputAp / val)
}

const reportApPerTurn = function (idx, val) {
  const eleApPerTurn = document.getElementById('apt' + idx)

  eleApPerTurn.innerHTML = val
}

const report = function (idx, val) {
  reportArRound(idx, val)
  reportApPerTurn(idx, val)
}

//Calculate
const calculateNode = function (idx) {
  return apPerTurn[idx] = Math.round((apAtttack + getApFromLeader(idx) + getApWeapon(idx) + getApSpecial(idx)) * getMethod())
}

const calculateAll = function () {
  for (let i = 0; i <= 4; i++) {
     report(i, calculateNode(i))
  }
}

// Get
const getMethod = function () {
  const method = parseFloat(document.querySelector('input[name="method"]:checked').value)

  return method
}

const getApFromLeader = function (idx) {
  let typeToon
  let apFromLeader = 0

  const traitToon = document.getElementById('t' + idx).value
  const leader = document.querySelector('input[name="leader"]:checked').value

  if (traitToon === 'fast' || traitToon === 'strong') {
    typeToon = 'melee'
  } else if (traitToon === 'alert' || traitToon === 'tough') {
    typeToon = 'ranged'
  } else {
    typeToon = undefined
  }

  if (leader === 'all' || traitToon === leader || typeToon === leader) {
    apFromLeader = parseInt(document.querySelector('input[name="leader-ap"]:checked').value, 10)
  }

  return apFromLeader
}

const getApWeapon = function (idx) {
  const apWeapon = parseInt(document.getElementById('w' + idx).value, 10)

  return apWeapon
}

const getApSpecial = function (idx) {
  let apSpecialPercent = 0
  let apSpecialPoint = 0

  const eSpecials = document.querySelectorAll('input[name="special-ap"]:checked')
  const inputAp = parseInt(document.getElementById('ipt-ap' + idx).value, 10)

  for (let i = 0; i < eSpecials.length; i++) {
    apSpecialPercent += parseInt(eSpecials[i].value, 10)
  }

  apSpecialPoint = Math.round((inputAp * apSpecialPercent) / 100)

  return apSpecialPoint
}

// Elements
const eMethods = document.querySelectorAll('input[name="method"]')
const eLeaders = document.querySelectorAll('input[name="leader"]')
const eLeaderAPs = document.querySelectorAll('input[name="leader-ap"]')
const eWeaponAPs = document.querySelectorAll('select[name="weapon-ap"]')
const eSpecialAPs = document.querySelectorAll('input[name="special-ap"]')
const eSelectTraits = document.querySelectorAll('select[name="triat"]')
const eInputAPs = document.querySelectorAll('input[name="input-ap"]')

// Events
Array.prototype.slice.call(eMethods).concat(Array.prototype.slice.call(eLeaders), Array.prototype.slice.call(eLeaderAPs), Array.prototype.slice.call(eSpecialAPs)).forEach(function(elem) {
  elem.onchange = function() {
    calculateAll()
  }
})

for (let i = 0; i < eSelectTraits.length; i++) { 
  eSelectTraits[i].onchange = function () {
    var elSpecialAp = document.getElementById('sp' + i)
    var chkSpecial = document.getElementById('chk-ar' + i)

    chkSpecial.checked = false

    if (this.value != 'fast') {
      elSpecialAp.className = 'hide'
    } else {
      elSpecialAp.className = ''
    }

    calculateAll()
  }
}

for (let i = 0; i < eWeaponAPs.length; i++) { 
  eWeaponAPs[i].onchange = function() {
    report(i, calculateNode(i))
  }
}

for (let i = 0; i < eInputAPs.length; i++) { 
  eInputAPs[i].onchange = function() {
    report(i, calculateNode(i))
  }
}

// Initialize
calculateAll()
