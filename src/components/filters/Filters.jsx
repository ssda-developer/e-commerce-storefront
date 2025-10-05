import React, { useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp, BsSearch } from 'react-icons/bs';

const ALL_CATEGORIES = 'All categories';

const Filters = ({ products = [], setFilteredProducts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

    const categories = [...new Set(products.map(product =>
        product.category.charAt(0).toUpperCase() + product.category.slice(1)))];

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
        setSearchTerm('');
        setSelectedCategory(ALL_CATEGORIES);
    }

    const displayCategoryLabel = (category) => (category === ALL_CATEGORIES ? ALL_CATEGORIES : category);

    return (
        <div className="w-152 mx-auto relative mb-4">
            <div className="flex">
                <button
                    id="dropdown-button"
                    type="button"
                    onClick={toggleDropdown}
                    className="shrink-0 z-10 inline-flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                >
                    {displayCategoryLabel(selectedCategory)}
                    {isOpen ? <BsChevronUp/> : <BsChevronDown/>}
                </button>

                {isOpen && (
                    <div
                        id="dropdown"
                        className="absolute top-12 left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
                    >
                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => handleCategorySelect(ALL_CATEGORIES)}
                                    className={`inline-flex w-full px-4 py-2 hover:bg-gray-100 ${selectedCategory === ALL_CATEGORIES ? "bg-blue-50 text-blue-600" : ""}`}
                                >
                                    {ALL_CATEGORIES}
                                </button>
                            </li>

                            {categories.map((item, idx) => (
                                <li key={`${item}-${idx}`}>
                                    <button
                                        type="button"
                                        onClick={() => handleCategorySelect(item)}
                                        className={`inline-flex w-full px-4 py-2 hover:bg-gray-100 ${item === selectedCategory ? "bg-blue-50 text-blue-600" : ""}`}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search products..."
                    />
                </div>

                <button
                    type="button"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-200 rounded-e-lg border border-gray-300 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Filters;
