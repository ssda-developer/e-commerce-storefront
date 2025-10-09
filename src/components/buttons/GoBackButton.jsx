import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/index.js";
import { BsChevronLeft } from "react-icons/bs";

const GoBackButton = () => {
    return (
        <NavLink
            to={ROUTES.HOME}
            aria-label="Continue shopping"
            className="flex items-center text-gray-700 hover:underline"
        >
            <BsChevronLeft className="mr-2"/> Continue shopping
        </NavLink>
    );
};

export default GoBackButton;
