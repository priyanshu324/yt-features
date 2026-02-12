import type { Metadata } from 'next';
import LoginClient from './LoginClient';


export const metadata: Metadata = {
    title: 'Login – Creator OCR',
    description:
        'Log in to your Creator OCR account to manage OCR results and creator tools.',
    robots: {
        index: false,
        follow: true
    }
};

export default function LoginPage() {
    return <LoginClient />;
}
