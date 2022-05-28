import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { COLORS } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";

import TabNavigator from "../bottomTab/TabNavigator";
import ProfileScreen from "../../screens/ProfileScreen";
import MyMoviesScreen from "../../screens/MyMoviesScreen";
import MovieScreen from "../../screens/MovieScreen";
import AuthScreen from "../../screens/AuthScreen";
import AccountScreen from "../../screens/AccountScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const authCtx = useContext(AuthContext);

  const screenOptions = {
    headerStyle: {
      backgroundColor: COLORS.primaryDark,
    },
    headerTintColor: COLORS.textLight,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!authCtx.isLoggedin && (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
      {authCtx.isLoggedin && (
        <>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyMovies"
            component={MyMoviesScreen}
            options={{
              title: "My List",
            }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Movie" component={MovieScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
