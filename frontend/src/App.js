import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import HomePage from "./Pages/Home";
import AllItemsPage from "./Pages/AllItemsPage";
import ItemPage from "./Pages/ItemPage";
import CartPage from "./Pages/CartPage" 

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/home" element = {<HomePage />} />
          <Route path = "/all-items" element = {<AllItemsPage />} />
          <Route path = "/item-page" element = {<ItemPage />} />
          <Route path = "/cart-page" element = {<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
