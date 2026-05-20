const STORAGE_KEY = "simple-todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const template = document.getElementById("todo-item-template");

let todos = loadTodos();
render();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: crypto.randomUUID(),
    text,
    done: false,
  });

  input.value = "";
  saveAndRender();
});

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  render();
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const item = template.content.firstElementChild.cloneNode(true);
    const toggle = item.querySelector(".toggle");
    const text = item.querySelector(".text");
    const del = item.querySelector(".delete");

    text.textContent = todo.text;
    toggle.checked = todo.done;
    item.classList.toggle("done", todo.done);

    toggle.addEventListener("change", () => {
      todo.done = toggle.checked;
      saveAndRender();
    });

    del.addEventListener("click", () => {
      todos = todos.filter((x) => x.id !== todo.id);
      saveAndRender();
    });

    list.appendChild(item);
  });
}
