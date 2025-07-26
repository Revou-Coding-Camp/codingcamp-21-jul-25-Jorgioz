let todos = [];

function addTodo() {
  const text = document.getElementById("todo-text").value.trim();
  const date = document.getElementById("todo-date").value;

  if (text === "" || date === "") return;

  todos.push({ text, date });
  document.getElementById("todo-text").value = "";
  document.getElementById("todo-date").value = "";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteAllTodos() {
  if (confirm("Yakin ingin menghapus semua tugas?")) {
    todos = [];
    renderTodos();
  }
}

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  const filter = document.getElementById("filter").value;
  const filterDate = document.getElementById("filter-date").value;
  const today = new Date().toISOString().split("T")[0];

  todos.forEach((todo, index) => {
    let show = true;

    if (filter === "today" && todo.date !== today) show = false;
    if (filter === "date" && todo.date !== filterDate) show = false;

    if (show) {
      const li = document.createElement("li");

      const info = document.createElement("div");
      info.className = "info";

      const taskText = document.createElement("div");
      taskText.innerText = todo.text;

      const taskDate = document.createElement("div");
      taskDate.className = "date";
      taskDate.innerText = "📅 " + todo.date;

      info.appendChild(taskText);
      info.appendChild(taskDate);

      const delBtn = document.createElement("button");
      delBtn.innerText = "Hapus";
      delBtn.onclick = () => deleteTodo(index);

      li.appendChild(info);
      li.appendChild(delBtn);
      list.appendChild(li);
    }
  });
}