import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./views/home";
// import * as producers from "./producers";

export const App: view = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/sign-up"} element={<Home />} />
          <Route path={"/login"} element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};
