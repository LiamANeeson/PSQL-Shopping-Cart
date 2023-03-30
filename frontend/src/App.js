import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import HomePage from "./Pages/Home/Home";
import AllItemsPage from "./Pages/AllItemPage/AllItemsPage";
import ItemPage from "./Pages/ItemPage/ItemPage";
import CartPage from "./Pages/CartPage/CartPage" 

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/home" element = {<HomePage />} />
          <Route path = "/items" element = {<AllItemsPage />} />
          <Route path = "/item-page" element = {<ItemPage />} />
          <Route path = "/cart-page" element = {<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
