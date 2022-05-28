import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { MyMovieListProvider } from "./store/myMovies-context";
import { AuthContextProvider } from "./store/auth-context";

import StackNavigator from "./navigation/stack/StackNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <AuthContextProvider>
          <MyMovieListProvider>
            <StackNavigator />
          </MyMovieListProvider>
        </AuthContextProvider>
      </NavigationContainer>
    </>
  );
}
