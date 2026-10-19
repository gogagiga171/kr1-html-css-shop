const products = [
  {
    name: "Беспроводные наушники",
    category: "electronics",
    description: "Наушники для музыки и повседневного использования",
    price: 2990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
  },
  {
    name: "Смарт-часы",
    category: "electronics",
    description: "Умные часы для повседневных задач",
    price: 5990,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
  },
  {
    name: "Фотоаппарат",
    category: "electronics",
    description: "Компактный фотоаппарат для путешествий",
    price: 12990,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"
  },
  {
    name: "Ноутбук",
    category: "electronics",
    description: "Ноутбук для работы и учёбы",
    price: 54990,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"
  },
  {
    name: "Игровая клавиатура",
    category: "electronics",
    description: "Клавиатура для игр и работы",
    price: 3990,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600"
  },
  {
    name: "Кроссовки",
    category: "sport",
    description: "Удобные кроссовки для активного образа жизни",
    price: 4990,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },
  {
    name: "Спортивная сумка",
    category: "sport",
    description: "Вместительная сумка для тренировок",
    price: 2490,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
  },
  {
    name: "Футболка",
    category: "clothing",
    description: "Базовая футболка на каждый день",
    price: 1290,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
  },
  {
    name: "Джинсовая куртка",
    category: "clothing",
    description: "Классическая куртка из денима",
    price: 4590,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600"
  },
  {
    name: "Сумка через плечо",
    category: "accessories",
    description: "Компактная сумка для необходимых вещей",
    price: 2590,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600"
  },
  {
    name: "Солнцезащитные очки",
    category: "accessories",
    description: "Универсальные очки для солнечной погоды",
    price: 1990,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
  },
  {
    name: "Наручные часы",
    category: "accessories",
    description: "Минималистичные часы с классическим дизайном",
    price: 3490,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600"
  },
  {
    name: "Кольцо",
    category: "jewelry",
    description: "Лаконичное украшение на каждый день",
    price: 1790,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600"
  },
  {
    name: "Серьги",
    category: "jewelry",
    description: "Изящные серьги для повседневного образа",
    price: 1490,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600"
  },
  {
    name: "Косметика для ухода",
    category: "beauty",
    description: "Средства для ежедневного ухода за кожей",
    price: 1490,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"
  },
  {
    name: "Парфюм",
    category: "beauty",
    description: "Парфюм для повседневного использования",
    price: 3990,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"
  },
  {
    name: "Керамическая кружка",
    category: "home",
    description: "Кружка для чая и кофе",
    price: 590,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600"
  },
  {
    name: "Настольная лампа",
    category: "home",
    description: "Лампа для рабочего стола",
    price: 2290,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"
  },
  {
    name: "Рюкзак",
    category: "accessories",
    description: "Практичный рюкзак для учёбы и путешествий",
    price: 3290,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
  },
  {
    name: "Бутылка для воды",
    category: "sport",
    description: "Многоразовая бутылка для тренировок и прогулок",
    price: 790,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600"
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