import { BsFillStarFill } from "react-icons/bs";

const ProductMeta = ({ title, description, rating, reviewsCount, brand, weight, dimensions }) => {
    return (
        <>
            <h2 className="text-3xl font-bold">{title}</h2>
            {description && <p className="text-gray-600">{description}</p>}

            <div className="flex items-center gap-2">
                <BsFillStarFill className="text-yellow-400" />
                <span className="font-medium">{Number(rating ?? 0).toFixed(1)}</span>
                <span className="text-gray-500 text-sm">({reviewsCount} reviews)</span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
                {brand && <p><span className="font-bold mr-1">Brand:</span> {brand}</p>}
                {weight && <p><span className="font-bold mr-1">Weight:</span> {weight}</p>}
                {dimensions && (
                    <p>
                        <span className="font-bold mr-1">Product dimensions:</span>
                        {dimensions.depth}D x {dimensions.width}W x {dimensions.height}H
                    </p>
                )}
            </div>
        </>
    );
};

export default ProductMeta;
