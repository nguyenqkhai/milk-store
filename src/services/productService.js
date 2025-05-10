/**
 * Service for fetching and managing product data
 */
import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://milkstore-grbpfnduezbpgvgc.eastasia-01.azurewebsites.net/api';

/**
 * Creates an axios instance with common configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Maps product categories based on product name
 * @param {Object} product - The product object from the API
 * @returns {String} The mapped category
 */
const mapProductCategory = (product) => {
  const name = product.productName.toLowerCase();

  if (name.includes('sữa tươi') || name.includes('vinamilk') || name.includes('th true milk')) {
    return 'Sữa tươi';
  } else if (name.includes('sữa chua')) {
    return 'Sữa chua';
  } else if (name.includes('sữa đặc') || name.includes('ông thọ')) {
    return 'Sữa đặc';
  } else if (name.includes('sữa hạt') || name.includes('óc chó') || name.includes('đậu nành')) {
    return 'Sữa hạt';
  } else {
    return 'Khác';
  }
};

/**
 * Maps product brand codes to brand names
 * @param {String} brandCode - The brand code from the API
 * @returns {String} The brand name
 */
const mapBrandName = (brandCode) => {
  const brandMap = {
    'B001': 'Vinamilk',
    'B002': 'TH True Milk',
    'B003': 'Mộc Châu',
    // Add more brand mappings as needed
  };

  return brandMap[brandCode] || 'Khác';
};

/**
 * Generates a placeholder thumbnail URL
 * @returns {String} A placeholder image URL
 */
const generatePlaceholderThumbnail = () => {
  return 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png';
};

/**
 * Generates a placeholder price based on product attributes
 * @param {Object} product - The product object from the API
 * @returns {Number} A placeholder price
 */
const generatePlaceholderPrice = (product) => {
  // Simple logic to generate different prices based on product type
  const name = product.productName.toLowerCase();

  if (name.includes('lốc') || name.includes('thùng')) {
    return 30000 + Math.floor(Math.random() * 10000);
  } else if (name.includes('hộp')) {
    return 20000 + Math.floor(Math.random() * 5000);
  } else {
    return 25000 + Math.floor(Math.random() * 15000);
  }
};

/**
 * Generates a placeholder rating
 * @returns {Number} A placeholder rating between 4.0 and 5.0
 */
const generatePlaceholderRating = () => {
  // Generate a random rating between 4.0 and 5.0
  return (4.0 + Math.random()).toFixed(1);
};

/**
 * Adapts a single product from the API format to the frontend format
 * @param {Object} apiProduct - A product object from the API
 * @returns {Object} A product object in the frontend format
 */
const adaptProduct = (apiProduct) => {
  if (!apiProduct) return null;

  // Sort imageDTOs by order if available
  let sortedImageDTOs = [];
  if (apiProduct.imageDTOs && apiProduct.imageDTOs.length > 0) {
    // Create a copy of the array to avoid modifying the original
    sortedImageDTOs = [...apiProduct.imageDTOs];

    // Sort by order (convert to number for proper sorting)
    sortedImageDTOs.sort((a, b) => {
      const orderA = parseInt(a.order) || 999; // Default to a high number if order is not a valid number
      const orderB = parseInt(b.order) || 999;
      return orderA - orderB;
    });
  }

  // Find the image with order = "1" or use the first image or a placeholder
  let thumbnail = generatePlaceholderThumbnail();

  if (sortedImageDTOs.length > 0) {
    // Try to find an image with order = "1"
    const primaryImage = sortedImageDTOs.find(img => img.order === "1");

    if (primaryImage) {
      thumbnail = primaryImage.imageData;
    } else {
      // If no image with order = "1" is found, use the first image
      thumbnail = sortedImageDTOs[0].imageData;
    }
  }

  // Use the price from the API or generate a placeholder
  const price = apiProduct.priceActive || apiProduct.priceDefault || generatePlaceholderPrice(apiProduct);

  // Calculate a discount percentage (for display purposes)
  const discountPercentage = apiProduct.priceActive && apiProduct.priceDefault && apiProduct.priceActive < apiProduct.priceDefault
    ? Math.round(((apiProduct.priceDefault - apiProduct.priceActive) / apiProduct.priceDefault) * 100)
    : 0;

  return {
    id: apiProduct.productid,
    title: apiProduct.productName,
    category: mapProductCategory(apiProduct),
    description: apiProduct.description,
    price: price,
    rating: generatePlaceholderRating(),
    thumbnail: thumbnail,
    discountPercentage: discountPercentage,
    stockquantity: apiProduct.stockquantity,
    brand: apiProduct.brand || mapBrandName(apiProduct.brand1),
    sku: apiProduct.sku,
    isActive: apiProduct.isActive,
    statusId: apiProduct.statusId,
    statusName: apiProduct.statusName,
    unit: apiProduct.unit,
    // Include the sorted imageDTOs for use in the product detail page
    imageDTOs: sortedImageDTOs
  };
};

/**
 * Fetches all products from the API and adapts them to the frontend format
 * @returns {Promise<Array>} Promise that resolves to an array of adapted products
 */
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/Product');

    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data.map(product => adaptProduct(product));
    } else {
      console.error('Invalid API response format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetches paginated products from the API
 * @param {Object} params - Query parameters for the API
 * @param {number} params.pageNumber - The page number to fetch
 * @param {number} params.pageSize - The number of items per page
 * @param {string} [params.categoryId] - Optional category ID to filter by
 * @param {string} [params.trendId] - Optional trend ID to filter by
 * @param {string} [params.searchTerm] - Optional search term
 * @param {string} [params.sortBy] - Optional field to sort by
 * @param {boolean} [params.sortAscending] - Optional sort direction
 * @returns {Promise<Object>} Promise that resolves to an object with items and metadata
 */
export const fetchPaginatedProducts = async (params) => {
  try {
    // Ensure required parameters are set
    const queryParams = {
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 10,
      sortBy: params.sortBy || 'ProductName',
      sortAscending: params.sortAscending !== undefined ? params.sortAscending : true
    };

    // Add optional parameters if they exist
    if (params.categoryId) queryParams.categoryId = params.categoryId;
    if (params.trendId) queryParams.trendId = params.trendId;
    if (params.searchTerm) queryParams.searchTerm = params.searchTerm;

    const response = await apiClient.get('/Product/get-products', { params: queryParams });

    if (response.data && response.data.success && response.data.data) {
      const { items, metadata } = response.data.data;

      return {
        items: Array.isArray(items) ? items.map(product => adaptProduct(product)) : [],
        metadata: metadata || {
          pageNumber: 1,
          pageSize: 10,
          totalCount: 0,
          totalPages: 0,
          hasPrevious: false,
          hasNext: false
        }
      };
    } else {
      console.error('Invalid API response format:', response.data);
      return { items: [], metadata: { pageNumber: 1, pageSize: 10, totalCount: 0, totalPages: 0 } };
    }
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    throw error;
  }
};

/**
 * Fetches a single product by ID from the API and adapts it to the frontend format
 * @param {string} productId - The ID of the product to fetch
 * @returns {Promise<Object>} Promise that resolves to the adapted product
 */
export const fetchProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/Product/${productId}`);

    if (response.data && response.data.success && response.data.data) {
      return adaptProduct(response.data.data);
    } else {
      console.error('Invalid API response format:', response.data);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};
