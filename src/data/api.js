const BASE = 'http://localhost:4000/api';

const get = async (path) => {
  const res = await fetch(BASE + path);
  return res.json();
};

const post = async (path, body) => {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
};

// Use mock data when backend unavailable
const mockListings = [
  { id: 1, title: 'Modern 3-Bedroom Sky Villa', price: 185000, pricePerM2: 1302, size: 142, rooms: 3, floor: 12, totalFloors: 16, district: 'Mirabad', city: 'Tashkent', status: 'underpriced', badge: 'AI UNDERPRICED', estimatedValue: 198400, images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop'], description: 'Experience elevated urban living in this stunning 12th-floor Sky Villa. This meticulously designed 3-bedroom residence features an open-concept living area with panoramic views of central Tashkent. The interior boasts premium materials, including Italian marble surfaces and oak flooring. The master suite offers a private balcony and a spa-like bathroom.', amenities: ['Air Conditioning','Central Heating','High-speed WiFi','Smart Home','Parking Space','Balcony'], address: 'Amir Temur Avenue, Tashkent, Uzbekistan', lat: 41.2995, lng: 69.2401, agent: { name: 'Aziz Rakhimov', title: 'Premium Realty Expert', rating: 4.9, reviews: 128 }, views: 1240, favorites: 48, inquiries: 12 },
  { id: 2, title: 'Skyline Garden Penthouse', price: 142000, pricePerM2: 1543, size: 92, rooms: 3, floor: 18, totalFloors: 20, district: 'Yunusabad', city: 'Tashkent', status: 'underpriced', badge: 'UNDERPRICED -12%', estimatedValue: 161000, images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop'], description: 'Luxury penthouse with garden terrace and city views.', amenities: ['Air Conditioning','Smart Home','Balcony','Parking Space'], address: 'Yunusabad District, Block 4, Tashkent', lat: 41.3311, lng: 69.2797, agent: { name: 'Malika Yusupova', title: 'Senior Consultant', rating: 4.7, reviews: 89 }, views: 980, favorites: 36, inquiries: 8 },
  { id: 3, title: 'Mirzo Ulugbek Residence', price: 89500, pricePerM2: 1316, size: 68, rooms: 2, floor: 5, totalFloors: 12, district: 'Mirzo Ulugbek', city: 'Tashkent', status: 'fair', badge: 'FAIR PRICE', estimatedValue: 91000, images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop'], description: 'Comfortable 2-room apartment in peaceful district.', amenities: ['Air Conditioning','Central Heating','Balcony'], address: 'Mirzo Ulugbek District, Tashkent', lat: 41.3205, lng: 69.3147, agent: { name: 'Bobur Tashmatov', title: 'Property Specialist', rating: 4.5, reviews: 54 }, views: 645, favorites: 22, inquiries: 5 },
  { id: 4, title: 'Central Park Studio', price: 115000, pricePerM2: 2555, size: 45, rooms: 1, floor: 8, totalFloors: 24, district: 'Center-1', city: 'Tashkent', status: 'overpriced', badge: 'OVERPRICED +18%', estimatedValue: 97500, images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop'], description: 'Premium studio in the heart of the city center.', amenities: ['Air Conditioning','High-speed WiFi','Smart Home'], address: 'Center-1 District, Tashkent', lat: 41.2934, lng: 69.2349, agent: { name: 'Nilufar Karimova', title: 'City Center Expert', rating: 4.3, reviews: 41 }, views: 430, favorites: 15, inquiries: 3 },
  { id: 5, title: 'Comfort Plaza Apartments', price: 76000, pricePerM2: 1381, size: 55, rooms: 2, floor: 3, totalFloors: 9, district: 'Chilanzar', city: 'Tashkent', status: 'underpriced', badge: 'UNDERPRICED -5%', estimatedValue: 80000, images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop'], description: 'Family-friendly apartment in Chilanzar district.', amenities: ['Central Heating','Balcony','Parking Space'], address: 'Chilanzar District, Tashkent', lat: 41.2856, lng: 69.2003, agent: { name: 'Sardor Mirzayev', title: 'Family Homes Expert', rating: 4.6, reviews: 73 }, views: 520, favorites: 19, inquiries: 6 },
  { id: 6, title: 'Serene View Heights', price: 128000, pricePerM2: 1454, size: 88, rooms: 3, floor: 10, totalFloors: 16, district: 'Yakkasaray', city: 'Tashkent', status: 'fair', badge: 'FAIR PRICE', estimatedValue: 130000, images: ['https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&auto=format&fit=crop'], description: '3-room apartment with beautiful city views.', amenities: ['Air Conditioning','High-speed WiFi','Balcony'], address: 'Yakkasaray District, Tashkent', lat: 41.2789, lng: 69.2567, agent: { name: 'Gulnora Rashidova', title: 'Premium Consultant', rating: 4.8, reviews: 112 }, views: 890, favorites: 31, inquiries: 9 },
  { id: 7, title: 'Tech District Loft', price: 62500, pricePerM2: 1488, size: 42, rooms: 1, floor: 6, totalFloors: 20, district: 'Yunusabad', city: 'Tashkent', status: 'underpriced', badge: 'UNDERPRICED -10%', estimatedValue: 69500, images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'], description: 'Modern loft near IT Park, perfect for tech professionals.', amenities: ['High-speed WiFi','Smart Home','Air Conditioning'], address: 'IT Park Area, Tashkent', lat: 41.3456, lng: 69.2901, agent: { name: 'Jasur Umarov', title: 'Modern Living Expert', rating: 4.4, reviews: 38 }, views: 340, favorites: 14, inquiries: 4 },
  { id: 8, title: 'Garden Villa, Yunusabad', price: 210000, pricePerM2: 875, size: 240, rooms: 5, floor: 1, totalFloors: 2, district: 'Yunusabad', city: 'Tashkent', status: 'fair', badge: 'FAIR PRICE', estimatedValue: 215000, images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop'], description: 'Spacious family villa with private garden.', amenities: ['Air Conditioning','Central Heating','Parking Space','Balcony','Smart Home'], address: 'Yunusabad District, Tashkent', lat: 41.3401, lng: 69.2856, agent: { name: 'Aziz Rakhimov', title: 'Premium Realty Expert', rating: 4.9, reviews: 128 }, views: 1560, favorites: 67, inquiries: 23 },
  { id: 9, title: 'Penthouse with City Views', price: 210000, pricePerM2: 1166, size: 180, rooms: 3, floor: 22, totalFloors: 24, district: 'Mirabad', city: 'Tashkent', status: 'fair', badge: 'FAIR PRICE', estimatedValue: 212000, images: ['https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&auto=format&fit=crop'], description: 'Stunning penthouse with 360-degree city views.', amenities: ['Air Conditioning','Smart Home','Balcony','High-speed WiFi'], address: 'Mirabad District, Tashkent', lat: 41.2967, lng: 69.2423, agent: { name: 'Malika Yusupova', title: 'Senior Consultant', rating: 4.7, reviews: 89 }, views: 1120, favorites: 52, inquiries: 18 },
  { id: 10, title: 'High-Ceiling Studio, Mirabad', price: 68500, pricePerM2: 1245, size: 55, rooms: 1, floor: 4, totalFloors: 12, district: 'Mirabad', city: 'Tashkent', status: 'underpriced', badge: 'UNDERPRICED -8%', estimatedValue: 74500, images: ['https://images.unsplash.com/photo-1560185127-6a9d5f94b25a?w=800&auto=format&fit=crop'], description: 'Stylish studio with high ceilings in premium location.', amenities: ['Air Conditioning','High-speed WiFi'], address: 'Mirabad District, Tashkent', lat: 41.3012, lng: 69.2389, agent: { name: 'Bobur Tashmatov', title: 'Property Specialist', rating: 4.5, reviews: 54 }, views: 410, favorites: 17, inquiries: 5 },
];

export const api = {
  getListings: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      return await get(`/listings?${query}`);
    } catch {
      let result = [...mockListings];
      if (params.district) result = result.filter(l => l.district.toLowerCase().includes(params.district.toLowerCase()));
      if (params.rooms) result = result.filter(l => l.rooms === parseInt(params.rooms));
      if (params.minPrice) result = result.filter(l => l.price >= parseInt(params.minPrice));
      if (params.maxPrice) result = result.filter(l => l.price <= parseInt(params.maxPrice));
      if (params.sort === 'price_asc') result.sort((a, b) => a.price - b.price);
      if (params.sort === 'price_desc') result.sort((a, b) => b.price - a.price);
      return { total: result.length, listings: result };
    }
  },
  getListing: async (id) => {
    try { return await get(`/listings/${id}`); }
    catch { return mockListings.find(l => l.id === parseInt(id)); }
  },
  getMarket: async () => {
    try { return await get('/market'); }
    catch { return [
      { city: 'TASHKENT', pricePerM2: '$1,240/m²', change: '+4.2%', trend: 'up', note: 'High demand in Mirabad district driving prices up.' },
      { city: 'SAMARKAND', pricePerM2: '$890/m²', change: 'Stable', trend: 'stable', note: 'Increased interest in commercial renovation areas.' },
      { city: 'BUKHARA', pricePerM2: '$720/m²', change: '+2.5%', trend: 'up', note: 'Tourist growth sparking residential rental yields.' },
    ]; }
  },
  getValuation: async (data) => {
    try { return await post('/valuation', data); }
    catch {
      const estimated = Math.round(data.price * (0.9 + Math.random() * 0.2));
      const diff = ((estimated - data.price) / data.price * 100).toFixed(1);
      return { currentPrice: data.price, estimatedValue: estimated, priceDiff: diff, status: diff > 5 ? 'underpriced' : diff < -5 ? 'overpriced' : 'fair', factors: ['High renovation quality score (8.4/10)', 'Proximity to metro (300m)', 'New building premium (Built 2023)'] };
    }
  },
  login: async (email, password) => {
    try { return await post('/auth/login', { email, password }); }
    catch { return { token: 'mock-token', user: { id: 1, name: 'Alisher Karimov', email: 'alisher.k@uynarx.ai', premium: true, credits: 124 } }; }
  },
};

export { mockListings };
