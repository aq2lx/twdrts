'use strict';

var _db = require('./db.json');

var Scav = {

  config: {
    xpFromScav: 100000
  },

  input: {
    star: 6
  },

  init: function init(options) {
    this.defineEl().iniCamp().iniModal();
  },
  defineEl: function defineEl() {
    this.el = {
      modalAddMember: document.getElementById('modal-addmember'),
      btnCloseModal: document.getElementById('btn-close-md')
    };

    return this;
  },
  iniCamp: function iniCamp() {
    var _this = this;

    var camp = document.getElementById('camp');
    var campNodes = this.el.campNodes = camp.getElementsByTagName('li');

    Array.prototype.forEach.call(this.el.campNodes, function (el) {
      el.onclick = function () {
        _this.toggleModal(_this.el.modalAddMember);
      };
    });

    return this;
  },
  iniModal: function iniModal() {
    var _this2 = this;

    var eGroupStar = document.getElementById('g-star');
    var eGroupTier = document.getElementById('g-tier');
    var eBtnStar = eGroupStar.getElementsByTagName('button');
    var eBtnTier = eGroupTier.getElementsByTagName('button');

    for (var i = 0; i < eBtnStar.length; i++) {
      eBtnStar[i].onclick = function (e) {
        for (var j = 0; j < eBtnStar.length; j++) {
          eBtnStar[j].classList.remove('active');
        }

        var el = e.target || e.currentTarget;
        el.classList.add('active');

        _this2.input.star = parseInt(el.dataset.value, 10);
        _this2.setMaxLevel();
      };
    }

    this.el.btnCloseModal.onclick = function () {
      _this2.toggleModal(_this2.el.modalAddMember);
    };

    return this;
  },
  toggleModal: function toggleModal(modal) {
    modal.classList.toggle('md-show');
  },
  setMaxLevel: function setMaxLevel() {}
};

window.Scav = Scav;

// ----->

Scav.init();

console.log(_db.db);