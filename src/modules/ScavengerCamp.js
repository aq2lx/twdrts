import DB from '../db.json';
import UI from './UI';

const ScavengerCamp = {

  state: {
    counMember: 0,
  },

  init(options = {}) {
    this.mergeOptions(options)
        .defineEl()
        .iniCamp()
        .iniModal();
  },

  mergeOptions(options) {
    const opt = {
      xpFromScav: options.xpFromScav || 100000,
      input: {
        star: options.star || 6,
        tier: options.tier || 1,
      }
    };

    this.state = { ...this.state, ...opt };

    return this;
  },

  defineEl() {
    this.el = {
      modalAddMember: document.getElementById('modal-addmember'),
      btnCloseModal: document.getElementById('btn-close-md'),
    }

    return this;
  },

  iniCamp() {
    const camp = document.getElementById('camp');
    const campNodes = this.el.campNodes = camp.getElementsByTagName('li');

    Array.prototype.forEach.call(this.el.campNodes, el => {
      el.onclick = (() => {
        this.toggleModal(this.el.modalAddMember);
      })
    })

    return this;
  },

  iniModal() {
    // Group button
    const eInputStar = new UI.BtnGroup('ipt-star');
    const eInputTier = new UI.BtnGroup('ipt-tier');

    const eName = document.getElementById('ipt-name');
    const eInputLvl = document.getElementById('ipt-lvl');
    const eInputXp = document.getElementById('ipt-xp');
    const eBtnAddtoCamp = document.getElementById('btn-addtocamp');

    /*for (let i = 0; i < eInputStar.child.length; i++) {
      eInputStar.child[i].onclick = (e) => {
        const el = e.target || e.currentTarget;

        this.state.input.star = parseInt(el.dataset.value, 10);
        this.setMaxLevel();
      }
    }

    for (let i = 0; i < eInputTier.child.length; i++) {
      eInputTier.child[i].onclick = (e) => {
        const el = e.target || e.currentTarget;

        this.state.input.tier = parseInt(el.dataset.value, 10);
        this.setMaxLevel();
      }
    }*/

    // Input lvl
    eInputLvl.onkeyup = (e) => {
      const el = e.target || e.currentTarget;

      if (el.value > this.state.maxLevel) {
        el.value = this.state.maxLevel;
      }

      this.state.input.lvl = el.value;
    }

    // Input xp
    eInputXp.onkeyup = (e) => {
      const el = e.target || e.currentTarget;

      if (this.value > 9999) {
        this.value = 9999;
      }

      this.state.input.xp = this.value;
    }

    // Button add to camp
    eBtnAddtoCamp.onclick = () => {
      if (this.state.counMember > 5) {
        return;
      }

      addToCamp(this.state.input);
    }

    // Close modal
    this.el.btnCloseModal.onclick = (() => {
      this.toggleModal(this.el.modalAddMember);
    })

    return this;
  },

  toggleModal(modal) {
    modal.classList.toggle('md-show');
  },

  setMaxLevel() {
    this.state.maxLevel = DB.maxLevel[`s${this.state.input.star}`][`t${this.state.input.tier}`];
  },

  addToCamp(input) {
    console.log(input);
  }
}

export default ScavengerCamp;
