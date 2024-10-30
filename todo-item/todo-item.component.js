import {
  styles
} from "./todo-item.styles.js";

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });

    this.isEditing = false;
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  attachEventListeners() {
    if (this.isEditing) {
      this.shadowRoot.querySelector('#todo-form').addEventListener('submit', this.handleSave);
      this.shadowRoot.querySelector('#save-button').addEventListener('click', this.handleSave);
      this.shadowRoot.querySelector('#cancel-button').addEventListener('click', this.handleCancel);
    } else {
      this.shadowRoot.querySelector('#delete-button').addEventListener('click', this.handleDelete);
      this.shadowRoot.querySelector('#edit-button').addEventListener('click', this.handleEdit);
      this.shadowRoot.querySelector('#status-checkbox').addEventListener('change', this.handleCheckboxChange);
    }
  }

  detachEventListeners() {
    if (this.isEditing) {
      this.shadowRoot.querySelector('#todo-form').removeEventListener('submit', this.handleSave);
      this.shadowRoot.querySelector('#save-button').removeEventListener('click', this.handleSave);
      this.shadowRoot.querySelector('#cancel-button').removeEventListener('click', this.handleCancel);
    } else {
      this.shadowRoot.querySelector('#delete-button').removeEventListener('click', this.handleDelete);
      this.shadowRoot.querySelector('#edit-button').removeEventListener('click', this.handleEdit);
      this.shadowRoot.querySelector('#status-checkbox').removeEventListener('change', this.handleCheckboxChange);
    }
  }

  switchEditingMode(state) {
    if (this.getAttribute('is-new') === 'true') {
      this.handleSave();
    } else {
      this.detachEventListeners();
      this.isEditing = state;
      this.setAttribute('is-editing', state);
      this.render();
      this.attachEventListeners();
    }
  }

  handleCheckboxChange(event) {
    this.setAttribute('is-done', event.target.checked);

    this.onSaveCallback({
      isDone: event.target.checked
    });
  }

  handleDelete(event) {
    this.onDeleteCallback(event);
  }

  handleCancel() {
    if (this.getAttribute('is-new') === 'true') {
      this.onDeleteCallback();
    } else {
      this.switchEditingMode(false);
    }
  }

  handleEdit() {
    this.onEditCallback();
    this.switchEditingMode(true);
  }

  handleSave(e) {
    if (e) {
      e.preventDefault();
    }

    const title = this.shadowRoot.querySelector('#edit-title').value.trim() || 'Untitled';
    const description = this.shadowRoot.querySelector('#edit-description').value.trim() || '';
    const dueDate = this.shadowRoot.querySelector('#edit-due-date').value || '';

    this.setAttribute('is-new', false);
    this.setAttribute('title', title);
    this.setAttribute('description', description);
    this.setAttribute('due-date', dueDate);

    this.onSaveCallback({
      title,
      description,
      dueDate
    });
    this.switchEditingMode(false);
  }

  getFormattedDate(date) {
    function formatDateValue(date) {
      return parseInt(date) < 10 ? `0${date}` : date;
    }

    if (date) {
      const formattedDate = new Date(date);
      const day = formatDateValue(formattedDate.getDate());
      const month = formatDateValue(formattedDate.getMonth() + 1);
      const year = formattedDate.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return '';
  }

  set onSave(callback) {
    this.onSaveCallback = callback;
  }
  set onEdit(callback) {
    this.onEditCallback = callback;
  }
  set onDelete(callback) {
    this.onDeleteCallback = callback;
  }

  render() {
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    const dueDate = this.getAttribute('due-date');
    const isDone = this.getAttribute('is-done') === 'true';

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const isOverdue = new Date(dueDate) < startOfToday;

    if (this.getAttribute('is-new') === 'true') {
      this.isEditing = true;
    }
    if (this.isEditing) {
      setTimeout(() => this.shadowRoot.querySelector('#edit-title').focus());
    }

    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div class="todo-item">
        ${this.isEditing ? `
          <form id="todo-form" class="todo-form">
            <div class="todo-form-content">
              <div class="todo-form-row">
                <label class="text-field" for="edit-title">
                  Title
                  <input id="edit-title" type="text" value="${title}" />
                </label>
                <label class="text-field" for="edit-title">
                  Due Date
                  <input id="edit-due-date" type="date" value="${dueDate}" />
                </label>
              </div>
              <label class="text-field area" for="edit-description">
                Description
                <textarea id="edit-description" rows="3">${description}</textarea>
              </label>
            </div>
            <div class="todo-actions">
              <button title="Cancel" type="button" id="cancel-button" class="material-icons-outlined button edit">edit_off</button>
              <button title="Save" type="submit" id="save-button" class="material-icons-outlined button save">save</button>
            </div>
          </form>
        ` : `
          <div class="todo-status">
            <input id="status-checkbox" class="todo-checkbox" type="checkbox" ${isDone ? "checked" : ""} />
            <label for="status-checkbox">
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
          <div class="todo-content">
            <div class="todo-title">${title}</div>
            <div class="todo-description">${description}</div>
            <div class="todo-due-date">Due: <span class="${isOverdue ? 'overdue' : ''}">${this.getFormattedDate(dueDate)}</span></div>
          </div>
          <div class="todo-actions">
            <button title="Edit" id="edit-button" class="material-icons-outlined button edit">
              edit
            </button>
            <button title="Delete" id="delete-button" class="material-icons-outlined button delete">
              delete
            </button>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);