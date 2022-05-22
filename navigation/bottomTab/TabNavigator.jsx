import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { COLORS } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../components/UI/IconButton";

import HomeScreen from "../../screens/HomeScreen";
import SearchScreen from "../../screens/SearchScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const screenOptions = {
    headerStyle: {
      backgroundColor: COLORS.primaryDark,
    },
    headerTintColor: COLORS.textLight,
    tabBarActiveTintColor: COLORS.textLight,
    tabBarInactiveTintColor: COLORS.textDark,
    tabBarStyle: {
      borderTopWidth: 0,
      backgroundColor: COLORS.primaryDark,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        ...screenOptions,
        headerRight: ({ tintColor }) => (
          <IconButton
            iconName="person-outline"
            iconColor={tintColor}
            iconSize={24}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
