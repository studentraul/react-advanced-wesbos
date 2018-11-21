import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Float!
    $largeImage: String
    $image: String
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`;

class CreateItems extends Component {
  state = {
    title: "Hey ho",
    description: "Let's go",
    price: 1000,
    image: "",
    largeImage: ""
  };

  handleSubmit = createItemFunc => async e => {
    //Prevent default event
    e.preventDefault();
    // Call the function to create item
    const res = await createItemFunc();
    console.log(res);
  };

  handleField = e => {
    const { name, value, type } = e.target;
    /* enforcing always be a number for number input */
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    console.log("e,", e);
    const URL = "https://api.cloudinary.com/v1_1/duzei21zt/image/upload";
    //https://res.cloudinary.com/duzei21zt/image/upload/v1542215552/
    const files = e.target.files;
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData

    console.log("files", files);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch(URL, {
      method: "POST",
      body: data
    });

    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItemFunc, { loading, error }) => {
          return (
            <Form onSubmit={this.handleSubmit(createItemFunc)}>
              <ErrorMessage error={error} />
              {/* Group things */}
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleField}
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <textarea
                    name="description"
                    placeholder="Description"
                    cols="30"
                    rows="10"
                    required
                    value={this.state.description}
                    onChange={this.handleField}
                  />
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    required
                    value={this.state.price}
                    onChange={this.handleField}
                  />
                </label>
                <label htmlFor="image">Small Image</label>
                <input
                  type="file"
                  name="image"
                  placeholder="Small Image"
                  onChange={this.uploadFile}
                />

                <button type="submit" onClick={this.handleSubmit}>
                  Submit
                </button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateItems;
export { CREATE_ITEM_MUTATION };
