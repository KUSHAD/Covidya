import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-quill/dist/quill.snow.css";
import "react-virtualized/styles.css";
import { AuthProvider } from "./context/Auth";
ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
