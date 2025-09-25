
declare type RoundType = {
    completedAt?: string;
    createdAt: string;
    id: string;
    kind: string;
    nmumbers: number[];
    status: string;
}

declare type CustomeJwtPayload = {
    sub: string;
    phone: string;
    iat: number;
    exp: number;
    role: string;
}

declare type WalletType ={
    balance: number;
    currency: string;
}
declare type BetType = {
    id: string;
    guess: number[];
    amount: number;
    createdAt: string;
    status: string;
}