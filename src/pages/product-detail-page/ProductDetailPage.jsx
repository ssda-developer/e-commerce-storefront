import { useEffect, useState } from "react";
import { getOneProduct } from "../../api/products.js";
import { useNavigate, useParams } from "react-router";
import { BsFillStarFill } from "react-icons/bs";
import ClipboardButton from "../../components/buttons/ClipboardButton.jsx";
import GoBackButton from "../../components/buttons/GoBackButton.jsx";
import { useCartContext } from "../../context/CartContext.jsx";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { ROUTES } from "../../constants/constants.js";

const ProductDetailPage = () => {
    const { addItemToCart } = useCartContext();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const { data } = await getOneProduct(id);
            setProduct(data);
            setMainImage(data.thumbnail)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlerAddItemToCart = (e, redirect = false) => {
        e.preventDefault();
        addItemToCart(product, 1, true);

        if (redirect) navigate(ROUTES.CART);
    };

    const handlerChangeImage = (img) => {
        setMainImage(img);
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <LoadingSpinner/>;
    if (!product) {
        return (
            <EmptyState
                title="Product not found"
                message="The product you’re looking for doesn’t exist or may have been removed"
                showButton={true}
                buttonText="Back to Home"
                onButtonClick={() => navigate(ROUTES.HOME)}
            />
        );
    }

    return (
        <div className="px-4 py-6">
            <div className="flex justify-between mb-6">
                <GoBackButton/>
                <ClipboardButton/>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-4">
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="w-full rounded-2xl shadow-lg object-cover bg-gray-100 border"
                    />
                    <div className="flex gap-2">
                        {product.images.map((img, idx) => (
                            <button onClick={() => handlerChangeImage(img)} className="cursor-pointer">
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${product.title}-${idx}`}
                                    className="w-20 h-20 object-cover rounded-lg border bg-gray-100"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-600">{product.description}</p>

                    <div className="flex items-center gap-2">
                        <BsFillStarFill className="text-yellow-400"/>
                        <span className="font-medium">{product.rating.toFixed(1)}</span>
                        <span className="text-gray-500 text-sm">({product.reviews.length} reviews)</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-bold">Brand:</span> {product.brand}</p>
                        <p><span className="font-bold">Weight:</span> {product.weight}</p>
                        <p><span className="font-bold">Product dimensions:</span> {product.dimensions.depth}D x {product.dimensions.width}W x {product.dimensions.height}H </p>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-3 flex flex-col">
                    {product.discountPercentage ? <span className="text-sm text-red-500 font-bold uppercase">Sale</span> : null}
                    <span className="text-sm text-green-600 font-semibold">{product.availabilityStatus}</span>
                    <div className="text-2xl font-bold my-2">
                        ${product.price.toFixed(2)}
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                    </div>

                    <span className="text-gray-500 text-sm"><span className="font-bold">Available:</span> {product.stock}</span>

                    <div className="flex flex-col gap-3 my-4">
                        <button
                            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition cursor-pointer"
                            onClick={(e) => handlerAddItemToCart(e)}
                        >
                            Add to cart
                        </button>
                        <button
                            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                            onClick={(e) => handlerAddItemToCart(e, true)}
                        >
                            Buy now
                        </button>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-bold">Shipping:</span> {product.shippingInformation}</p>
                        <p><span className="font-bold">Return Policy:</span> {product.returnPolicy}</p>
                        <p><span className="font-bold">Warranty:</span> {product.warrantyInformation}</p>
                    </div>
                </div>

                <div className="col-span-12 mt-10">
                    <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                    <div className="space-y-4">
                        {product.reviews.map((review, idx) => (
                            <div
                                key={idx}
                                className="p-4 border rounded-lg shadow-sm bg-gray-50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <BsFillStarFill className="text-yellow-400"/>
                                    <span className="font-medium">{review.rating}</span>
                                    <span className="text-gray-600 text-sm">{review.reviewerName}</span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                                <span className="text-xs text-gray-500">
                                    {new Date(review.date).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
