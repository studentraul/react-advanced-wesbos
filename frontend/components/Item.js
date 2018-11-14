import React from "react";
import Link from "next/link";

import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Title from "./styles/Title";
import formatMoney from "../lib/formatMoney";

const Item = ({ title, price, id, description, image }) => {
  return (
    <ItemStyles>
      {image && <img src={image} alt={title} />}
      <Title>
        <Link
          href={{
            pathname: "/shop",
            query: {
              id
            }
          }}
        >
          {title}
        </Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "update",
            query: { id }
          }}
        >
          <a>Edit ✏️</a>
        </Link>
        <button>Add to Cart</button>
        <button>Delete</button>
      </div>
    </ItemStyles>
  );
};

export default Item;
