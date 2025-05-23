import api from "@services/apiClient";

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
            // Sử dụng api.public không cần token
            const response = await api.public.get('/Product/get-products', {
                pageNumber: queryParams.pageNumber || 1,
                pageSize: queryParams.pageSize || 10,
                categoryId: queryParams.categoryId || undefined,
                trendId: queryParams.trendId || undefined,
                searchTerm: queryParams.searchTerm || undefined,
                sortBy: queryParams.sortBy || 'ProductName',
                sortAscending: queryParams.sortAscending !== undefined ? queryParams.sortAscending : true
            });

            // Map the API response to the format needed by the UI
            const mappedProducts = response.data.data.items.map(item => ({
                id: item.productid,
                title: item.productName,
                description: item.description || '',
                rating: item.rate || 0,
                priceActive: item.priceActive|| 0,
                priceDefault: item.priceDefault || 0,
                thumbnail: item.imageDTOs && item.imageDTOs.length > 0
                    ? item.imageDTOs[0].imageData
                    : 'https://via.placeholder.com/150',
                discountPercentage: item.priceDefault && item.priceActive && item.priceDefault > item.priceActive
                    ? Math.round(((item.priceDefault - item.priceActive) / item.priceDefault) * 100)
                    : 0,
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
            // Sử dụng api.public không cần token
            const response = await api.public.get(`/Product/${id}`);

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
                priceActive: item.priceActive  || 0,
                priceDefault: item.priceDefault || 0,
                images: item.imageDTOs?.map(img => ({
                    id: img.imageid,
                    url: img.imageData,
                    order: img.order || null,
                    publicId: img.publicid || null
                })) || [],
                thumbnail: item.imageDTOs && item.imageDTOs.length > 0
                    ? item.imageDTOs[0].imageData
                    : 'https://via.placeholder.com/150',
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

    /**
     * Get reviews for a specific product
     * @param {string} productId - The ID of the product to get reviews for
     * @returns {Promise} Promise containing the reviews data
     */
    async getReviews(productId) {
        try {
            if (!productId) {
                throw new Error('Product ID is required');
            }

            const response = await api.public.get(`/Review/get-list-review`, {
                productId: productId
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch reviews');
            }

            return {
                success: response.data.success,
                statusCode: response.data.statusCode,
                message: response.data.message,
                data: response.data.data
            };
        } catch (error) {
            console.error(`Error fetching reviews for product ${productId}:`, error);
            throw error;
        }
    }

    async isAddReview(productId) {
        try {
            if (!productId) {
                throw new Error('Product ID is required');
            }

            const response = await api.get(`/Review/check-completed-order/${productId}`);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to check review status');
            }

            return {
                success: response.data.success,
                statusCode: response.data.statusCode,
                message: response.data.message,
                data: response.data.data
            };
        } catch (error) {
            console.error(`Error checking review status for product ${productId}:`, error);
            throw error;
        }
    }

    async createReview(productId, stars) {
        try {
            if (!productId || !stars) {
                throw new Error('Product ID and stars are required');
            }

            const response = await api.post(`/Review/create-review`, {
                productId: productId,
                rate: stars
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to create review');
            }

            return {
                success: response.data.success,
                statusCode: response.data.statusCode,
                message: response.data.message,
                data: response.data.data
            };
        } catch (error) {
            console.error(`Error creating review for product ${productId}:`, error);
            throw error;
        }
    }

    async deleteReview(reviewId) {
        try {
            if (!reviewId) {
                throw new Error('Review ID is required');
            }

            const response = await api.delete(`/Review/delete-review/${reviewId}`);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to delete review');
            }

            return {
                success: response.data.success,
                statusCode: response.data.statusCode,
                message: response.data.message,
                data: response.data.data
            };
        } catch (error) {
            console.error(`Error deleting review with ID ${reviewId}:`, error);
            throw error;
        }
    }
}

export default new ProductService();