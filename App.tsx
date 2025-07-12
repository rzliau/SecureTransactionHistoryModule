import { StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import TransactionHistory from "./screens/TransactionHistory";
import TransactionDetails from "./screens/TransactionDetails";
import { RootStackParamList } from "./types/navigation";
import { Button } from "react-native";
import { AppProvider } from "./providers/AppContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    const isDarkMode = useColorScheme() === "dark";

    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen
                        name="TransactionHistory"
                        component={TransactionHistory}
                    />
                    <Stack.Screen
                        name="TransactionDetails"
                        component={TransactionDetails}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
