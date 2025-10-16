import { BsFillStarFill } from "react-icons/bs";

const Reviews = ({ reviews = [] }) => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
                {!reviews.length
                    ? <p className="text-gray-500">No reviews yet...</p>
                    : reviews?.map((review, idx) => (
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
        </>
    );
};

export default Reviews;
