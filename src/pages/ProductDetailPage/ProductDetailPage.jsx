import { getProductById } from "@/api";
import ClipboardButton from "@/components/ClipboardButton";
import GoBackButton from "@/components/GoBackButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductEmpty from "@/components/ProductEmpty";
import { ROUTES } from "@/constants";
import { useCartContext } from "@/context/CartContext";
import { formatPrice } from "@/utils/format-price";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
    const { addItemToCart } = useCartContext();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [added, setAdded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProductById(id);

                setProduct(data);
                setMainImage(data.thumbnail);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddItemToCart = (e, redirect = false) => {
        e.preventDefault();

        if (!product) return;

        addItemToCart(product, 1, true);
        setAdded(true);

        if (redirect) navigate(ROUTES.CART);

        setTimeout(() => {
            setAdded(false);
        }, 1500);
    };

    if (loading) return <LoadingSpinner />;

    if (!product) {
        return (
            <ProductEmpty
                title="Product not found"
                message="The product you’re looking for doesn’t exist or may have been removed"
                showButton={true}
                buttonText="Back to Home"
                onButtonClick={() => navigate(ROUTES.HOME)}
            />
        );
    }

    return (
        <div className="flex flex-col py-10">
            <div className="flex justify-between mb-6">
                <GoBackButton />
                <ClipboardButton />
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-4">
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="w-full rounded-2xl shadow-lg object-cover bg-indigo-50 border"
                    />
                    <div className="flex gap-2">
                        {product.images?.map((img, idx) => (
                            <button
                                key={`${img}-${idx}`}
                                type="button"
                                onClick={() => setMainImage(img)}
                                className="cursor-pointer"
                            >
                                <img
                                    src={img}
                                    alt={`${product.title}-${idx}`}
                                    className="w-20 h-20 object-cover rounded-lg border bg-indigo-50"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-600">{product.description}</p>

                    <div className="flex items-center gap-2">
                        <BsFillStarFill className="text-yellow-400" />
                        <span className="font-medium">{Number(product.rating ?? 0).toFixed(1)}</span>
                        <span className="text-gray-500 text-sm">({product.reviews?.length ?? 0} reviews)</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-bold">Brand:</span> {product.brand}</p>
                        <p><span className="font-bold">Weight:</span> {product.weight}</p>
                        <p><span className="font-bold">Product dimensions:</span> {product.dimensions?.depth}D
                            x {product.dimensions?.width}W x {product.dimensions?.height}H </p>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-3 flex flex-col">
                    {product.discountPercentage ?
                        <span className="text-sm text-red-500 font-bold uppercase">Sale</span> : null}
                    <span className="text-sm text-green-600 font-semibold">{product.availabilityStatus}</span>
                    <div className="text-2xl font-bold my-2">
                        {formatPrice(product.price)}
                        {product.discountPercentage ? (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                                {formatPrice(product.price / (1 - (product.discountPercentage / 100)))}
                            </span>
                        ) : null}
                    </div>

                    <span className="text-gray-500 text-sm"><span
                        className="font-bold">Available:</span> {product.stock}</span>

                    <div className="flex flex-col gap-3 my-4">
                        <button
                            className={`w-full font-semibold py-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 ${added ? "bg-yellow-200" : "bg-yellow-400 hover:bg-yellow-500"} text-black`}
                            onClick={(e) => handleAddItemToCart(e)}
                            type="button"
                            disabled={added}
                            aria-live="polite"
                            aria-label={added ? "Product added to cart" : "Add to cart"}
                        >
                            {added ? "Product added to cart" : "Add to cart"}
                        </button>
                        <button
                            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                            onClick={(e) => handleAddItemToCart(e, true)}
                            type="button"
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
                        {product.reviews?.map((review, idx) => (
                            <div
                                key={idx}
                                className="p-4 border rounded-lg shadow-sm bg-gray-50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <BsFillStarFill className="text-yellow-400" />
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
};

export default ProductDetailPage;
