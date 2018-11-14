import React from "react";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Title from "./styles/Title";

const Item = ({ title, price }) => {
  return (
    <ItemStyles>
      <Title>{title}</Title>
      <PriceTag>{price}</PriceTag>
    </ItemStyles>
  );
};

export default Item;
