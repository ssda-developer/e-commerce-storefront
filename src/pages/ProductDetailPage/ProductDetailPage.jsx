import { getProductById } from "@/api";
import BuyBox from "@/components/BuyBox";
import ClipboardButton from "@/components/ClipboardButton";
import GoBackButton from "@/components/GoBackButton";
import ImageGallery from "@/components/ImageGallery";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductEmpty from "@/components/ProductEmpty";
import ProductMeta from "@/components/ProductMeta";
import Reviews from "@/components/Reviews";
import { ROUTES } from "@/constants";
import { useCartContext } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
    const { addItemToCart } = useCartContext();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProductById(id);

                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAdd = () => {
        if (!product) return;
        addItemToCart(product, 1, true);
    };

    const handleBuyNow = () => {
        handleAdd();
        navigate(ROUTES.CART);
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
                    <ImageGallery
                        images={product.images}
                        alt={product.title}
                    />
                </div>

                <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex flex-col gap-4">
                    <ProductMeta
                        title={product.title}
                        description={product.description}
                        rating={product.rating}
                        reviewsCount={product.reviews?.length ?? 0}
                        brand={product.brand}
                        weight={product.weight}
                        dimensions={product.dimensions}
                    />
                </div>

                <div className="col-span-12 lg:col-span-3 flex flex-col">
                    <BuyBox
                        price={product.price}
                        discountPercentage={product.discountPercentage}
                        availabilityStatus={product.availabilityStatus}
                        stock={product.stock}
                        shippingInformation={product.shippingInformation}
                        returnPolicy={product.returnPolicy}
                        warrantyInformation={product.warrantyInformation}
                        onAdd={handleAdd}
                        onBuyNow={handleBuyNow}
                    />
                </div>

                <div className="col-span-12 mt-10">
                    <Reviews reviews={product.reviews} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
