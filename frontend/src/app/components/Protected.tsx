'use client';
import { useAuth } from '../store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Protected({ children }: any) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/login');
    }, [user]);

    return user ? children : null;
}
