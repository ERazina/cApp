import React from "react";
import { useNavigate } from "react-router-dom";
import Button from './styled';
var GoBackButton = function () {
    var navigate = useNavigate();
    var handleGoBack = function () {
        navigate(-1);
    };
    return React.createElement(Button, { onClick: handleGoBack }, "Go Back");
};
export default GoBackButton;
