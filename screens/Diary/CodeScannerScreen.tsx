import { View, Button } from "native-base";
import React, { useState, useEffect } from "react";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { Alert } from "react-native";

const CodeScannerScreen = ({ navigation }: any) => {
  const [scanned, setScanned] = useState<boolean>(false);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    const { type, data, bounds: { origin } = {} } = scanningResult;
    setScanned(true);
    navigation.navigate("ScannedFoodDetails", { type: type, data: data });
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      const data = await BarCodeScanner.getPermissionsAsync();
      if (data.status !== "granted") {
        Alert.alert(
          "Permission Request",
          "In order to use the barcode scanner you must grand camera permission.",
          [{ text: "Okay" }]
        );
      }
    })();
  }, []);
  return (
    <View flex="1" bg="white" alignItems="center" justifyContent="center">
      <BarCodeScanner
        style={{ width: 400, height: 350 }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <Button
          mt="5"
          color="info.500"
          onPress={() => {
            setScanned(false);
          }}
        >
          Scann again?
        </Button>
      )}
    </View>
  );
};

export default CodeScannerScreen;
