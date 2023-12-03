import React from "react";
import { useTheme } from "@emotion/react";

interface CardProps {
  houseImage: string;
  profileimage: string;
  location: string;
  guestsNumber: string;
  price: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  houseImage,
  profileimage,
  location,
  price,
  guestsNumber,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <div className="profile-card  mb-5 col" onClick={onClick}>
     
    </div>
  );
};
