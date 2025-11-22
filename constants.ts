import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'new', name: 'חדש', image: 'https://picsum.photos/100/100?random=101' },
  { id: 'dresses', name: 'שמלות', image: 'https://picsum.photos/100/100?random=102' },
  { id: 'tops', name: 'חולצות', image: 'https://picsum.photos/100/100?random=103' },
  { id: 'pants', name: 'מכנסיים', image: 'https://picsum.photos/100/100?random=104' },
  { id: 'shoes', name: 'נעליים', image: 'https://picsum.photos/100/100?random=105' },
  { id: 'accessories', name: 'אביזרים', image: 'https://picsum.photos/100/100?random=106' },
  { id: 'sport', name: 'ספורט', image: 'https://picsum.photos/100/100?random=107' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "שמלת ערב שחורה קלאסית",
    price: 89.90,
    originalPrice: 129.90,
    discount: 30,
    imageUrl: "https://picsum.photos/400/600?random=1",
    rating: 4.8,
    reviews: 120,
    isNew: true,
    category: "dresses"
  },
  {
    id: 2,
    title: "חולצת קיץ פרחונית",
    price: 45.00,
    imageUrl: "https://picsum.photos/400/600?random=2",
    rating: 4.5,
    reviews: 85,
    category: "tops"
  },
  {
    id: 3,
    title: "ג'ינס סקיני בהיר",
    price: 110.00,
    originalPrice: 150.00,
    discount: 26,
    imageUrl: "https://picsum.photos/400/600?random=3",
    rating: 4.2,
    reviews: 200,
    category: "pants"
  },
  {
    id: 4,
    title: "תיק צד אופנתי",
    price: 55.90,
    imageUrl: "https://picsum.photos/400/600?random=4",
    rating: 4.9,
    reviews: 45,
    isNew: true,
    category: "accessories"
  },
  {
    id: 5,
    title: "סט טופ ומכנסיים קז'ואל",
    price: 99.90,
    originalPrice: 149.90,
    discount: 33,
    imageUrl: "https://picsum.photos/400/600?random=5",
    rating: 4.7,
    reviews: 310,
    category: "tops"
  },
  {
    id: 6,
    title: "נעלי סניקרס לבנות",
    price: 129.90,
    imageUrl: "https://picsum.photos/400/600?random=6",
    rating: 4.6,
    reviews: 98,
    category: "shoes"
  },
  {
    id: 7,
    title: "שרשרת זהב עדינה",
    price: 29.90,
    originalPrice: 49.90,
    discount: 40,
    imageUrl: "https://picsum.photos/400/600?random=7",
    rating: 4.3,
    reviews: 15,
    category: "accessories"
  },
  {
    id: 8,
    title: "חולצת טי בסיסית כותנה",
    price: 39.90,
    imageUrl: "https://picsum.photos/400/600?random=8",
    rating: 4.5,
    reviews: 500,
    category: "tops"
  },
  {
    id: 9,
    title: "שמלת מקסי לחוף",
    price: 79.90,
    originalPrice: 99.90,
    discount: 20,
    imageUrl: "https://picsum.photos/400/600?random=9",
    rating: 4.8,
    reviews: 67,
    isNew: true,
    category: "dresses"
  },
  {
    id: 10,
    title: "משקפי שמש רטרו",
    price: 19.90,
    imageUrl: "https://picsum.photos/400/600?random=10",
    rating: 4.1,
    reviews: 32,
    category: "accessories"
  },
  {
    id: 11,
    title: "חצאית מיני משובצת",
    price: 65.00,
    imageUrl: "https://picsum.photos/400/600?random=11",
    rating: 4.6,
    reviews: 105,
    category: "dresses"
  },
  {
    id: 12,
    title: "מעיל טרנץ' דק",
    price: 189.90,
    originalPrice: 250.00,
    discount: 24,
    imageUrl: "https://picsum.photos/400/600?random=12",
    rating: 4.9,
    reviews: 21,
    isNew: true,
    category: "tops"
  }
];