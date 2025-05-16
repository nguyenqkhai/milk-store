import api from "@services/apiClient";

class CategoryService {
    
    async getAllCategories() {
        try {
            const response = await api.public.get('/Category');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
    
}

export default new CategoryService();