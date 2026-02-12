'use client';
import { useAuth } from '../store/authStore';

export default function AdminOnly({ children }: any) {
    const { user } = useAuth();
    if (user?.role !== 'admin') return null;
    return children;
}
