import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoProvider } from './contexts/TodoProvider';

function App() {
	return (
		<TodoProvider>
			<TodoApp />
		</TodoProvider>
	);
}

export default App;
