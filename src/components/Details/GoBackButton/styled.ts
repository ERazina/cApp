import styled from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3; /* Более тёмный синий */
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #003d80; /* Ещё темнее */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #adb5bd; /* Серый цвет */
    color: #e9ecef;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default Button;
