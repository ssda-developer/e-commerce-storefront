import { useEffect, useMemo, useState } from "react";
import { BsChevronDown, BsChevronUp, BsSearch } from "react-icons/bs";

const ALL_CATEGORIES = "All categories";

const Filters = ({ products = [], setFilteredProducts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

    const categories = useMemo(() =>
            [...new Set(products.map(product =>
                product.category.charAt(0).toUpperCase() + product.category.slice(1)))],
        [products]
    );

    useEffect(() => {
        const normalizedText = (text) => text.trim().toLowerCase();

        const filteredProducts = products.filter(product => {
            const categoryMatch = selectedCategory === ALL_CATEGORIES
                ? true
                : normalizedText(product.category) === normalizedText(selectedCategory);
            const searchTermMatch = normalizedText(product.title).includes(normalizedText(searchTerm));

            return categoryMatch && searchTermMatch;
        });

        setFilteredProducts(filteredProducts);
    }, [searchTerm, selectedCategory, products, setFilteredProducts]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleReset = () => {
        setSearchTerm("");
        setSelectedCategory(ALL_CATEGORIES);
    };

    return (
        <div className="w-full mb-6 px-4 md:px-8 lg:px-12">
            <div className="flex flex-col gap-2 md:flex-row">
                <div className="relative w-full md:w-auto">
                    <button
                        id="dropdown-button"
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={isOpen}
                        onClick={toggleDropdown}
                        className="inline-flex w-full justify-between items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-800 bg-indigo-50 border rounded-md md:rounded-l-md md:rounded-r-none hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer appearance-none leading-[22px]"
                    >
                        {selectedCategory}
                        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
                    </button>

                    {isOpen && (
                        <div className="absolute z-20 mt-1 bg-white border rounded-md shadow-md w-44">
                            <ul role="listbox" aria-labelledby="dropdown-button" className="py-1">
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => handleCategorySelect(ALL_CATEGORIES)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 focus:outline-none ${selectedCategory === ALL_CATEGORIES ? "bg-indigo-50 text-indigo-700" : ""}`}
                                    >
                                        {ALL_CATEGORIES}
                                    </button>
                                </li>

                                {categories.map((item, idx) => (
                                    <li key={`${item}-${idx}`}>
                                        <button
                                            type="button"
                                            onClick={() => handleCategorySelect(item)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 focus:outline-none ${item === selectedCategory ? "bg-indigo-50 text-indigo-700" : ""}`}
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex-1 relative">
                    <div className="relative">
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search products..."
                            className="block w-full p-2.5 pl-10 text-sm border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 appearance-none leading-[22px]"
                            aria-label="Search products"
                        />
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <BsSearch />
                            </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 text-sm font-medium rounded-md md:rounded-r-md md:rounded-l-none bg-indigo-50 border hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer appearance-none leading-[22px]"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Filters;
