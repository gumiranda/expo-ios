import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme,Text } from 'react-native-paper';
import { NavigationContainer, useLinkTo } from "@react-navigation/native";
import { StackNavigator } from './stack';
import { DrawerContent } from './drawerContent';
import * as Linking from 'expo-linking';
const prefix = Linking.makeUrl('/');

const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
  const theme = useTheme();
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        StackNavigator: {
          path: "stack",
          initialRouteName: "Feed",
          screens: {
            Feed: "Feed",
            Notifications: {
              path: "feed/:id",
              parse: {
                id: id => `there, ${id}`,
              },
              stringify: {
                id: id => id.replace("there, ", ""),
              },
            },
            Messages: {
              path: "messages/:id",
              parse: {
                id: id => `there, ${id}`,
              },
              stringify: {
                id: id => id.replace("there, ", ""),
              },
            },
          },
        },

      },
    },
  };

  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} theme={navigationTheme}>
      <Drawer.Navigator drawerContent={props =>  <DrawerContent  {...props} />         }>
        <Drawer.Screen name="Home" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
function Home({ navigation }) {
  const linkTo = useLinkTo();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Go to Wojciech's profile"
        onPress={() => linkTo("/stack/notifications/Wojciech/22")}
      />
      <Button
        title="Go to unknown profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

function Profile({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello {route.params?.id || "Unknown"}!</Text>
      <Text>
        Type of age parameter is{" "}
        {route.params?.age ? typeof route.params.age : "undefined"}
      </Text>
    </View>
  );
}




