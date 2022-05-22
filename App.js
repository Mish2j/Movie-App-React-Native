import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { MyMovieListProvider } from "./store/myMovies-context";

import StackNavigator from "./navigation/stack/StackNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <MyMovieListProvider>
          <StackNavigator />
        </MyMovieListProvider>
      </NavigationContainer>
    </>
  );
}
