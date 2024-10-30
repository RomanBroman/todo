export const styles = `
  .material-icons-outlined {
    font-family: 'Material Icons Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  }
  .todo-item {
    display: flex;
    align-items: flex-start;
    padding: 10px;
    border-radius: 5px;
    background-color: #f0f0f0;
    border-radius: 10px;
    box-shadow: 2px 2px 4px -2px rgba(90, 90, 90, 0.5), inset 4px 4px 6px rgba(255, 255, 255, 0.5);
  }
  .todo-content {
    display: flex;
    flex-direction: column;
    margin-right: 12px;
  }
  .todo-form {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }  
  .todo-form-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .todo-form-row {
    display: flex;
    gap: 8px;
  }
  .todo-actions {
    display: flex;
    gap: 12px;
    margin-left: auto;
  }
  .button {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    font-size: 20px;
    padding: 0;
    transition: color 175ms ease-in-out;
  }
  .button.delete {
    color: #930000;
  }
  .button.delete:hover {
    color: #d10000;
  }
  .button.save {
    color: #077f00;
  }
  .button.save:hover {
    color: #0fbd05;
  }
  .button.edit:hover {
    color: #000000;
  }
  .todo-status {
    align-self: start;
    margin-right: 12px;
  }
  .todo-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .todo-checkbox:checked + label svg path {
    stroke-dashoffset: 0;
  }
  .todo-checkbox + label {
    display: block;
    border: 2px solid #333;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    transition: 175ms ease-in-out;
  }
  .todo-checkbox + label:active {
    border-radius: 7px;
  }
  .todo-checkbox + label svg {
    pointer-events: none;
  }
  .todo-checkbox + label svg path {
    fill: none;
    stroke: #333;
    stroke-width: 4px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 101;
    transition: all 350ms cubic-bezier(1, 0, 0.37, 0.91);
  }
  .todo-title {
    font-weight: bold;
    font-size: 16px;
  }
  .todo-description {
    font-size: 12px;
    margin: 4px 0 12px;
  }
  .todo-due-date {
    font-size: 10px;
    color: #767676;
  }
  .todo-due-date .overdue {
    color: #930000;
  }
  .text-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  label.text-field {
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 600;
  }
  .text-field input, .text-field textarea {
    height: 28px;
    width: 200px;
    padding: 0 4px;
    font-size: 12px;
    background-color: #fff;
    color: #333;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
    transition: border-color 175ms ease-in-out;
  }
  .text-field textarea {
    height: auto;
    width: auto;
    padding: 4px;
    min-height: 48px;
    resize: vertical;
  }
  .text-field input:focus, .text-field textarea:focus {
    outline: #333;
    border-color: #333;
  }
`;
