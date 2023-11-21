import PrimeReact from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";

// Components
import TreeTableGrid from "./components/TreeTableGrid/TreeTableGrid";

// Styles
import "./App.css";

function App() {
	PrimeReact.ripple = true;

	return (
		<div className="App">
			<div className="container">
				<h1>Grid Table App</h1>

				{/* Tree Table */}
				<TreeTableGrid />
			</div>
		</div>
	);
}

export default App;
