import axios from 'axios';
import apiConfig from '../../config/apiConfig';

const API_BASE_URL = apiConfig.API_BASE_URL;

class CategoryService {
    
    async getAllCategories() {
        try {
            const response = await axios.get(`${API_BASE_URL}/Category`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
    
}

export default new CategoryService();