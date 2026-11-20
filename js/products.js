const products = [
  {
    name: "Ударная дрель PRO 850",
    popular: true,
    category: "power",
    description: "Мощная ударная дрель 850 Вт для сверления бетона, металла и дерева",
    price: 8490,
    image: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/dreli-elektricheskie/60563/560x504/52589790.jpg"
  },
  {
    name: "Угловая шлифмашина Industrial 125",
    popular: true,
    category: "power",
    description: "Профессиональная УШМ с диаметром диска 125 мм и мощностью 1100 Вт",
    price: 5790,
    image: "https://cdn.suprabazar.be/media/a7/56/dd/1750389869/powerplus-powx0614-haakse-slijper-1200-w-125-mm-20116622.jpg"
  },
  {
    name: "Аккумуляторный шуруповёрт 18V",
    popular: true,
    category: "power",
    description: "Компактный шуруповёрт с аккумулятором 18 В для монтажных работ",
    price: 6990,
    image: "https://cdn11.bigcommerce.com/s-366td19vbm/images/stencil/1280x1280/products/755/14360/Black_and_Decker_BDCDD12K_10.8V_Cordless_Drill_Driver_-_2__93513.1662514184.jpg?c=1"
  },
  {
    name: "Перфоратор Heavy Duty",
    popular: true,
    category: "power",
    description: "Мощный перфоратор для сверления и долбления твёрдых материалов",
    price: 12490,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVRHS08UVoOgtu0IkUbC6kPXOsDpYnZf7Z-SPtU4UxGCefa-XH58l08wBN&s=10"
  },
  {
    name: "Циркулярная пила PRO 1400",
    category: "power",
    description: "Электрическая дисковая пила для точной обработки древесины",
    price: 9990,
    image: "https://media.bunnings.com.au/api/public/content/3da81d779a9c449292cfb6b5dd9a8243?t=w700dpr1&v=42cc2b61"
  },
  {
    name: "Электролобзик Compact",
    category: "power",
    description: "Электролобзик для фигурного и прямого распила древесины",
    price: 4590,
    image: "https://cdn.bigam.ru/iblock/438/1weih091sl88clnkexl48japz0knh4vz/166932.jpg"
  },
  {
    name: "Набор инструментов 94 предмета",
    popular: true,
    category: "hand",
    description: "Универсальный набор головок, ключей и отвёрток в прочном кейсе",
    price: 6990,
    image: "https://homemode.cdn.shoprenter.hu/custom/homemode/image/cache/w900h900wt1q100/BARKACS/HM-03337/Nevtelen1.png.webp?lastmod=1755098359.1755269476"
  },
  {
    name: "Набор отвёрток Industrial",
    category: "hand",
    description: "Профессиональный комплект отвёрток с магнитными наконечниками",
    price: 1490,
    image: "https://www.jtcrussia.ru/product_pictures/clean/955/503547.jpg"
  },
  {
    name: "Разводной ключ 300 мм",
    category: "hand",
    description: "Прочный разводной ключ для сантехнических и монтажных работ",
    price: 1290,
    image: "https://my.stanleytools.global/ASIA/PRODUCT/IMAGES/HIRES/Ecomm_Large-STMT87432-8_2.jpg?resize=530x530"
  },
  {
    name: "Плоскогубцы усиленные",
    category: "hand",
    description: "Универсальные пассатижи с эргономичными нескользящими ручками",
    price: 890,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNv9ImJ4PoUonMDY4vwt9HNg3asGlNLhj4jH2o9hEfm4fyBKAxWT6Si0I&s=10"
  },
  {
    name: "Молоток слесарный 500 г",
    category: "hand",
    description: "Надёжный слесарный молоток с усиленной рукояткой",
    price: 790,
    image: "https://assets.unilogcorp.com/732/ITEM/IMG/Claw%20Hammer%20Fiberglass%20Handle%20102716154.png"
  },
  {
    name: "Рулетка Industrial 5 м",
    category: "hand",
    description: "Измерительная рулетка с фиксатором и прорезиненным корпусом",
    price: 490,
    image: "https://hardwarepasal.com/src/img/product/2026-02-09-11-12-29_kXdULFITzLproduct.png"
  },
  {
    name: "Сварочный аппарат MMA 250",
    category: "equipment",
    description: "Инверторный сварочный аппарат для профессиональных сварочных работ",
    price: 15990,
    image: "https://mirdachi.by/wp-content/uploads/2022/01/invertornyy-svarochnyy-apparat-shtenli-304-314rnd.jpg"
  },
  {
    name: "Компрессор воздушный 50 л",
    category: "equipment",
    description: "Воздушный компрессор для пневмоинструмента и мастерской",
    price: 18990,
    image: "https://mobileimages.lowes.com/productimages/f010cefd-dba4-4e6d-97fe-d40ac0486ae7/44431102.jpg?size=pdhism"
  },
  {
    name: "Строительный фен PRO",
    category: "equipment",
    description: "Термовоздушный фен с регулировкой температуры и потока воздуха",
    price: 3290,
    image: "https://cdn.insales-shop.ru/images/products/1/5550/879490478/%D1%81%D0%B1%D0%BE%D0%BA%D1%83_2300_%D0%BE%D0%B1%D1%8B%D1%87%D0%BD%D1%8B%D0%B9.png"
  },
  {
    name: "Лазерный уровень 360°",
    popular: true,
    category: "equipment",
    description: "Самовыравнивающийся лазерный уровень для точной разметки",
    price: 5490,
    image: "https://www.geooptic.ru/static/thumbs/4ba1a676327ce2877f45071e33e99fe5ca22cc0c-0.jpg"
  },
  {
    name: "Набор сверл по металлу",
    category: "accessories",
    description: "Комплект высокопрочных спиральных сверл в металлическом кейсе",
    price: 1290,
    image: "https://profinstrument.su/files/goods/48/48397/bigs/00.jpg"
  },
  {
    name: "Отрезные диски 125 мм",
    category: "accessories",
    description: "Комплект абразивных дисков для резки металла",
    price: 590,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLEzfxMuJ0ciYwvC3dwCKPZQZtaB3or3RgNTF5ulMNg&s"
  },
  {
    name: "Защитные рабочие перчатки",
    category: "accessories",
    description: "Износостойкие перчатки для строительных и монтажных работ",
    price: 490,
    image: "https://brodeks.ru/upload/resize_cache/iblock/3fd/600_600_1/ir3bnmii3chj9k22ury46v9tqd3yvr0w.webp"
  },
  {
    name: "Очки защитные Industrial",
    category: "accessories",
    description: "Защитные очки с прозрачными ударопрочными линзами",
    price: 690,
    image: "https://img.medicalexpo.ru/images_me/photo-m2/78080-13014493.jpg"
  }
];

const categories = {
  all: "Все товары",
  power: "Электроинструменты",
  hand: "Ручные инструменты",
  equipment: "Оборудование",
  accessories: "Аксессуары"
};