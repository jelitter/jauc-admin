export interface Message {
    $key: string;
    userId: string;
    father: string;
    date: string;
    body: string;
    read?: boolean;
    userName?: string;
    email?: string;
    photoUrl?: string;
}