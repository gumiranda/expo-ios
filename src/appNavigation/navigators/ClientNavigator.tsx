// import Icon from 'react-native-vector-icons/Octicons';
// import {darken} from 'polished';
// import {useDispatch} from 'react-redux';
// import {LinearGradient} from 'expo-linear-gradient';
// import appMetrics from '../../utils/appMetrics';
// import {signOut} from '../../appStore/appModules/auth/actions';
// import Profile from '../../screens/Profile/Profile';
// import Home from '../../screens/Home/Home';
// import PaymentAddress from '../../screens/Payment/PaymentAddress/PaymentAddress';
// import PaymentCart from '../../screens/Payment/PaymentCart/PaymentCart';
// import CompleteRegister from '../../screens/Payment/CompleteRegister/CompleteRegister';
// import Chats from '../../screens/Chat/List/Chats/Chats';
// import Users from '../../screens/Chat/List/Users/Users';
// import ChatDetails from '../../screens/Chat/ChatDetails/ChatDetails';
// import {appColors} from '../../utils/appColors';
// import Plans from '../../screens/Payment/Plans/Plans';
// import CheckoutEasy from '../../screens/Payment/CheckoutEasy/CheckoutEasy';
// import CardList from '../../screens/Payment/CardList/CardList';
// import Background from '../../components/Background/Background';
// import React, {useEffect} from 'react';
// import {Text, View} from 'react-native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {StackNavigator} from './stack';
// //import {DrawerContent} from './drawerContent';
// import {useTheme} from 'react-native-paper';
// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from '@react-navigation/native';
// const Drawer = createDrawerNavigator();

// function DrawerContent() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Drawer content5 </Text>
//     </View>
//   );
// }
// export default RootNavigator = () => {
//   return (
//     <Drawer.Navigator drawerContent={() => <DrawerContent />}>
//       <Drawer.Screen name="Home" component={Home} />
//     </Drawer.Navigator>
//   );
// };
// export const RootNavigator = () => {
//   const theme = useTheme();
//   const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

//   return (
//     <NavigationContainer theme={navigationTheme}>
//       <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
//         <Drawer.Screen name="Home" component={StackNavigator} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };
// function Logout() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(signOut());
//   }, [dispatch]);
//   return <Background />;
// }

import React from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from 'react-native-paper';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';
import { useColorScheme } from 'react-native-appearance';

import { RootNavigator } from './rootNavigator';
import { PreferencesContext } from './context/preferencesContext';

export const ClientNavigator = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    colorScheme === 'dark' ? 'dark' : 'light'
  );
  const [rtl] = React.useState<boolean>(I18nManager.isRTL);

  function toggleTheme() {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  }

  const toggleRTL = React.useCallback(() => {
    I18nManager.forceRTL(!rtl);
    Updates.reloadAsync();
  }, [rtl]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      toggleRTL,
      theme,
      rtl: (rtl ? 'right' : 'left') as 'right' | 'left',
    }),
    [rtl, theme, toggleRTL]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider
        theme={
          theme === 'light'
            ? {
                ...DefaultTheme,
                colors: { ...DefaultTheme.colors, primary: '#1ba1f2' },
              }
            : {
                ...DarkTheme,
                colors: { ...DarkTheme.colors, primary: '#1ba1f2' },
              }
        }
      >
        <RootNavigator />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};



// const RootStack = createDrawerNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: () => ({drawerLabel: 'Inicio'}),
//     },
//     Profile: {
//       screen: Profile,
//       navigationOptions: () => ({drawerLabel: 'Meu perfil'}),
//     },
//     CompleteReg: {
//       screen: createStackNavigator(
//         {
//           CompleteRegister,
//           RegPaymentAddress: {screen: PaymentAddress},
//           RegPaymentCart: {screen: PaymentCart},
//           RegPlans: {screen: Plans},
//         },
//         {
//           initialRouteName: 'CompleteRegister',
//           defaultNavigationOptions: {
//             headerTransparent: true,
//             headerTintColor: appColors.white,
//             headerLeftContainerStyle: {
//               marginLeft: 0,
//             },
//           },
//         },
//       ),
//       navigationOptions: () => ({drawerLabel: 'Completar registro'}),
//     },
//     Payment: {
//       screen: createStackNavigator(
//         {
//           CardList,
//           PaymentAddress,
//           PaymentCart,
//           CheckoutEasy,
//           Plans,
//         },
//         {
//           initialRouteName: 'CardList',

//           defaultNavigationOptions: {
//             headerTransparent: true,

//             headerTintColor: appColors.white,
//             headerLeftContainerStyle: {
//               marginLeft: 0,
//             },
//           },
//         },
//       ),
//       navigationOptions: () => ({drawerLabel: 'Pagamento'}),
//     },
//     Chat: {
//       screen: createStackNavigator(
//         {
//           Chats,
//           Users,
//           ChatDetails,
//         },
//         {
//           initialRouteName: 'Users',
//           defaultNavigationOptions: {
//             headerTransparent: true,
//             headerTintColor: appColors.white,
//             headerLeftContainerStyle: {
//               marginLeft: 0,
//             },
//           },
//         },
//       ),
//       navigationOptions: () => ({drawerLabel: 'Chat'}),
//     },
//     Logout: {
//       screen: Logout,
//       navigationOptions: () => ({drawerLabel: 'Sair'}),
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     headerMode: 'float',
//     navigationOptions: ({navigation}) => ({
//       headerBackground: () => (
//         <LinearGradient
//           colors={[darken(0.2, appColors.primary), appColors.primary]}
//           style={{flex: 1}}
//         />
//       ),
//       headerTintColor: appColors.white,
//       title: 'Dev Doido',

//       headerLeft: () => (
//         <Icon
//           style={{padding: 10, color: appColors.white}}
//           name="three-bars"
//           size={30}
//           color={appColors.black}
//           onPress={() => {
//             navigation.toggleDrawer();
//           }}
//         />
//       ),
//       headerTitleStyle: {
//         paddingLeft: appMetrics.DEVICE_WIDTH / 5.5,
//         color: appColors.white,
//       },
//     }),
//   },
// );

// export default createAppContainer(
//   createStackNavigator({RootStack: {screen: RootStack}}),
// );
