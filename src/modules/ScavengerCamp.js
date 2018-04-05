import DB from '../db.json';
import UI from './UI';

const ScavengerCamp = {

  state: {
    campMember: [],
    countMember: 0,
    xpPerMember: 0
  },

  init(options = {}) {
    this.mergeOptions(options)
        .defineEl()
        .iniEvents()
        .iniCamp()
        .iniModal()
        .bootstrap()
  },

  mergeOptions(options) {
    const opt = {
      scavType: options.scavType || 'ygl',
      scavBonus: options.scavBonus || false,
      input: {
        name: options.name || '',
        star: options.star || 6,
        tier: options.tier || 1,
        lvl: options.lvl || 1,
        xp: options.xp || 0
      }
    };

    this.state = { ...this.state, ...opt };

    return this;
  },

  defineEl() {
    this.el = {
      scavType: document.querySelectorAll('input[name="scav-type"]'),
      chkBonus: document.getElementById('chk-scav-bonus'),
      btnBonus: document.getElementById('btn-scav-bonus'),
      modalAddMember: new UI.Modal('modal-addmember'),
      total: document.getElementById('total')
    }

    return this;
  },

  iniEvents() {
    [].forEach.call(this.el.scavType, el => {
      el.onchange = ((e) => {
        const el = e.target || e.currentTarget;

        if (el.value === 'bnm') {
          this.el.btnBonus.classList.remove('disabled');
          this.state.scavType = 'bnm';
        } else {
          this.el.btnBonus.classList.add('disabled');
          this.state.scavType = 'ygl';
        }

        if (this.state.countMember) {
          this.calculate();
        }
      });
    });

    this.el.chkBonus.onchange = (e) => {
      const el = e.target || e.currentTarget;

      if (el.checked) {
        this.state.scavBonus = true;
      } else {
        this.state.scavBonus = false;
      }

      if (this.state.countMember) {
        this.calculate();
      }
    }

    return this;
  },

  iniCamp() {
    const camp = document.getElementById('camp');
    const campNodes = this.el.campNodes = camp.getElementsByTagName('li');

    [].forEach.call(campNodes, el => {
      el.onclick = ((e) => {
        const el = e.target || e.currentTarget;

        this.state.input.idx = parseInt(el.dataset.idx, 10);
        this.el.modalAddMember.show();
        // this.el.inputName.setSelectionRange(0, 9999);
      })
    })

    return this;
  },

  iniModal() {

    /**
     * Elements
     */

    // Input name
    const eInputName = this.el.inputName = document.getElementById('ipt-name');

    eInputName.onkeyup = (e) => {
      const el = e.target || e.currentTarget;

      this.state.input.name = el.value;
    }

    /*eInputName.onclick = function() {
      if (this.value) {
        this.setSelectionRange(0, 24);
      }
    }*/

    // Input star
    const eInputStar = document.querySelectorAll('input[name=ipt-star]');

    [].forEach.call(eInputStar, el => {
      el.onchange = (e) => {
        const el = e.target || e.currentTarget;

        this.state.input.star = parseInt(el.value, 10);
        this.setMaxLevel();
      }
    });

    // Input tier
    const eInputTier = document.querySelectorAll('input[name=ipt-tier]');

    [].forEach.call(eInputTier, el => {
      el.onchange = (e) => {
        const el = e.target || e.currentTarget;

        this.state.input.tier = parseInt(el.value, 10);
        this.setMaxLevel();
      }
    });

    // Input level
    const eInputLvl = this.el.inputLvl = document.getElementById('ipt-lvl');

    eInputLvl.onkeyup = (e) => {
      const el = e.target || e.currentTarget;

      if (el.value > this.state.maxLevel) {
        el.value = this.state.maxLevel;
      }

      this.state.input.lvl = parseInt(el.value, 10);
    }

    eInputLvl.onclick = function() {
      if (this.value) {
        this.setSelectionRange(0, 2);
      }
    }

    // Input xp
    const eInputXp = this.el.inputXp = document.getElementById('ipt-xp');

    eInputXp.onkeyup = (e) => {
      const el = e.target || e.currentTarget;

      if (el.value > 9999) {
        el.value = 9999;
      }

      this.state.input.xp = parseInt(el.value, 10);
    }

    eInputXp.onclick = function() {
      if (this.value) {
        this.setSelectionRange(0, 4);
      }
    }

    // Button add to camp
    const eBtnAddtoCamp = document.getElementById('btn-addtocamp');

    eBtnAddtoCamp.onclick = () => {
      if (this.state.countMember > 5) {
        return;
      }

      this.addToCamp({ ...this.state.input });
      this.el.modalAddMember.hide();
      this.clearForm();
    }

    // Button close modal
    const eBtnCloseModal = document.getElementById('btn-close-md');

    eBtnCloseModal.onclick = (() => {
      this.el.modalAddMember.hide();
    })


    return this;
  },

  bootstrap() {
    document.getElementById(`scav-type-${this.state.scavType}`).checked = true;
    document.getElementById(`ipt-star-${this.state.input.star}`).checked = true;
    document.getElementById(`ipt-tier-${this.state.input.tier}`).checked = true;
    document.getElementById('ipt-lvl').value = this.state.input.lvl;
    document.getElementById('ipt-xp').value = this.state.input.xp;

    if (this.state.scavType === 'ygl') {
      this.el.btnBonus.classList.add('disabled');
    }

    this.setMaxLevel();

    return this;
  },

  setMaxLevel() {
    this.state.maxLevel = DB.maxLevel[`s${this.state.input.star}`][`t${this.state.input.tier}`];
  },

  addToCamp(data) {
    // const idx = this.getEmptyNodes();
    // data.idx = idx;

    this.state.campMember[data.idx] = data;
    this.state.countMember += 1;

    this.createMember(data);
  },

  getEmptyNodes() {
    let idx;

    for (let i = 0; i < 5; i++) {
      if (!this.el.campNodes[i].hasChildNodes()) {
        idx = i;

        break;
      }
    }

    return idx;
  },

  // Build member
  createMember(data) {
    const newMember = document.createElement('div');
    newMember.className = 'fill';

    // Stop propagation
    newMember.onclick = ((e) => {
      e.stopPropagation();
    })

    // Append child
    newMember.appendChild(this.addBtnRemove(data.idx));
    newMember.appendChild(this.addTier(data.tier));
    newMember.appendChild(this.addName(data.name));
    newMember.appendChild(this.addStar(data.star));
    newMember.appendChild(this.addLXBox(data));
    newMember.appendChild(this.addXpGain(data.idx));
    newMember.appendChild(this.addRenown(data.idx));

    this.el.campNodes[data.idx].appendChild(newMember);

    this.calculate();
  },

  addBtnRemove(idx) {
    const btnRemove = document.createElement('span');
    btnRemove.className = 'close';
    btnRemove.innerHTML = '&times;';
    btnRemove.idx = idx;

    // Add events
    btnRemove.onclick = ((e) => {
      e.stopPropagation();

      const el = e.target || e.currentTarget;

      this.removeMember(el.idx);
    })

    return btnRemove;
  },

  addTier(tier) {
    const elTierGroup = document.createElement('div');
    elTierGroup.className = 'tier-wrapper';

    for (let i = 0; i < 4; i++) {
      const elm = document.createElement('span');

      elm.className = 'tier';

      if (i < tier) {
        elm.className += ' fill';
      }

      elTierGroup.appendChild(elm);
    }

    return elTierGroup;
  },

  addName(name) {
    const elName = document.createElement('div');
    elName.className = 'sh-name';
    elName.innerHTML = name;

    return elName;
  },

  addStar(star) {
    const elStarGroup = document.createElement('div');
    elStarGroup.className = 'sh-star';

    if (star === 6) {
      elStarGroup.className += ' clr-amber';
    }

    for (let i = 0; i < star; i++) {
      const s = document.createElement('i');

      s.className = 'icon icon-star';

      elStarGroup.appendChild(s);
    }

    return elStarGroup;
  },

  addLXBox(data) {
    // arrow
    const arrow = document.createElement('div');
    arrow.className = 'c';

    const icon = document.createElement('i');
    icon.className = 'icon icon-right-open';

    arrow.appendChild(icon);

    // build table
    const tbl = new UI.Table('tbl-box');
    tbl.addRow([
      tbl.addCol({ class: 'a', text: 'lvl' }),
      tbl.addCol({ class: 'b', text: data.lvl }),
      tbl.addCol({ class: 'c', child: arrow, rowspan: 2 }),
      tbl.addCol({ id: `lvl-${data.idx}`, class: 'd' })
    ]).addRow([
      tbl.addCol({ class: 'e', text: 'xp' }),
      tbl.addCol({ class: 'f', text: data.xp }),
      tbl.addCol({ id: `xp-to-${data.idx}`, class: 'g' })
    ]);

    return tbl.el;
  },

  addXpGain(idx) {
    const elXpGainGroup = document.createElement('div');
    elXpGainGroup.className = 'sh-xpgain';

    // label
    const lbl = document.createElement('span');
    lbl.className = 'clr-lightyellow';
    lbl.innerHTML = 'Xp Gain ';

    // xpgain
    const xp = document.createElement('span');
    xp.id = `xp-gain-${idx}`;

    elXpGainGroup.appendChild(lbl);
    elXpGainGroup.appendChild(xp);

    return elXpGainGroup;
  },

  addRenown(idx) {
    const elRenownGroup = document.createElement('div');

    elRenownGroup.className = 'sh-renown';

    // label
    const lbl = document.createElement('span');
    lbl.className = 'clr-lightyellow';
    lbl.style.marginRight = '.4rem';
    lbl.innerHTML = 'Renown';

    // renown
    const renown = document.createElement('span');
    renown.id = `renown-${idx}`;
    renown.style.fontSize = '1.4rem';
    renown.className = 'clr-amber';

    elRenownGroup.appendChild(lbl);
    elRenownGroup.appendChild(renown);

    return elRenownGroup;
  },

  removeMember(idx) {
    const node = this.el.campNodes[idx];

    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    this.state.campMember[idx] = null;
    this.state.countMember -= 1;

    this.calculate();
  },

  calculate() {
    this.state.xpPerMember = parseInt((DB.scavXp[this.state.scavType] + this.getChallangeBonusXp()) / this.state.countMember, 10) || 0;

    let totalRenown = 0;

    for (let i = 0; i <= 4; i++) {

      // If member not null
      if (this.state.campMember[i]) {
        const data = this.calculateMember(i);

        // Report data
        this.setResult(i, data)
        totalRenown += data.renown;
      }
    }

    this.setTotal(totalRenown);
  },

  calculateMember(idx) {

    // Get xp remaining Array by current level
    const remainingXpChart = this.getRemainingXpChart(idx);

    let xpGain = 0;
    let lvlGain = 0;
    let xp = 0;

    if (remainingXpChart.length) {

      // Set current xp member
      if (this.state.campMember[idx].xp > remainingXpChart[0]) {
        this.state.campMember[idx].xp = remainingXpChart[0];
      }

      remainingXpChart[0] = remainingXpChart[0] - this.state.campMember[idx].xp;

      for (let i = 0; i < remainingXpChart.length; i++) {
        xpGain += remainingXpChart[i];

        if (xpGain > this.state.xpPerMember) {
          lvlGain = i;
          xp = this.state.xpPerMember + remainingXpChart[i] - xpGain;
          xpGain = this.state.xpPerMember;

          break;
        }

        lvlGain = i + 1;
        xp = 'max!';
      }
    } else {
      xp = 'max!';
    }

    const renown = this.getRenownPoint(idx, lvlGain);

    return { lvlGain, xp, xpGain, renown };
  },

  getChallangeBonusXp() {
    if (this.state.scavType === 'bnm' && this.state.scavBonus) {
      return 30000;
    }

    return 0;
  },

  getRemainingXpChart(idx) {
    const xpSet = DB.xp[`s${this.state.campMember[idx].star}`][`t${this.state.campMember[idx].tier}`];
    const remainingXp = xpSet.slice(this.state.campMember[idx].lvl - 1);

    return remainingXp;
  },

  getRenownPoint(idx, lvl) {
    const renown = DB.renown[`s${this.state.campMember[idx].star}`][this.state.campMember[idx].tier - 1];

    return renown * lvl;
  },

  setResult(idx, data) {
    const elLvlGain = document.getElementById(`lvl-${idx}`);
    const elXpTo = document.getElementById(`xp-to-${idx}`);
    const elXpGain = document.getElementById(`xp-gain-${idx}`);
    const elRenown = document.getElementById(`renown-${idx}`);

    elLvlGain.innerHTML = this.state.campMember[idx].lvl + data.lvlGain;

    elXpTo.innerHTML = data.xp.toLocaleString();
    if (data.xp === 'max!') {
      elXpTo.className = 'txt-max';
    } else {
      elXpTo.className = 'clr-success';
    }

    elXpGain.innerHTML = data.xpGain.toLocaleString();
    elRenown.innerHTML = data.renown.toLocaleString();
  },

  setTotal(total) {
    this.el.total.innerHTML = total.toLocaleString();
  },

  clearForm() {
    this.el.inputName.value = '';
    this.el.inputLvl.value = 1;
    this.el.inputXp.value = 0;

    this.state.input.name = '';
    this.state.input.lvl = 1;
    this.state.input.xp = 0;
  }
}

export default ScavengerCamp;
