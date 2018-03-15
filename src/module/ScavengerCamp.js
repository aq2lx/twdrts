import DB from '../db.json';

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
      star: options.star || 6,
      tier: options.tier || 1,
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
    const eGroupStar = document.getElementById('g-star');
    const eGroupTier = document.getElementById('g-tier');
    const eName = document.getElementById('ipt-name');
    const eInputLvl = document.getElementById('ipt-lvl');
    const eInputXp = document.getElementById('ipt-xp');
    const eBtnAddtoCamp = document.getElementById('btn-addtocamp');
    const eBtnStar = eGroupStar.getElementsByTagName('button');
    const eBtnTier = eGroupTier.getElementsByTagName('button');

    // Input star
    for (let i = 0; i < eBtnStar.length; i++) {
      eBtnStar[i].onclick = (e) => {
        for (let j = 0; j < eBtnStar.length; j++) {
          eBtnStar[j].classList.remove('active');
        }

        const el = e.target || e.currentTarget;
        el.classList.add('active');

        this.state.star = parseInt(el.dataset.value, 10);
        this.setMaxLevel();
      }
    }

    // Input tier
    for (let i = 0; i < eBtnTier.length; i++) {
      eBtnTier[i].onclick = (e) => {
        for (let j = 0; j < eBtnTier.length; j++) {
          eBtnTier[j].classList.remove('active');
        }

        const el = e.target || e.currentTarget;
        el.classList.add('active');

        this.state.tier = parseInt(el.dataset.value, 10);
        this.setMaxLevel();
      }
    }

    // Input lvl
    eInputLvl.onkeyup = (e) => {
      const el = e.target || e.currentTarget;

      if (el.value > this.state.maxLevel) {
        el.value = this.state.maxLevel;
      }
    }

    // Input xp
    eInputXp.onkeyup = function() {
      if (this.value > 9999) {
        this.value = 9999;
      }
    }

    // Button add to camp
    eBtnAddtoCamp.onclick = () => {
      console.log(this.state);
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
    this.state.maxLevel = DB.maxLevel[`s${this.state.star}`][`t${this.state.tier}`];

    console.log(this.state.maxLevel);
  }
}

export default ScavengerCamp;
