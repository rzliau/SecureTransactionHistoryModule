import { StackNavigationProp } from "@react-navigation/stack";
import React, { useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useAppContext } from "../providers/AppContext";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

type HomeProps = {
    navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const Home = ({ navigation }: HomeProps) => {
    const { authenticated, setAuthenticated, setViewSensitiveData } =
        useAppContext();

    if (!authenticated) {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    }

    const setNavigationOptions = useNavigation();

    useLayoutEffect(() => {
        setNavigationOptions.setOptions({
            title: "Home",
            headerRight: () => (
                <Button
                    onPress={() => {
                        setAuthenticated(false);
                        setViewSensitiveData(false);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    }}
                    title="Logout"
                />
            ),
        });
    }, [setNavigationOptions]);

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Welcome to the Home Screen!</Text>
            <Pressable
                onPress={() => navigation.navigate("TransactionHistory")}
                style={{
                    padding: 10,
                    backgroundColor: "#007bff",
                    borderRadius: 5,
                    marginTop: 20,
                }}
            >
                <Text style={{ color: "#fff" }}>Go to Transaction History</Text>
            </Pressable>
        </View>
    );
};

export default Home;
