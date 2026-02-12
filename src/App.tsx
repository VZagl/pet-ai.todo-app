import './app.scss';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoProvider } from './contexts/TodoProvider';

function App() {
	return (
		<div className='app'>
			<TodoProvider>
				<TodoApp />
			</TodoProvider>
		</div>
	);
}

export default App;
