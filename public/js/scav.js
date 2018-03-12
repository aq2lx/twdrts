'use strict';

var Scav = {

  config: {
    xpFromScav: 100000
  },

  init: function init(options) {
    this.defineEl();
    this.iniCamp();
  },
  defineEl: function defineEl() {
    this.el = {
      modalAddMember: document.getElementById('modal-addmember')
    };
  },
  iniCamp: function iniCamp() {
    var _this = this;

    var camp = document.getElementById('camp');
    var campNodes = camp.getElementsByTagName('li');

    Array.prototype.forEach.call(campNodes, function (el) {
      el.onclick = function () {
        this.toggleModal(this.el.modalAddMember);
      }.bind(_this);
    });
  },
  toggleModal: function toggleModal(modal) {
    modal.classList.toggle('show');
  }
};

window.Scav = Scav;

// ----->

Scav.init();