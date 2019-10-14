import { Button } from '@material/mwc-button';
import { TextField } from '@material/mwc-textfield';
import './TodoItem';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>
    :host {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Arial, sans-serif;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    mwc-button {
      margin-left: 20px;
    }
  </style>
  <h1>My Todo List 📝</h1>
  <div>
    <mwc-textfield label="Add a new todo"></mwc-textfield>
    <mwc-button outlined label="Add" icon="add"></mwc-button>
  </div>
  <ul></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this._todos = [];
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this._$todoList = this._shadowRoot.querySelector('ul');
    this._$input = this._shadowRoot.querySelector('mwc-textfield');

    this._$addButton = this._shadowRoot.querySelector('mwc-button');
    this._$addButton.addEventListener('click', this._addTodo.bind(this));
  }

  _addTodo(e) {
    e.preventDefault();
    if (this._$input.value.length > 0) {
      this._todos.push({ text: this._$input.value, checked: false });
      this._render();
      this._$input.value = '';
    }
  }

  _removeTodo(e) {
    this._todos.splice(e.detail, 1);
    this._render();
  }

  _toggleTodo(e) {
    const todo = this._todos[e.detail];
    this._todos[e.detail] = Object.assign({}, todo, {
      checked: !todo.checked
    });
    this._render();
  }

  _render() {
    this._$todoList.innerHTML = '';

    this._todos.forEach((todo, index) => {
      const $todoItem = document.createElement('todo-item');
      $todoItem.setAttribute('text', todo.text);

      if (todo.checked) {
        $todoItem.setAttribute('checked', '');
      }

      $todoItem.setAttribute('index', index);

      $todoItem.addEventListener('onRemove', this._removeTodo.bind(this));
      $todoItem.addEventListener('onToggle', this._toggleTodo.bind(this));

      this._$todoList.appendChild($todoItem);
    });
  }

  get todos() {
    return this._todos;
  }

  set todos(val) {
    this._todos = val;
    this._render();
  }
}

customElements.define('todo-app', TodoApp);
