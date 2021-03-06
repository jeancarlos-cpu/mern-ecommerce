import { Header, Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

export default function ProductAttributes({ description, _id, user }) {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const url = `${process.env.BASE_URL}/api/product?_id=${_id}`;
    const config = {
      method: "DELETE"
    };
    await fetch(url, config);
    router.push("/");
  };

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      {!(user && !(user.role === "user")) ? (
        <div />
      ) : (
        <>
          <Button
            icon="trash alternate outline"
            color="red"
            content="Delete Product"
            labelPosition="right"
            onClick={() => setModal(true)}
          />
          <Modal open={modal} dimmer="blurring">
            <Modal.Header>Cofirm delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" onClick={() => setModal(false)} />
              <Button
                content="Delete"
                negative
                icon="trash"
                labelPosition="right"
                onClick={handleDelete}
              />
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  );
}
