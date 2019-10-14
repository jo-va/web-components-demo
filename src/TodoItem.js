import { Checkbox } from '@material/mwc-checkbox';
import { IconButton } from '@material/mwc-icon-button';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>
    :host {
      display: block;
    }

    .completed {
      text-decoration: line-through;
    }

    mwc-icon-button {
      margin-left: 10px;
    }

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  </style>
  <li>
    <mwc-checkbox></mwc-checkbox>
    <label></label>
    <mwc-icon-button icon="close"></mwc-icon-button>
  </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this._$item = this._shadowRoot.querySelector('li');
    this._$removeButton = this._shadowRoot.querySelector('mwc-icon-button');
    this._$text = this._shadowRoot.querySelector('label');
    this._$checkbox = this._shadowRoot.querySelector('mwc-checkbox');

    this._$removeButton.addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
    });

    this._$checkbox.addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('text')) {
      this.setAttribute('text', 'placeholder');
    }
    this._render();
  }

  static get observedAttributes() {
    return ['text', 'checked', 'index'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'text':
        this._text = newValue;
        break;
      case 'checked':
        this._checked = this.hasAttribute('checked');
        break;
      case 'index':
        this._index = parseInt(newValue);
        break;
    }
  }

  _render() {
    if (this.hasAttribute('checked')) {
      this._$item.classList.add('completed');
      this._$checkbox.setAttribute('checked', '');
    } else {
      this._$item.classList.remove('completed');
      this._$checkbox.removeAttribute('checked');
    }
    this._$text.innerHTML = this._text;
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get index() {
    return this._index;
  }

  set index(val) {
    this.setAttribute('index', val);
  }
}

customElements.define('todo-item', TodoItem);
