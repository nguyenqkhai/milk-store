import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { AlertCircle, CheckCircle } from 'lucide-react';
import ProductService from '../../../services/Product/ProductServices';
import { useAuth } from '../../../context/AuthContext';

const AddReview = ({ productId, onReviewAdded }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [canReview, setCanReview] = useState(false);
    const [checkingEligibility, setCheckingEligibility] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const checkReviewEligibility = async () => {
            try {
                setCheckingEligibility(true);
                const response = await ProductService.isAddReview(productId);
                setCanReview(response?.data || false);
            } catch (err) {
                console.error('Error checking review eligibility:', err);
                setCanReview(false);
            } finally {
                setCheckingEligibility(false);
            }
        };

        if (productId && isAuthenticated) {
            checkReviewEligibility();
        } else {
            setCheckingEligibility(false);
            setCanReview(false);
        }
    }, [productId, isAuthenticated]);

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }

        if (rating === 0) {
            setError('Vui lòng chọn số sao đánh giá');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await ProductService.createReview(productId, rating, content);

            if (response?.success) {
                setSuccess('Đánh giá của bạn đã được gửi thành công!');
                setContent('');
                setRating(0);

                if (onReviewAdded) {
                    onReviewAdded();
                }

                setTimeout(() => {
                    setSuccess('');
                }, 5000);
            } else {
                setError(response?.message || 'Có lỗi xảy ra khi gửi đánh giá');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('Không thể gửi đánh giá. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="text-center py-4 text-gray-600">
                    <AlertCircle className="inline-block w-6 h-6 text-yellow-500 mb-2" />
                    <p>Vui lòng đăng nhập để đánh giá sản phẩm này</p>
                </div>
            </div>
        );
    }

    if (checkingEligibility) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex justify-center items-center h-16">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (!canReview) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="text-center py-4 text-gray-600">
                    <AlertCircle className="inline-block w-6 h-6 text-yellow-500 mb-2" />
                    <p>Bạn cần mua và nhận sản phẩm này trước khi đánh giá</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <h2 className="text-xl font-semibold mb-4">Đánh giá của bạn</h2>

            {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {success}
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {error}
                </div>
            )}

            <div>
                <div className="mb-4">
                    <div className="block mb-2 font-medium">Đánh giá sao</div>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;

                            return (
                                <div key={index} className="cursor-pointer" onClick={() => setRating(ratingValue)}>
                                    <FaStar
                                        className="w-8 h-8 mr-1"
                                        color={ratingValue <= (hover || rating) ? "#FBBF24" : "#e4e5e9"}
                                        size={24}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="block mb-2 font-medium">
                        Nội dung đánh giá (không bắt buộc)
                    </div>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <div
                    onClick={loading ? null : handleSubmit}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-block ${loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? (
                        <>
                            <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 align-middle"></span>
                            Đang gửi...
                        </>
                    ) : (
                        'Gửi đánh giá'
                    )}
                </div>
            </div>
        </div>
    );
};

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await ProductService.getReviews(productId);

            if (response?.data) {
                setReviews(response.data);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Có lỗi xảy ra khi tải đánh giá sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchReviews();
        }
    }, [productId]);

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length).toFixed(1)
        : 0;

    const ratingCounts = {
        5: reviews.filter(review => review.rate === 5).length,
        4: reviews.filter(review => review.rate === 4).length,
        3: reviews.filter(review => review.rate === 3).length,
        2: reviews.filter(review => review.rate === 2).length,
        1: reviews.filter(review => review.rate === 1).length
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <FaStar
                key={index}
                className={`inline ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
            try {
                const response = await ProductService.deleteReview(reviewId);
                if (response?.success) {
                    fetchReviews();
                }
            } catch (err) {
                console.error('Error deleting review:', err);
                alert('Không thể xóa đánh giá. Vui lòng thử lại sau.');
            }
        }
    };

    return (
        <div className="space-y-4">
            <AddReview
                productId={productId}
                onReviewAdded={fetchReviews}
            />

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-red-500">{error}</div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                        Chưa có đánh giá nào cho sản phẩm này
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row mb-6 border-b pb-6">
                            <div className="flex flex-col items-center justify-center md:w-1/3 mb-4 md:mb-0">
                                <div className="text-5xl font-bold text-gray-800">{averageRating}</div>
                                <div className="text-yellow-400 my-2">
                                    {renderStars(Math.round(averageRating))}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {reviews.length} đánh giá
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                {[5, 4, 3, 2, 1].map(rating => (
                                    <div key={rating} className="flex items-center mb-2">
                                        <div className="w-12 text-sm text-right">
                                            {rating} <FaStar className="inline text-yellow-400" />
                                        </div>
                                        <div className="w-full mx-3 h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400"
                                                style={{
                                                    width: `${reviews.length > 0 ? (ratingCounts[rating] / reviews.length) * 100 : 0}%`
                                                }}
                                            ></div>
                                        </div>
                                        <div className="w-10 text-sm text-gray-500">
                                            {ratingCounts[rating]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {reviews.map(review => (
                                <div key={review.reviewId} className="border-b last:border-b-0 pb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-medium">{review.customerName}</h3>
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-500 mr-3">{formatDate(review.createdAt)}</span>

                                            {review.isOwner && (
                                                <div
                                                    onClick={() => handleDeleteReview(review.reviewId)}
                                                    className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                                                >
                                                    Xóa
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-2 text-yellow-400">
                                        {renderStars(review.rate)}
                                    </div>
                                    {review.content && (
                                        <p className="text-gray-700">{review.content}</p>
                                    )}

                                    {review.comments && review.comments.length > 0 && (
                                        <div className="mt-3 pl-6 border-l-2 border-gray-100">
                                            {review.comments.map(comment => (
                                                <div key={comment.id} className="mt-2">
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-sm">{comment.author}</span>
                                                        <span className="text-xs text-gray-500 ml-2">
                                                            {formatDate(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Reviews;