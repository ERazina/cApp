import React from "react";
import { useNavigate } from "react-router-dom";
import Button from './styled';

const GoBackButton: React.FC = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate(-1);
    };
  
    return <Button onClick={handleGoBack}>Go Back</Button>;
  };
  
  export default GoBackButton;