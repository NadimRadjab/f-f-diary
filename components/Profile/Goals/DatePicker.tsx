import React, { ReactEventHandler, useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ handleDate }: { handleDate: (date: Date) => void }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<string | undefined>("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    handleDate(selectedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Select a date" />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
