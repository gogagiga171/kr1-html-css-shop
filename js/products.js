const products = [
  {
    name: "Смартфон",
    category: "electronics",
    description: "Современный смартфон для повседневных задач.",
    price: 25000,
    image: "product-1.svg",
    popular: true,
    isNew: true
  },
  {
    name: "Наушники",
    category: "electronics",
    description: "Беспроводные наушники с чистым звуком.",
    price: 4500,
    image: "product-2.svg",
    popular: true
  },
  {
    name: "Ноутбук",
    category: "electronics",
    description: "Ноутбук для работы и учёбы.",
    price: 65000,
    image: "product-3.svg",
    isNew: true
  },
  {
    name: "Футболка",
    category: "clothing",
    description: "Удобная хлопковая футболка.",
    price: 1200,
    image: "product-1.svg",
    popular: true
  },
  {
    name: "Куртка",
    category: "clothing",
    description: "Практичная куртка на каждый день.",
    price: 5500,
    image: "product-2.svg",
    isNew: true
  },
  {
    name: "Кроссовки",
    category: "clothing",
    description: "Комфортная обувь для прогулок.",
    price: 4200,
    image: "product-3.svg"
  },
  {
    name: "Кольцо",
    category: "jewelry",
    description: "Элегантное украшение для любого образа.",
    price: 1800,
    image: "product-1.svg",
    popular: true
  },
  {
    name: "Браслет",
    category: "jewelry",
    description: "Стильный браслет на каждый день.",
    price: 950,
    image: "product-2.svg"
  },
  {
    name: "Серьги",
    category: "jewelry",
    description: "Лаконичные серьги для любого случая.",
    price: 1400,
    image: "product-3.svg",
    isNew: true
  },
  {
    name: "Настольная лампа",
    category: "home",
    description: "Лампа для уютного рабочего места.",
    price: 2100,
    image: "product-1.svg",
    popular: true
  },
  {
    name: "Подушка",
    category: "home",
    description: "Мягкая декоративная подушка.",
    price: 800,
    image: "product-2.svg"
  },
  {
    name: "Чайник",
    category: "home",
    description: "Электрический чайник для кухни.",
    price: 1900,
    image: "product-3.svg",
    isNew: true
  },
  {
    name: "Крем для лица",
    category: "beauty",
    description: "Уход за кожей на каждый день.",
    price: 900,
    image: "product-1.svg"
  },
  {
    name: "Шампунь",
    category: "beauty",
    description: "Средство для ухода за волосами.",
    price: 550,
    image: "product-2.svg"
  },
  {
    name: "Спортивная бутылка",
    category: "sport",
    description: "Бутылка для тренировок и прогулок.",
    price: 700,
    image: "product-1.svg"
  },
  {
    name: "Фитнес-коврик",
    category: "sport",
    description: "Коврик для домашних тренировок.",
    price: 1600,
    image: "product-2.svg"
  },
  {
    name: "Рюкзак",
    category: "accessories",
    description: "Практичный рюкзак для города.",
    price: 2800,
    image: "product-1.svg",
    popular: true
  },
  {
    name: "Наручные часы",
    category: "accessories",
    description: "Стильные часы на каждый день.",
    price: 3500,
    image: "product-2.svg"
  }
];

const categories = {
  all: "Все товары",
  electronics: "Техника",
  clothing: "Одежда",
  jewelry: "Украшения",
  home: "Товары для дома",
  beauty: "Красота и уход",
  sport: "Спорт и отдых",
  accessories: "Аксессуары"
};