import '@webcomponents/webcomponentsjs';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>
    :host {
      border: 2px solid pink;
      display: block;
      padding: 1em;
      margin: 1em;
      font-family: Arial, sans-serif;
    }
    .slot1 {
      color: grey;
    }
    .slot2 {
      font-style: italic;
    }
  </style>
  <h1>Hello <span id="label"></span></h1>
  <slot class="slot1">
    <p>Default content for unnamed Slot</p>
  </slot>
  <slot name="slot2" class="slot2">
    <p>Default content for Slot 2</p>
  </slot>
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

  adoptedCallback() {
    console.log('Component adopted');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.dispatchEvent(
      new CustomEvent(`${name}Changed`, {
        detail: { oldValue, newValue },
        bubbles: true
      })
    );
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
