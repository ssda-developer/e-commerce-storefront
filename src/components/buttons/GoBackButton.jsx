import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router";

const GoBackButton = () => {
    return (
        <NavLink to="/" className="flex items-center text-gray-700 hover:text-gray-900">
            <BsChevronLeft className="mr-2"/> Continue shopping
        </NavLink>
    );
};

export default GoBackButton;
