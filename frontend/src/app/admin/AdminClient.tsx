'use client';

import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdminStore, Role, UserStatus } from '../store/adminStore';
import { useOCRStore } from '../store/ocrStore';
import { useAuth } from '../store/authStore';

export default function AdminClient() {
    const { user } = useAuth();
    const { users, approveUser, rejectUser, changeRole } = useAdminStore();
    const { records } = useOCRStore();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
    const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');

    if (!user || user.role !== 'admin') {
        return (
            <main className="section py-20 text-center">
                <h1 className="text-2xl font-semibold">Access Denied</h1>
              <p className="text-neutral-400 mt-2">Admin access only.</p>
          </main>
      );
  }

    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const matchesSearch =
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === 'all' || u.status === statusFilter;

            const matchesRole =
                roleFilter === 'all' || u.role === roleFilter;

            return matchesSearch && matchesStatus && matchesRole;
        });
    }, [users, search, statusFilter, roleFilter]);

    const totalUsers = users.length;
    const approvedUsers = users.filter((u) => u.status === 'approved').length;
    const pendingUsers = users.filter((u) => u.status === 'pending').length;
    const totalOCRRuns = records.length;
    const totalCharacters = records.reduce((s, r) => s + r.text.length, 0);

    return (
        <>
            <Header />

          <main className="section py-12 space-y-12">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>

              {/* METRICS */}
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Stat label="Total Users" value={totalUsers} />
                  <Stat label="Approved Users" value={approvedUsers} />
                  <Stat label="Pending Users" value={pendingUsers} />
                  <Stat label="OCR Runs" value={totalOCRRuns} />
                  <Stat label="Characters Extracted" value={totalCharacters} />
              </section>

              {/* SEARCH & FILTER BAR */}
              <section className="card p-4 flex flex-col lg:flex-row gap-4">
                  <input
                      placeholder="Search by name or email"
                      className="input-ui flex-1"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                  />

                  <select
                      className="input-ui lg:w-48"
                      value={statusFilter}
                      onChange={(e) =>
                          setStatusFilter(e.target.value as UserStatus | 'all')
                      }
                  >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                  </select>

                  <select
                      className="input-ui lg:w-48"
                      value={roleFilter}
                      onChange={(e) =>
                          setRoleFilter(e.target.value as Role | 'all')
                      }
                  >
                      <option value="all">All Roles</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                  </select>
              </section>

              {/* USER LIST */}
              <section className="space-y-4">
                  <h2 className="text-xl font-semibold">
                      Users ({filteredUsers.length})
                  </h2>

                  {filteredUsers.length === 0 && (
                      <p className="text-neutral-400 text-sm">
                          No users match your filters.
                      </p>
                  )}

                  {filteredUsers.map((u) => (
                      <div
                          key={u.id}
                          className="card p-4 flex flex-col sm:flex-row sm:justify-between gap-4"
                      >
                          <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-sm text-neutral-400">{u.email}</p>
                      <div className="text-sm space-x-3">
                          <span>Status: {u.status}</span>
                          <span>Role: {u.role}</span>
                      </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                      {u.status === 'pending' && (
                          <>
                              <button
                                  onClick={() => approveUser(u.id)}
                                  className="bg-green-600 px-3 py-1 rounded"
                              >
                                  Approve
                              </button>
                              <button
                                  onClick={() => rejectUser(u.id)}
                                  className="bg-red-600 px-3 py-1 rounded"
                              >
                                  Reject
                              </button>
                          </>
                      )}

                      {u.status === 'approved' && (
                          <>
                              {u.role === 'user' ? (
                                  <button
                                      onClick={() => changeRole(u.id, 'admin')}
                                      className="bg-indigo-600 px-3 py-1 rounded"
                                  >
                                      Make Admin
                                  </button>
                              ) : (
                                  <button
                                      onClick={() => changeRole(u.id, 'user')}
                                      className="bg-yellow-600 px-3 py-1 rounded"
                                  >
                                      Make User
                                  </button>
                              )}
                          </>
                      )}
                  </div>
              </div>
          ))}
              </section>
          </main>

          <Footer />
      </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
    return (
        <div className="card p-4">
            <p className="text-sm text-neutral-400">{label}</p>
            <p className="text-xl font-semibold">{value}</p>
        </div>
    );
}
