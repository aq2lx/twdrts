// Button group
class BtnGroup {
  constructor(id) {
    this.el = document.getElementById(id);
    this.init();
  }

  init() {
    const child = this.child = this.el.getElementsByTagName('button');

    for (let i = 0; i < child.length; i++) {
      child[i].onclick = (e) => {
        for (let j = 0; j < child.length; j++) {
          child[j].classList.remove('active');
        }

        const el = e.target || e.currentTarget;
        el.classList.add('active');
      }
    }
  }
}

const UI = {
  BtnGroup,
}

export default UI;
