
// Modal
class Modal {
  constructor(id) {
    this.el = document.getElementById(id);
  }

  show() {
    this.el.classList.add('md-show');
  }

  hide() {
    this.el.classList.remove('md-show');
  }

  toggle() {
    this.el.classList.toggle('md-show');
  }
}

// Table
class Table {
  constructor(className) {
    const tbl = this.el = document.createElement('table');
    tbl.className = className;

    return this;
  }

  addRow(col) {
    const row = document.createElement('tr')

    for (let i = 0; i < col.length; i++) {
      row.appendChild(col[i])
    }

    this.el.appendChild(row);

    return this;
  }

  addCol(data) {
    const col = document.createElement('td');

    if (data.hasOwnProperty('class')) {
      col.className = data.class;
    }
    if (data.hasOwnProperty('id')) {
      col.id = data.id;
    }
    if (data.hasOwnProperty('text')) {
      col.innerHTML = data.text;
    }
    if (data.hasOwnProperty('child')) {
      col.appendChild(data.child);
    }
    if (data.hasOwnProperty('rowspan')) {
      col.setAttribute('rowspan', data.rowspan);
    }
    if (data.hasOwnProperty('colspan')) {
      col.setAttribute('colspan', data.colspan);
    }

    return col;
  }
}

const UI = {
  Modal,
  Table
}

export default UI;
