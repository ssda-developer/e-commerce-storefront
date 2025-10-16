import { useState } from "react";

const ImageGallery = ({ images = [], alt }) => {
    const [current, setCurrent] = useState(images[0] || "");

    return (
        <>
            <img
                src={current}
                alt={alt}
                className="w-full rounded-2xl shadow-lg object-cover bg-indigo-50 border"
            />
            <div className="flex gap-2">
                {images.map((img, idx) => (
                    <button
                        key={`${img}-${idx}`}
                        type="button"
                        onClick={() => setCurrent(img)}
                        className="cursor-pointer"
                        aria-label={`Show image ${idx + 1}`}
                    >
                        <img
                            src={img}
                            alt={`${alt}-${idx}`}
                            className={`w-20 h-20 object-cover rounded-lg border bg-indigo-50 ${current === img ? "ring-2 ring-indigo-500" : ""}`}
                        />
                    </button>
                ))}
            </div>
        </>
    );
};

export default ImageGallery;
