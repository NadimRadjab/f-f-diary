import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import Routs from "./routs/Routs";
import { NativeBaseProvider } from "native-base";
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  useEffect(() => {
    const newDoc = async () => {
      try {
        // const docRef = await addDoc(collection(db, "diaries"), {
        //   diary: { ownerId: "u1", pages: [] },
        // });
        const querySnapshot = await getDocs(collection(db, "diaries"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
        });
      } catch (err) {
        console.error(err);
      }
    };
    newDoc();
  }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Routs />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </Provider>
  );
}
