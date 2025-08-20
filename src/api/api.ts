import axios from "axios";

const api = axios.create({
  baseURL: "https://frontend-test-api-eta.vercel.app",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },


  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
};


export const bookmarksService = {
  // Récupérer tous les bookmarks
  getAll: async () => {
    const response = await api.get('/bookmarks');
    return response.data;
  },

  // Créer un bookmark
  create: async (bookmarkData: any) => {
    // Timeout spécifique pour la création (plus long)
    const response = await api.post('/bookmarks', bookmarkData, {
      timeout: 45000 // 45 secondes pour la création
    });
    return response.data;
  },

  // Mettre à jour un bookmark
  update: async (id: string, bookmarkData: any) => {
    const response = await api.put(`/bookmarks/${id}`, bookmarkData);
    return response.data;
  },

  // Supprimer un bookmark
  delete: async (id: string) => {
    const response = await api.delete(`/bookmarks/${id}`);
    return response.data;
  },

  // Récupérer les statistiques
  getStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },
};

export default api;