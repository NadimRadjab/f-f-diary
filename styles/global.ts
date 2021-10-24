import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
  touchableList: {
    width: "100%",
    padding: 2,
    margin: 2,
    justifyContent: "space-between",
    height: 55,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 7,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
