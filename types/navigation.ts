import { Transaction } from "./transaction";

// src/types/navigation.ts
type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    TransactionHistory: undefined;
    TransactionDetails: { transaction: Transaction };
};

export type { RootStackParamList };
