import UI from './UI'

import './sass/app.scss'
import './sass/ap.scss'

const settings = {
  apAtttack: 20,
  methodAPMultiple: {
    atk: 1,
    def: 1.4
  },
  bg: {
    fast: '#c18c00',
    strong: '#415c1c',
    alert: '#981014',
    tough: '#003466'
  }
}

const AdrenalineRush = {
  state: {
    leaderAP: 0,
    towerAP: 0,
    member: []
  },

  init() {
    this.defineEl()
      .iniEvents()
      .iniModal()
      .mergeOptions()
      .bootstrap()
      .calculateAll()
  },

  mergeOptions() {
    const opt = {
      method: 'atk',
      member: [
        { trait: 'fast' },
        { trait: 'strong' },
        { trait: 'alert' },
        { trait: 'tough' },
        { trait: 'fast' }
      ]
    }

    this.state = { ...this.state, ...opt }

    return this
  },

  defineEl() {
    this.el = {
      modalSetAPBuff: new UI.Modal('modal-set-ap-buff'),
      leaderTrait: new UI.SelectTraits('leader-trait'),
      towerTrait: new UI.SelectTraits('tower-trait'),
      selectTraits: document.querySelectorAll('[data-el="select-trait"]'),
      showBuffLeader: document.getElementById('show-buff-leader'),
      showBuffTower: document.getElementById('show-buff-tower')
    }

    return this
  },

  iniEvents() {
    // Swicth Traits
    for (let x = 0; x < this.el.selectTraits.length; x++) {
      const eSelectTrait = this.el.selectTraits[x].nextElementSibling

      this.el.selectTraits[x].onclick = () => {
        eSelectTrait.classList.toggle('show')
      }

      const eSwitchTrait = eSelectTrait.querySelectorAll('li')

      for (let y = 0; y < eSwitchTrait.length; y++) {
        eSwitchTrait[y].onclick = () => {
          const newTrait = eSwitchTrait[y].dataset.trait

          if (this.state.member[x].trait !== newTrait) {
            this.setTrait(x, newTrait)
          }

          eSelectTrait.classList.remove('show')
        }
      }
    }

    // Modal Buffs
    const buff = document.getElementById('buff')

    buff.onclick = () => {
      this.el.modalSetAPBuff.show()
    }

    // Apply Buffs
    const btnApply = document.getElementById('btn-apply-buff')

    btnApply.onclick = () => {
      this.applyBuff()
    }

    // Methods
    const eMethods = document.querySelectorAll('input[name="method"]')

    ;[].slice.call(eMethods).forEach(elem => {
      elem.onchange = () => {
        this.calculateAll()
      }
    })

    // Recharge Rate
    const eInputAP = document.querySelectorAll('select[name="ipt-ap"]')

    for (let i = 0; i < eInputAP.length; i++) {
      eInputAP[i].onchange = () => {
        this.calculateAP(i)
      }
    }

    // Weapon
    const eWeaponAP = document.querySelectorAll('select[name="weapon-ap"]')

    for (let i = 0; i < eWeaponAP.length; i++) {
      eWeaponAP[i].onchange = () => {
        this.calculateAP(i)
      }
    }

    // Weapion AP 8 All
    const eWeaponAP8All = document.querySelectorAll('input[name="wap8a"]')

    for (let i = 0; i < eWeaponAP8All.length; i++) {
      eWeaponAP8All[i].onchange = () => {
        if (this.state.member[i].trait === 'fast') {
          const elWap20 = document.getElementById(`chk-wap20-${i}`)

          if (elWap20.checked) {
            elWap20.checked = false
          }
        }

        this.calculateAll()
      }
    }

    // Weapon AP 20
    const eWeaponAP20 = document.querySelectorAll('input[name="wap20"]')

    for (let i = 0; i < eWeaponAP20.length; i++) {
      eWeaponAP20[i].onchange = () => {
        if (this.state.member[i].trait === 'fast') {
          const elWap8All = document.getElementById(`chk-wap8a-${i}`)

          if (elWap8All.checked) {
            elWap8All.checked = false
            this.calculateAll()
          } else {
            this.calculateAP(i)
          }
        } else {
          this.calculateAP(i)
        }
      }
    }

    // AP Gain
    const eAPGain = document.querySelectorAll('input[name="ap-gain"]')

    for (let i = 0; i < eAPGain.length; i++) {
      eAPGain[i].oninput = function() {
        if (this.value > 100) {
          this.value = 100
        }
      }

      eAPGain[i].onkeyup = () => {
        this.calculateAP(i)
      }
    }

    return this
  },

  iniModal() {
    // Button close modal
    const eBtnCloseModal = document.getElementById('btn-close-md')

    eBtnCloseModal.onclick = () => {
      this.el.modalSetAPBuff.hide()
    }

    // Tabs
    new UI.Tab('tab-buff')

    return this
  },

  bootstrap() {
    document.getElementById(`method-${this.state.method}`).checked = true

    for (let x = 0; x < this.state.member.length; x++) {
      this.setTrait(x, this.state.member[x].trait)
    }

    return this
  },

  setTrait(idx, trait) {
    // Icon
    this.el.selectTraits[idx].className = this.el.selectTraits[
      idx
    ].className.replace(/fast|strong|alert|tough/, trait)

    // BG
    const m = document.getElementById(`m${idx}`)

    m.style.backgroundColor = settings.bg[trait]

    // Weapon
    const elWap8All = document.getElementById(`wap8a-${idx}`)
    const elWap20 = document.getElementById(`wap20-${idx}`)
    const chkWap8All = document.getElementById(`chk-wap8a-${idx}`)
    const chkWap20 = document.getElementById(`chk-wap20-${idx}`)

    chkWap8All.checked = false
    chkWap20.checked = false

    const fx = {
      fast() {
        elWap8All.classList.remove('hide')
        elWap20.classList.remove('hide')
      },

      strong() {
        elWap8All.classList.remove('hide')
        elWap20.classList.add('hide')
      },

      alert() {
        elWap8All.classList.add('hide')
        elWap20.classList.add('hide')
      },

      tough() {
        elWap8All.classList.add('hide')
        elWap20.classList.remove('hide')
      }
    }

    fx[trait]()

    this.state.member[idx].trait = trait

    this.calculateAll()
  },

  applyBuff() {
    this.state.leaderAP = this._applyBuff(
      this.el.showBuffLeader,
      this.el.leaderTrait,
      'input[name="iptl-apa"]:checked'
    )
    this.state.towerAP = this._applyBuff(
      this.el.showBuffTower,
      this.el.towerTrait,
      'input[name="iptt-apa"]:checked'
    )

    this.el.modalSetAPBuff.hide()
    this.calculateAll()
  },

  _applyBuff(showBuff, traits, input) {
    showBuff.innerHTML = ''

    for (let i = 0; i < traits.active.length; i++) {
      const trait = traits.active[i]

      if (trait.match(/all|melee|range/)) {
        showBuff.innerHTML += `<span class="clr-amber">${trait}</span> `
      } else if (trait.match(/fast|strong|alert|tough/)) {
        showBuff.innerHTML += `<i class="icon icon-trait i-sm icon-trait-${trait}"></i> `
      } else return false
    }

    const txtAp = document.querySelector(input).dataset.txt
    showBuff.innerHTML += `<span class="clr-lightyellow">${txtAp}</span> AP Atk`

    return parseFloat(document.querySelector(input).value)
  },

  // Get
  getAPLeader(idx) {
    return this.getAPfromBuff(
      idx,
      this.el.leaderTrait.active,
      this.state.leaderAP
    )
  },

  getAPTower(idx) {
    return this.getAPfromBuff(
      idx,
      this.el.towerTrait.active,
      this.state.towerAP
    )
  },

  getAPfromBuff(idx, active, ap) {
    if (active[0] === 'all') return ap
    if (active[0] === 'melee') {
      if (this.state.member[idx].trait.match(/fast|strong/)) return ap
    }
    if (active[0] === 'range') {
      if (this.state.member[idx].trait.match(/alert|tough/)) return ap
    }

    for (let i = 0; i < active.length; i++) {
      if (active[i] === this.state.member[idx].trait) {
        return ap
      }
    }

    return 0
  },

  getRechargeRate(idx) {
    return parseInt(document.getElementById(`ipt-ap${idx}`).value, 10)
  },

  getAPWeapon(idx) {
    return parseFloat(document.getElementById(`w${idx}`).value)
  },

  getAPReceived(idx) {
    const rp =
      parseInt(document.getElementById(`ipt-gain${idx}`).value, 10) || 0
    const received = this.getAPPercentage(this.getRechargeRate(idx), rp)

    const eAPR = document.getElementById(`apg${idx}`)

    if (received) {
      eAPR.classList.add('show')
      eAPR.innerHTML = `+${received}`
    } else {
      eAPR.classList.remove('show')
    }

    return received
  },

  getAPWeapon8All(idx) {
    const eSpecials = document.querySelectorAll('input[name="wap8a"]:checked')
    let received = 0

    for (let i = 0; i < eSpecials.length; i++) {
      const percent = parseInt(eSpecials[i].value, 10)
      received += this.getAPPercentage(this.getRechargeRate(idx), percent)
    }

    const eAPR = document.getElementById(`apw8a-${idx}`)

    if (received) {
      eAPR.classList.add('show')
      eAPR.innerHTML = `+${received}`
    } else {
      eAPR.classList.remove('show')
    }

    return received
  },

  getAPWeapon20(idx) {
    if (this.state.member[idx].trait.match(/fast|tough/)) {
      const eSpecial = document.getElementById(`chk-wap20-${idx}`)
      const eAPR = document.getElementById(`apw20-${idx}`)

      if (eSpecial.checked) {
        const percent = parseInt(eSpecial.value, 10)
        const received = this.getAPPercentage(
          this.getRechargeRate(idx),
          percent
        )

        if (received) {
          eAPR.classList.add('show')
          eAPR.innerHTML = `+${received}`
        }

        return received
      } else {
        eAPR.classList.remove('show')

        return 0
      }
    }

    return 0
  },

  getMethod() {
    return parseFloat(
      settings.methodAPMultiple[
        document.querySelector('input[name="method"]:checked').value
      ]
    )
  },

  getAPPercentage(recharge, percent) {
    return Math.ceil(((recharge + 1) * parseInt(percent, 10)) / 100)
  },

  //Calculate
  calculateAll() {
    for (let i = 0; i <= 4; i++) {
      this.calculateAP(i)
    }
  },

  calculateAP(idx) {
    this.report(
      idx,
      this.calculateNode(idx),
      this.getAPReceived(idx) +
        this.getAPWeapon8All(idx) +
        this.getAPWeapon20(idx)
    )
  },

  calculateNode(idx) {
    return parseFloat(
      (
        (settings.apAtttack +
          this.getAPLeader(idx) +
          this.getAPTower(idx) +
          this.getAPWeapon(idx)) *
        this.getMethod()
      ).toFixed(2)
    )
  },

  // Report
  report(idx, ap, aprcv) {
    this.reportFT(idx, ap, aprcv)
    this.reportApPerTurn(idx, ap)
  },

  reportFT(idx, ap, aprcv) {
    // console.log(idx, ap, aprcv)

    const eFT = document.getElementById(`rft${idx}`)
    const recharge = this.getRechargeRate(idx)

    let r = 0
    let sap = 0

    while (sap < recharge) {
      sap += ap
      r++
    }

    if (aprcv) {
      let rs = 0

      while (aprcv < recharge) {
        aprcv += ap
        rs++
      }

      eFT.innerHTML = rs
    } else {
      eFT.innerHTML = r
    }
  },

  reportApPerTurn(idx, ap) {
    const eAPT = document.getElementById(`apt${idx}`)

    eAPT.innerHTML = ap
  }
}

AdrenalineRush.init()
