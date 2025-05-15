import axios from 'axios';
import apiConfig from '../../config/apiConfig';

const API_BASE_URL = apiConfig.API_BASE_URL;

class ProductService {
    /**
     * Get products with pagination and filtering
     * @param {Object} queryParams - Query parameters for filtering and pagination
     * @param {number} queryParams.pageNumber - Current page number (starting from 1)
     * @param {number} queryParams.pageSize - Number of items per page (max 20)
     * @param {string} [queryParams.categoryId] - Optional category ID filter
     * @param {string} [queryParams.trendId] - Optional trend ID filter
     * @param {string} [queryParams.searchTerm] - Optional search term
     * @param {string} [queryParams.sortBy] - Sort field (default: "ProductName")
     * @param {boolean} [queryParams.sortAscending] - Sort direction (default: true)
     * @returns {Promise} Promise containing the products data
     */
    async getProducts(queryParams) {
        try {
            // Convert the query parameters object to URL params
            const params = new URLSearchParams();

            // Add required parameters
            params.append('pageNumber', queryParams.pageNumber || 1);
            params.append('pageSize', queryParams.pageSize || 10);

            // Add optional parameters if they exist
            if (queryParams.categoryId) params.append('categoryId', queryParams.categoryId);
            if (queryParams.trendId) params.append('trendId', queryParams.trendId);
            if (queryParams.searchTerm) params.append('searchTerm', queryParams.searchTerm);

            // Add sorting parameters (with defaults if not provided)
            params.append('sortBy', queryParams.sortBy || 'ProductName');
            params.append('sortAscending', queryParams.sortAscending !== undefined ? queryParams.sortAscending : true);

            const response = await axios.get(`${API_BASE_URL}/Product/get-products`, { params });

            // Map the API response to the format needed by the UI
            const mappedProducts = response.data.data.items.map(item => ({
                id: item.productid,
                title: item.productName,
                description: item.description || '',
                rating: item.rate || 0,
                price: item.priceActive || item.priceDefault || 0,
                thumbnail: item.imageDTOs && item.imageDTOs.length > 0
                    ? item.imageDTOs[0].imageData
                    : 'https://via.placeholder.com/150',
                discountPercentage: item.priceDefault && item.priceActive && item.priceDefault > item.priceActive
                    ? Math.round(((item.priceDefault - item.priceActive) / item.priceDefault) * 100)
                    : 0,
                category: "Sữa", // Default category since it's not in the API response
                brand: item.brand || '',
                stockquantity: item.stockquantity || 0,
                bar: item.bar || '',
                sku: item.sku || '',
                statusName: item.statusName || 'Active',
                isActive: item.isActive
            }));

            return {
                metadata: response.data.data.metadata,
                products: mappedProducts
            };
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    /**
     * Get product details by ID
     * @param {string} id - Product ID
     * @returns {Promise} Promise containing the product data mapped to the format needed by the UI
     */
    async getProductById(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/Product/${id}`);

            // If the request was successful but the data structure doesn't match expectations
            if (!response.data.data) {
                throw new Error('Unexpected API response format');
            }

            const item = response.data.data;

            // Map the API response to the format needed by the UI
            const mappedProduct = {
                id: item.productid,
                name: item.productName,
                description: item.description || '',
                price: item.priceActive || item.priceDefault || 0,
                images: item.imageDTOs?.map(img => ({
                    id: img.imageid,
                    url: img.imageData,
                    order: img.order || null,
                    publicId: img.publicid || null
                })) || [],
                thumbnail: item.imageDTOs && item.imageDTOs.length > 0
                    ? item.imageDTOs[0].imageData
                    : 'https://via.placeholder.com/150',
                rating: 4.5, // Default rating
                discountPercentage: item.priceDefault && item.priceActive && item.priceDefault > item.priceActive
                    ? Math.round(((item.priceDefault - item.priceActive) / item.priceDefault) * 100)
                    : 0,
                category: "Sữa", // Default category
                brand: {
                    id: item.brand1 || '',
                    name: item.brand || ''
                },
                stockQuantity: item.stockquantity || 0,
                barcode: item.bar || '',
                sku: item.sku || '',
                status: {
                    id: item.statusId || '',
                    name: item.statusName || 'Active'
                },
                isActive: item.isActive,
                dimensions: item.dimensions || [],
                unit: {
                    id: item.unitId || '',
                    name: item.unit || ''
                },
                createdAt: item.createdAt || null,
                updatedAt: item.updatedAt || null
            };

            return {
                success: response.data.success,
                statusCode: response.data.statusCode,
                message: response.data.message,
                data: mappedProduct
            };
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            throw error;
        }
    }
    
    
}

export default new ProductService();