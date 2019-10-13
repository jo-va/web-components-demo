import '@webcomponents/webcomponentsjs';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>
    :host {
      border: 1px solid rebeccapurple;
      display: block;
      padding: 1em;
      font-family: Arial, Helvetica, sans-serif;
    }
  </style>

  <h1>Hello <span id="label"></span></h1>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._$label = this._shadowRoot.querySelector('#label');
  }

  static get observedAttributes() {
    return ['label'];
  }

  connectedCallback() {
    console.log('Component connected');
  }

  disconnectedCallback() {
    console.log('Component disconnected');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(val) {
    this.setAttribute('label', val);
  }

  _render() {
    this._$label.textContent = this.label;
  }
}

customElements.define('my-app', App);
