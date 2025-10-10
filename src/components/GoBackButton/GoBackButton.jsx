import { ROUTES } from "@/constants";
import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const GoBackButton = () => {
    return (
        <NavLink
            to={ROUTES.HOME}
            aria-label="Continue shopping"
            className="flex items-center text-gray-700 hover:underline"
        >
            <BsChevronLeft className="mr-2" /> Continue shopping
        </NavLink>
    );
};

export default GoBackButton;
