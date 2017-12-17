
const DEFAULT_TODOS = [
  { title: "Reactで作るTodoアプリ" },
  { title: "はじめてのReact", completed: true },
];

// ------------------------------------
// Todoコンポーネント
// ------------------------------------
function Todo(props) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={() => props.onToggle(props.todo)}
      />
      <span
        style={{ textDecoration: props.todo.completed ? "line-through" : "" }}
      >
        {props.todo.title}
      </span>
      <button onClick={() => props.onRemove(props.todo)}>x</button>
    </li>
  );
}

// ------------------------------------
// TodoListコンポーネント
// ------------------------------------
function TodoList(props) {
  const todoList = props.todos.map((todo, index) => {
    return (
      <Todo
        key={index}
        todo={todo}
        onToggle={props.onToggle}
        onRemove={props.onRemove}
      />
    );
  });

  return (
    <ul className="todo-list">
      {todoList}
    </ul>
  );
}

// ------------------------------------
// TodoFormコンポーネント
// ------------------------------------
function TodoForm(props) {
  return (
    <form className="todo-form" onSubmit={props.onSubmit}>
      <label>
        新しいTodo
        <input
          onChange={props.onChange}
          value={props.value}
        />
      </label>
      <button type="submit">追加する</button>
    </form>
  );
}

// ------------------------------------
// Appコンポーネント
// ------------------------------------
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: DEFAULT_TODOS,
      newTodo: ""
    };

    // ハンドラの中でthisコンテキストを参照するので、ここでthisコンテキストをApp自身に固定しておく
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onSubmit(e) {
    // フォームが送信されるのを防ぐ
    e.preventDefault();

    const { newTodo, todos } = this.state;

    // 値が空の場合は何もしない
    if (!newTodo.trim()) {
      return;
    }

    // 配列をコピーを作成する
    const newTodos = todos.slice();
    // 新しいTodoを追加する
    newTodos.push({
      title: newTodo,
      completed: false
    });

    this.setState({
      todos: newTodos,
      newTodo: ""
    });
  }

  onToggle(todo) {
    const { todos } = this.state;
    const index = todos.indexOf(todo);

    // Todoが存在するときだけ処理を継続する
    if (index > -1) {

      // Todoをコピーする
      let newTodos = todos.slice();
      // Todoの状態を反転させる
      todo.completed = !todo.completed;
      // 所定のTodoを置き換える
      newTodos.splice(index, 1, todo);

      this.setState({ todos: newTodos });
    }   
  }

  onRemove(todo) {
    const { todos } = this.state;
    const index = todos.indexOf(todo);

    // Todoが存在するときだけ処理を継続する
    if (index > -1) {

      // Todoをコピーする
      let newTodos = todos.slice();
      // Todoを削除する
      newTodos.splice(index, 1);

      this.setState({ todos: newTodos });
    }  
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ newTodo: value });
  }

  render() {
    return (
      <div className="todo">
        <TodoForm
          value={this.state.newTodo}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <TodoList
          todos={this.state.todos}
          onToggle={this.onToggle}
          onRemove={this.onRemove}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
