import './styles.css';
import { Todo, TodoList } from './classes' //cuando solo se llama a la carpeta busca el index por defecto
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// todoList.todos.forEach( todo => crearTodoHtml( todo ) );
todoList.todos.forEach( crearTodoHtml ); // Cuando se quiere enviar una instrucción y es el único argumento que se pasa por el método se puede resumir de esta manera