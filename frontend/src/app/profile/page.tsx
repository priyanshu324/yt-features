import type { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
    title: 'Profile – Creator OCR',
    description: 'View your profile and manage your session.'
};

export default function ProfilePage() {
    return <ProfileClient />;
}
