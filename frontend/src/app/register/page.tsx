import type { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
    title: 'Register – Creator OCR',
    description:
        'Create a Creator OCR account to start extracting text and using creator productivity tools.',
    robots: {
        index: false,
        follow: true
    }
};

export default function RegisterPage() {
    return <RegisterClient />;
}
