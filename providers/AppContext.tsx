// AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";

type AppContextType = {
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    viewSensitiveData: boolean;
    setViewSensitiveData: (value: boolean) => void;
    toggleSensitiveData: () => Promise<boolean>;
    handleBiometricAuth: () => Promise<boolean>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [viewSensitiveData, setViewSensitiveData] = useState(false);

    const toggleSensitiveData = async () => {
        if (viewSensitiveData) {
            setViewSensitiveData(false);
            return true; // No need for biometric auth if already viewing sensitive data
        }
        const result = await handleBiometricAuth();
        if (result) {
            setViewSensitiveData(true);
            return true; // Successfully toggled sensitive data view
        }
        return false; // Failed to authenticate
    };

    const handleBiometricAuth = async () => {
        const rnBiometrics = new ReactNativeBiometrics({
            allowDeviceCredentials: true,
        });

        try {
            const { available } = await rnBiometrics.isSensorAvailable();

            if (!available) {
                Alert.alert("Biometrics not available");
                return false;
            }

            const result = await rnBiometrics.simplePrompt({
                promptMessage: "Confirm fingerprint/face",
            });

            if (result.success) {
                return true; // Authentication successful
            }
        } catch (exception) {
            Alert.alert("An error occurred, please try again later.");
            console.error("Exception: ", exception);
        }

        return false; // Authentication failed or not available
    };

    return (
        <AppContext.Provider
            value={{
                authenticated,
                setAuthenticated,
                viewSensitiveData,
                setViewSensitiveData,
                toggleSensitiveData,
                handleBiometricAuth,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
