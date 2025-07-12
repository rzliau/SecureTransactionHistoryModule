import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { Transaction } from "../types/transaction";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import transactionData from "../assets/TransactionData.json";
import { useAppContext } from "../providers/AppContext";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    flastList: {
        flex: 1,
        padding: 20,
    },
    item: {
        padding: 16,
        backgroundColor: "#f2f2f2",
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: 80,
    },
    itemLabel: {
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "60%",
    },
    itemData: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    itemDescription: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 12,
        color: "#999",
    },
    itemAmount: {
        fontSize: 20,
        color: "#666",
    },
});

type TransactionHistoryProps = {
    navigation: StackNavigationProp<RootStackParamList, "TransactionHistory">;
};

const TransactionHistory = ({ navigation }: TransactionHistoryProps) => {
    const { viewSensitiveData, toggleSensitiveData } = useAppContext();

    const setNavigationOptions = useNavigation();

    useLayoutEffect(() => {
        setNavigationOptions.setOptions({
            title: "Transaction History",
            headerRight: () => (
                <TouchableOpacity onPress={toggleSensitiveData}>
                    <Icon
                        name={viewSensitiveData ? "eye" : "eye-slash"}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
        });
    }, [setNavigationOptions, viewSensitiveData, toggleSensitiveData]);

    const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
        [],
    );

    const fetchTransactionHistory = async () => {
        try {
            setTransactionHistory(transactionData as Transaction[]);
        } catch (error) {
            console.error("Error reading transaction history:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchTransactionHistory();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={transactionHistory}
                keyExtractor={item => item.transactionId}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                            navigation.navigate("TransactionDetails", {
                                transaction: item,
                            })
                        }
                    >
                        <View style={styles.itemLabel}>
                            <Text
                                style={styles.itemDescription}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {item.description}
                            </Text>
                            <Text style={styles.itemDate}>{item.date}</Text>
                        </View>
                        <View style={styles.itemData}>
                            {viewSensitiveData ? (
                                <Text
                                    style={{
                                        ...styles.itemAmount,
                                        color:
                                            item.type === "credit"
                                                ? "green"
                                                : "red",
                                    }}
                                >
                                    {item.type === "credit" ? "+" : "-"}{" "}
                                    {item.amount.toLocaleString("en-MY", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </Text>
                            ) : (
                                <Text style={styles.itemAmount}>**.**</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default TransactionHistory;
