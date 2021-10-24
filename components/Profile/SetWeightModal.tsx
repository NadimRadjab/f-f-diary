import React, { useState } from "react";
import { Button, Modal, FormControl, Input } from "native-base";
const SetWeightModal = (props: {
  isOpen: boolean;
  handleClose: () => void;
  isCurrentWeight: boolean;
  handleSubmit: (weight: string) => void;
}) => {
  const [weight, setWeight] = useState("");

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={() => props.handleClose()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            {props.isCurrentWeight ? "Set Current Weight" : "Set Goal Weight"}
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Weight(kg)</FormControl.Label>
              <Input
                onChangeText={setWeight}
                keyboardType="numeric"
                value={weight}
                placeholder={
                  props.isCurrentWeight ? "Current weight..." : "Goal weight..."
                }
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  props.handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  props.handleSubmit(weight);
                  props.handleClose();
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default SetWeightModal;
