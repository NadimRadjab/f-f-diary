import React from "react";

import { Button, Modal } from "native-base";

import InfoForm from "./InfoForm";

type Props = {
  items: {
    value: string;
    isOpen: boolean;
  };
  handleSubmit: (item: string, oldEmail?: string, oldPassword?: string) => void;
  handleClose: (value: string) => void;
};

const InfoModal = (props: Props) => {
  const { items } = props;

  let text: string;
  if (items.value === "Email") {
    text = "Email-Address";
  } else if (items.value === "PhoneNumber") {
    text = "Phone Number";
  } else {
    text = items.value;
  }
  return (
    <>
      <Modal
        isOpen={props.items.isOpen}
        onClose={() => {
          props.handleClose(props.items.value);
        }}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{text}</Modal.Header>
          <Modal.Body>
            <InfoForm text={text} {...props} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  props.handleClose(props.items.value);
                }}
              >
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default InfoModal;
