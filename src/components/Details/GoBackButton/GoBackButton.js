import React from "react";
import { useNavigate } from "react-router-dom";
import Button from './styled';
const GoBackButton = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    return React.createElement(Button, { onClick: handleGoBack }, "Go Back");
};
export default GoBackButton;
