import React, { useState } from "react";
import { Button, Modal, FormControl, Input, View } from "native-base";
import DatePicker from "./Goals/DatePicker";
import { Alert } from "react-native";
const SetWeightModal = (props: {
  isOpen: boolean;
  handleClose: () => void;
  isCurrentWeight: boolean;
  isStartingWeight: boolean;

  handleSubmit: (weight: string, date: Date | undefined) => void;
}) => {
  const [weight, setWeight] = useState<string>("");
  const [startingDate, setStartingDate] = useState<Date>();
  let whichWeight;
  if (props.isCurrentWeight && !props.isStartingWeight) {
    whichWeight = "Set Current Weight";
  } else if (props.isCurrentWeight && props.isStartingWeight) {
    whichWeight = "Set Starting Weight";
  } else {
    whichWeight = " Goal weight";
  }
  const handleDate = (date: Date) => {
    setStartingDate(date);
  };
  const handleWeights = () => {
    if (!startingDate && props.isStartingWeight) {
      return Alert.alert("Pick a date", "You must select a starting date", [
        { text: "Ok" },
      ]);
    } else if (!weight.length) {
      return Alert.alert("Select Weight", "Weight cannot be empty.", [
        { text: "Ok" },
      ]);
    }
    props.handleSubmit(weight, startingDate);
    props.handleClose();
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={() => props.handleClose()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{whichWeight}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Weight(kg)</FormControl.Label>
              <Input
                contextMenuHidden={true}
                onChangeText={setWeight}
                keyboardType="numeric"
                value={weight}
                placeholder={"Weight"}
              />
            </FormControl>
            {props.isStartingWeight && props.isCurrentWeight && (
              <View w="100%" p="2" m="2">
                <DatePicker handleDate={handleDate} />
              </View>
            )}
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
              <Button onPress={handleWeights}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default SetWeightModal;
