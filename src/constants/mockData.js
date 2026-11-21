export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 14",
    price: 799,
    category: "phones",
    image: "https://placeholder.com",
    description: "Новейший iPhone",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 699,
    category: "phones",
    image: "https://placeholder.com",
    description: "Флагман Samsung",
  },
  {
    id: 3,
    name: "MacBook Pro",
    price: 1999,
    category: "laptops",
    image: "https://placeholder.com",
    description: "Мощный ноутбук Apple",
  },
  {
    id: 4,
    name: "Dell XPS 13",
    price: 1299,
    category: "laptops",
    image: "https://placeholder.com",
    description: "Премиум ноутбук Dell",
  },
  {
    id: 5,
    name: "iPad Air",
    price: 599,
    category: "tablets",
    image: "https://placeholder.com",
    description: "Планшет Apple",
  },
  {
    id: 6,
    name: "Samsung Galaxy Tab",
    price: 399,
    category: "tablets",
    image: "https://placeholder.com",
    description: "Планшет Samsung",
  },
];

export const MOCK_USER = {
  id: 1,
  name: "Иван Иванов",
  email: "ivan@example.com",
};

export const CATEGORIES = [
  { value: "all", label: "Все категории" },
  { value: "phones", label: "Телефоны" },
  { value: "laptops", label: "Ноутбуки" },
  { value: "tablets", label: "Планшеты" },
];

export const SORT_OPTIONS = [
  { value: "name", label: "По названию" },
  { value: "price", label: "По цене" },
];
