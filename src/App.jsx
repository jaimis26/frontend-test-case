import React from "react";
import { Header } from "./components/Header/Header";
import { ProductList } from "./components/ProductList/ProductList";
import { Cart } from "./components/Cart/Cart";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}

export default App;
