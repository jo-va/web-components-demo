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

  <h1>Hello <span id="name"></span></h1>
`;

class App extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(val) {
    this.setAttribute('name', val);
  }

  render() {
    this._shadowRoot.querySelector('#name').textContent = this.name;
  }
}

customElements.define('my-app', App);
