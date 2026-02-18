import './app.scss';
import { TodoApp } from './components/TodoApp/TodoApp';
import { ThemeProvider } from './contexts/ThemeProvider';
import { TodoProvider } from './contexts/TodoProvider';

function App() {
	return (
		<div className='app'>
			<ThemeProvider>
				<TodoProvider>
					<TodoApp />
				</TodoProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
