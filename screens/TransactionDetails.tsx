import { RootStackParamList } from "../types/navigation";
import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAppContext } from "../providers/AppContext";

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderBottomStartRadius: 45,
        borderBottomEndRadius: 45,
        padding: 20,
        margin: 16,
        height: "96%",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        marginBottom: 8,
        alignItems: "baseline",
    },
    description: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#111418",
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111418",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    detailItem: {
        borderTopWidth: 1,
        borderTopColor: "#dbe0e6",
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        color: "#60758a",
        fontSize: 16,
    },
    value: {
        color: "#111418",
        fontSize: 16,
    },
    amountSection: {
        borderTopWidth: 1,
        borderTopColor: "#dbe0e6",
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "column",
    },
    amountLabel: {
        color: "#60758a",
        fontSize: 16,
    },
    amountValue: {
        color: "#111418",
        fontSize: 24,
        fontWeight: "bold",
        paddingTop: 8,
    },
    amountValueSection: {
        paddingTop: 16,
        alignItems: "flex-end",
    },
    footer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        width: "100%",
        padding: 16,
    },
    doneButton: {
        height: 48,
        backgroundColor: "#248bf3",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    doneButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

type TransactionDetailsProps = {
    route: RouteProp<RootStackParamList, "TransactionDetails">;
};

const TransactionDetails = ({ route }: TransactionDetailsProps) => {
    const transactionDetails = route.params.transaction;
    const navigation = useNavigation();

    const { viewSensitiveData, toggleSensitiveData } = useAppContext();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Transaction Details`,
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
    }, [navigation, viewSensitiveData, toggleSensitiveData]);

    return (
        <View style={styles.card}>
            {/* Transaction Info */}
            <Text style={styles.description}>
                {transactionDetails.description}
            </Text>

            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailItem}>
                <Text style={styles.label}>{"Transaction ID"}</Text>
                <Text style={styles.value}>
                    {transactionDetails.transactionId}
                </Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>{"Date"}</Text>
                <Text style={styles.value}>{transactionDetails.date}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>{"Type"}</Text>
                <Text style={styles.value}>{transactionDetails.type}</Text>
            </View>
            <View style={styles.amountSection}>
                <Text style={styles.amountLabel}>{"Amount"}</Text>
                <View style={styles.amountValueSection}>
                    <Text
                        style={{
                            ...styles.amountValue,
                            color: viewSensitiveData
                                ? transactionDetails.type === "credit"
                                    ? "green"
                                    : "red"
                                : "#999",
                        }}
                    >
                        {viewSensitiveData
                            ? transactionDetails.amount.toLocaleString(
                                  "en-MY",
                                  {
                                      style: "currency",
                                      currency: "MYR",
                                  },
                              )
                            : "RM **.**"}
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TransactionDetails;
