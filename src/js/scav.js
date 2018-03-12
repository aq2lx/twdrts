const Scav = {

  config: {
    xpFromScav: 100000
  },

  init(options) {
    this.defineEl()
    this.iniCamp()
  },

  defineEl() {
    this.el = {
      modalAddMember: document.getElementById('modal-addmember')
    }
  },

  iniCamp() {
    const camp = document.getElementById('camp')
    const campNodes = camp.getElementsByTagName('li')

    Array.prototype.forEach.call(campNodes, el => {
      el.onclick = (function() {
        this.toggleModal(this.el.modalAddMember)
      }).bind(this)
    })
  },

  toggleModal(modal) {
    modal.classList.toggle('show')
  }
}

window.Scav = Scav

// ----->

Scav.init()
