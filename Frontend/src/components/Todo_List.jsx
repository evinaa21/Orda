function Todo_List({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.name} {todo.completed ? '✅' : ''}</li>
      ))}
    </ul>
  )
}

export default Todo_List