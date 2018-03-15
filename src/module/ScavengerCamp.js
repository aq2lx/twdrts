import DB from '../db.json';

const ScavengerCamp = {

  config: {
    xpFromScav: 100000,
  },

  input: {
    star: 6,
  },

  init(options) {
    this.defineEl()
        .iniCamp()
        .iniModal();
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
    const eBtnStar = eGroupStar.getElementsByTagName('button');
    const eBtnTier = eGroupTier.getElementsByTagName('button');

    for (let i = 0; i < eBtnStar.length; i++) {
      eBtnStar[i].onclick = (e) => {
        for (let j = 0; j < eBtnStar.length; j++) {
          eBtnStar[j].classList.remove('active');
        }

        const el = e.target || e.currentTarget;
        el.classList.add('active');

        this.input.star = parseInt(el.dataset.value, 10);
        this.setMaxLevel();
      }
    }

    this.el.btnCloseModal.onclick = (() => {
      this.toggleModal(this.el.modalAddMember);
    })

    return this;
  },

  toggleModal(modal) {
    modal.classList.toggle('md-show');
  },

  setMaxLevel() {

  }
}

export default ScavengerCamp;
