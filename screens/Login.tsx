import React from "react";
import { View, Button, Alert } from "react-native";
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
            <Button title="Authenticate with Biometrics" onPress={login} />
        </View>
    );
};

export default Login;
