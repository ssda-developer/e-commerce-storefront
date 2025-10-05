import { useEffect, useState } from "react";
import { getOneProduct } from "../../api/products.js";
import { useParams } from "react-router";
import { BsFillStarFill } from "react-icons/bs";
import ClipboardButton from "../../components/buttons/ClipboardButton.jsx";
import GoBackButton from "../../components/buttons/GoBackButton.jsx";
import QuantitySelector from "../../components/buttons/QuantitySelector.jsx";

function ProductDetailPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('');

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

    const handlerChangeImage = (img) => {
        setMainImage(img);
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <>Loading...</>;
    if (!product) return <>Product not found</>;

    return (
        <div className="px-4 py-6">
            <div className="flex justify-between mb-6">
                <GoBackButton/>
                <ClipboardButton/>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="w-full rounded-2xl shadow-lg object-cover bg-gray-100"
                    />
                    <div className="flex gap-2">
                        {product.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${product.title}-${idx}`}
                                className="w-20 h-20 object-cover rounded-lg border bg-gray-100"
                                onClick={() => handlerChangeImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
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
                    <div className="text-2xl font-bold">
                        ${product.price.toFixed(2)}
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                    </div>

                    <span className="text-gray-500 text-sm">Available: {product.stock}</span>
                    <div className={`flex items-center gap-4`}>
                        <span className="font-semibold">Quantity:</span>
                        <QuantitySelector stock={product.stock} value={quantity} onChange={setQuantity} />
                    </div>

                    <div className="flex flex-col gap-3 my-4">
                        <button
                            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500">
                            Add to cart
                        </button>
                        <button className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800">
                            Buy now
                        </button>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                        <p>Shipping: {product.shippingInformation}</p>
                        <p>Return Policy: {product.returnPolicy}</p>
                        <p>Warranty: {product.warrantyInformation}</p>
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
                                    <span className="text-gray-500 text-sm">{review.reviewerName}</span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                                <span className="text-xs text-gray-400">
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
