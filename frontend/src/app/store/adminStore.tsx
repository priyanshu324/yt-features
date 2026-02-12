'use client';

import { createContext, useContext, useState } from 'react';

export type Role = 'user' | 'admin';
export type UserStatus = 'pending' | 'approved';

interface AdminUser {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
    role: Role;
}

interface AdminContextType {
    users: AdminUser[];
    approveUser: (id: string) => void;
    rejectUser: (id: string) => void;
    changeRole: (id: string, role: Role) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({
    children
}: {
        children: React.ReactNode;
}) {
    const [users, setUsers] = useState<AdminUser[]>([
        {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
          status: 'pending',
          role: 'user'
      },
      {
          id: '2',
          name: 'Team Admin',
          email: 'team@creatorocr.com',
          status: 'approved',
          role: 'admin'
      }
  ]);

    const approveUser = (id: string) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, status: 'approved' } : u
            )
        );
    };

    const rejectUser = (id: string) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const changeRole = (id: string, role: Role) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, role } : u
            )
        );
    };

    return (
      <AdminContext.Provider
          value={{ users, approveUser, rejectUser, changeRole }}
      >
          {children}
      </AdminContext.Provider>
  );
}

export function useAdminStore() {
    const ctx = useContext(AdminContext);
    if (!ctx) throw new Error('useAdminStore must be used inside AdminProvider');
    return ctx;
}
