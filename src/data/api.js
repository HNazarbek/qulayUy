// ═══════════════════════════════════════════════════════════════
// qulayUy — API connector (Node.js + MongoDB backend)
// ═══════════════════════════════════════════════════════════════

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// ─── Token boshqaruvi ────────────────────────────────────────
export const getToken = ()  => localStorage.getItem('token');
export const setToken = (t) => localStorage.setItem('token', t);
export const removeToken = ()=> localStorage.removeItem('token');

// ─── Asosiy request funksiyasi ───────────────────────────────
const request = async (path, options = {}) => {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(BASE + path, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      removeToken();
      // window.location.reload(); // Optional: depend on UX
    }
    throw new Error(data.message || `Xato: ${res.status}`);
  }
  return data;
};

// ─── Multipart (rasm yuklash uchun) ──────────────────────────
const requestMultipart = async (path, formData, method = 'POST') => {
  const token = getToken();
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(BASE + path, { method, headers, body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Xato: ${res.status}`);
  return data;
};

// ═══════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════
export const authApi = {
  // Kirish
  login: async (email, password) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
  },

  // Ro'yxatdan o'tish
  register: async (name, email, password) => {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
  },

  // Chiqish
  logout: () => removeToken(),

  // Joriy foydalanuvchi
  getMe: () => request('/auth/me'),

  // Profilni yangilash
  updateProfile: (updates) => request('/auth/update', {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  // Hisobni o'chirish
  deleteAccount: () => request('/auth/delete', { method: 'DELETE' }),

  // Admin: barcha userlar
  getAllUsers: () => request('/auth/users'),

  // Admin: userni bloklash
  blockUser: (id) => request(`/auth/users/${id}/block`, { method: 'PUT' }),
};

// ═══════════════════════════════════════════════════════════════
// LISTINGS
// ═══════════════════════════════════════════════════════════════
export const listingApi = {
  // Barcha e'lonlar (filter + pagination)
  getAll: (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v != null && v !== ''))
    ).toString();
    return request(`/listings?${query}`);
  },

  // Bitta e'lon
  getOne: (id) => request(`/listings/${id}`),

  // Yangi e'lon yaratish (admin, rasm bilan)
  create: (formData) => requestMultipart('/listings', formData),

  // E'lonni yangilash (admin)
  update: (id, formData) => requestMultipart(`/listings/${id}`, formData, 'PUT'),

  // E'lonni o'chirish (admin)
  delete: (id) => request(`/listings/${id}`, { method: 'DELETE' }),

  // Sevimliga qo'shish/olib tashlash
  toggleFavorite: (id) => request(`/listings/${id}/favorite`, { method: 'POST' }),

  // Sevimlillar ro'yxati
  getFavorites: () => request('/listings/user/favorites'),

  // Murojaat yuborish
  addInquiry: (id) => request(`/listings/${id}/inquiry`, { method: 'POST' }),
};

// ═══════════════════════════════════════════════════════════════
// MARKET
// ═══════════════════════════════════════════════════════════════
export const marketApi = {
  // Bozor ma'lumotlari
  getMarket: () => request('/market'),

  // Narx baholash (AI valuation)
  getValuation: (data) => request('/market/valuation', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ═══════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════
export const notificationApi = {
  getAll:      () => request('/notifications'),
  markAllRead: () => request('/notifications/read-all', { method: 'PUT' }),
  markOneRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),
};

// ═══════════════════════════════════════════════════════════════
// Unified API (exported as 'api')
// ═══════════════════════════════════════════════════════════════
export const api = {
  // E'lonlar
  getListings: async (params = {}) => {
    return await listingApi.getAll(params);
  },

  getListing: async (id) => {
    const data = await listingApi.getOne(id);
    return data.listing || data;
  },

  getMarket: async () => {
    const data = await marketApi.getMarket();
    return data.regions || data;
  },

  getValuation: async (formData) => {
    return await marketApi.getValuation(formData);
  },

  login: async (email, password) => {
    return await authApi.login(email, password);
  },

  register: async (name, email, password) => {
    return await authApi.register(name, email, password);
  },

  getMe: async () => {
    return await authApi.getMe();
  },

  toggleFavorite: async (id) => {
    return await listingApi.toggleFavorite(id);
  },

  getFavorites: async () => {
    return await listingApi.getFavorites();
  },

  addInquiry: async (id) => {
    return await listingApi.addInquiry(id);
  },

  createListing: async (formData) => {
    return await listingApi.create(formData);
  },

  getNotifications: async () => {
    return await notificationApi.getAll();
  },

  markAllNotificationsRead: async () => {
    return await notificationApi.markAllRead();
  }
};

export default api;
