import { Header, Button } from "semantic-ui-react";

export default function ProductAttributes({ description }) {
  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
      />
    </>
  );
}
