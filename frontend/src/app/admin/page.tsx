import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
    title: 'Admin Dashboard – Creator OCR',
    robots: { index: false, follow: false }
};

export default function AdminPage() {
    // UI-only auth is stored in localStorage (client),
    // so for now we gate again in client component
    return <AdminClient />;
}
