type Transaction = {
    transactionId: string;
    amount: number;
    date: string;
    description: string;
    type: "credit" | "debit";
};

export type { Transaction };
