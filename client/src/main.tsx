import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./app/styles/main.scss";
import Store from "./app/store/store.ts";
import { ErrorBoundary } from "./shared/index.ts";
interface State {
	store: Store;
}

const store = new Store();
export const Context = createContext<State>({
	store,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<Context.Provider value={{ store }}>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</Context.Provider>
	// </React.StrictMode>
);
