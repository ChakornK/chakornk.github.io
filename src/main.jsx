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
import NotFound from "./app/404.jsx";

function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
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
