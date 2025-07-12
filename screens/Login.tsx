import React from "react";
import { View, Button, Alert, Text } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation"; // Adjust the import path as necessary
import { useAppContext } from "../providers/AppContext";

type LoginProps = {
    navigation: StackNavigationProp<RootStackParamList, "Login">;
};

const Login = ({ navigation }: LoginProps) => {
    const { setAuthenticated, handleBiometricAuth } = useAppContext();

    const login = async () => {
        const result = await handleBiometricAuth();

        if (result) {
            setAuthenticated(true);
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        } else {
            Alert.alert("Authentication failed. Please try again.");
        }
    };

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text
                style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}
            >
                Welcome to Secure Transaction History Module
            </Text>
            <Button title="Login" onPress={login} />
        </View>
    );
};

export default Login;
