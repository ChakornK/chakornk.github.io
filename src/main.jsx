import {
  LocationProvider,
  ErrorBoundary,
  Router,
  prerender as ssr,
  hydrate,
  Route,
} from "preact-iso";

import "./index.css";
import Home from "./app/page.jsx";

function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

if (typeof document !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
