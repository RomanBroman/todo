import {
  getEntries,
  addEntry,
  updateEntry,
  deleteEntry
} from './dbutils.js';

const state = {
  todos: [],
  filterTitle: '',
  filterDueDate: ''
};

function renderTodos() {
  const {
    todos,
    filterTitle,
    filterDueDate
  } = state;

  const filteredTodos = todos.filter(todo => {
    const matchesTitle = (todo.title || '').toLowerCase().includes(filterTitle.toLowerCase());
    const matchesDueDate = !filterDueDate || todo.dueDate === filterDueDate;
    return matchesTitle && matchesDueDate;
  });

  const todoListNode = document.querySelector('#todo-list');
  todoListNode.innerHTML = '';

  filteredTodos.forEach(todo => {
    const todoItem = document.createElement('todo-item');
    todoItem.setAttribute('title', todo.title || '');
    todoItem.setAttribute('description', todo.description || '');
    todoItem.setAttribute('due-date', todo.dueDate || '');
    todoItem.setAttribute('is-done', todo.isDone || false);
    todoItem.setAttribute('is-new', todo.isNew || false);

    todoItem.onDelete = () => deleteTodo(todo.id);
    todoItem.onSave = (updatedTodo) => updateTodo(todo.id, {
      ...updatedTodo,
      createdAt: todo.createdAt
    });
    todoItem.onEdit = () => {
      const currentEditingItem = document.querySelector('todo-item[is-editing="true"]') || document.querySelector('todo-item[is-new="true"]');
      if (currentEditingItem) {
        currentEditingItem.switchEditingMode(false);
      }
    }

    todoListNode.appendChild(todoItem);
  });
}

function updateState(updates) {
  Object.assign(state, updates);
  renderTodos();
}

function addTodo(newTodo) {
  addEntry(newTodo).then(id => {
    state.todos.push({
      id,
      isNew: true,
      ...newTodo
    });
    renderTodos();
  }).catch(console.error);
}

function updateTodo(id, updatedTodo) {
  updateEntry({
    id,
    ...updatedTodo
  }).then(() => {
    const index = state.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      state.todos[index] = {
        ...state.todos[index],
        ...updatedTodo,
        isNew: false
      };
    }
  }).catch(console.error);
}

function deleteTodo(id) {
  deleteEntry(id).then(() => {
    const index = state.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      state.todos.splice(index, 1);
    }
    renderTodos();
  }).catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  getEntries().then(todos => {
    state.todos = todos;
    renderTodos();
  }).catch(console.error);

  const titleFilterInput = document.querySelector('#filter-title');
  const dueDateFilterInput = document.querySelector('#filter-due-date');
  document.querySelector('#clear-button').addEventListener('click', () => {
    titleFilterInput.value = '';
    dueDateFilterInput.value = '';
    updateState({
      filterTitle: '',
      filterDueDate: ''
    });
  });
  document.querySelector('#filter-title').addEventListener('input', (event) => {
    updateState({
      filterTitle: event.target.value
    });
  });
  document.querySelector('#filter-due-date').addEventListener('input', (event) => {
    updateState({
      filterDueDate: event.target.value
    });
  });

  document.querySelector('#add-button').addEventListener('click', () => {
    const currentEditingItem = document.querySelector('todo-item[is-new="true"]');

    if (currentEditingItem) {
      currentEditingItem.switchEditingMode(false);
    }

    addTodo({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      dueDate: '',
      isDone: false,
      createdAt: new Date().toISOString()
    });
  });
});