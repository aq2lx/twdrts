// Modal
class Modal {
  constructor(id) {
    this.el = document.getElementById(id)
  }

  show() {
    this.el.classList.add('md-show')
  }

  hide() {
    this.el.classList.remove('md-show')
  }

  toggle() {
    this.el.classList.toggle('md-show')
  }
}

// Table
class Table {
  constructor(className) {
    const tbl = (this.el = document.createElement('table'))
    tbl.className = className
  }

  addRow(col) {
    const row = document.createElement('tr')

    for (let i = 0; i < col.length; i++) {
      row.appendChild(col[i])
    }

    this.el.appendChild(row)

    return this
  }

  addCol(data) {
    const col = document.createElement('td')

    if (data.hasOwnProperty('class')) {
      col.className = data.class
    }
    if (data.hasOwnProperty('id')) {
      col.id = data.id
    }
    if (data.hasOwnProperty('text')) {
      col.innerHTML = data.text
    }
    if (data.hasOwnProperty('child')) {
      col.appendChild(data.child)
    }
    if (data.hasOwnProperty('rowspan')) {
      col.setAttribute('rowspan', data.rowspan)
    }
    if (data.hasOwnProperty('colspan')) {
      col.setAttribute('colspan', data.colspan)
    }

    return col
  }
}

// Tab
class Tab {
  constructor(id) {
    this.el = document.getElementById(id)
    this.tabs = this.el.querySelectorAll('[data-tab]')
    this.tabContents = this.el.querySelectorAll('[data-tab-content]')

    this.iniEvent()
  }

  iniEvent() {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].onclick = () => {
        for (let x = 0; x < this.tabs.length; x++) {
          this.tabs[x].classList.remove('active')
        }

        const tab = this.tabs[i].dataset.tab

        this.tabs[i].classList.add('active')
        this.showContent(tab)
      }
    }
  }

  showContent(tab) {
    for (let i = 0; i < this.tabContents.length; i++) {
      this.tabContents[i].classList.remove('show')
    }

    const tabContent = document.querySelector(`[data-tab-content=${tab}]`)

    tabContent.classList.add('show')
  }
}

// Select Traits
class SelectTraits {
  constructor(id) {
    this.el = document.getElementById(id)
    this.bottons = this.el.querySelectorAll('button')

    this.active = []
    ;[].forEach.call(this.bottons, el => {
      el.onclick = () => {
        const trait = el.dataset.trait

        if (trait.match(/all|melee|range/)) {
          let x = this.active.length

          while (x--) {
            this.remove(this.active[x])
          }
        } else if (trait.match(/fast|strong|alert|tough/)) {
          let x = this.active.length

          while (x--) {
            if (this.active[x].match(/fast|strong|alert|tough/)) continue

            this.remove(this.active[x])
          }
        } else return false

        this.toggle(el)
      }
    })
  }

  toggle(el) {
    const trait = el.dataset.trait

    el.classList.toggle('active')

    const idx = this.active.indexOf(trait)

    if (idx == -1) {
      this.active.push(trait)
    } else {
      this.active.splice(idx, 1)
    }

    return this
  }

  remove(trait) {
    const idx = this.active.indexOf(trait)
    const elx = this.el.querySelector(`[data-trait=${trait}]`)

    this.active.splice(idx, 1)
    elx.classList.remove('active')
  }
}

const UI = {
  Modal,
  Table,
  Tab,
  SelectTraits
}

export default UI
