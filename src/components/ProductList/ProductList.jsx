import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../store/slices/productsSlice";
import { addToCart } from "../../store/slices/cartSlice";
import { CATEGORIES, SORT_OPTIONS } from "../../constants/mockData";
import { ProductCard } from "./ProductCard";

export function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price") return a.price - b.price;
        return 0;
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  if (error) {
    return <div className="loading">Ошибка: {error}</div>;
  }

  return (
    <div className="product-list">
      <div className="filters">
        <div className="search">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          {showFilters && (
            <>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          )}

          <button onClick={() => setShowFilters((prev) => !prev)}>
            {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
          </button>
        </div>
      </div>

      <div className="products">
        {filteredProducts.length === 0 ? (
          <p>Товары не найдены</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}
