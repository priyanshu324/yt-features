'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { useAuth } from '../store/authStore';
import { useRouter } from 'next/navigation';

export default function RegisterClient() {
  const { registerWithCredentials } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    try {
      await registerWithCredentials(name, email, password);
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />

      <main className="section flex justify-center py-16 px-4">
        <div className="card w-full max-w-md p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Create your account</h2>

          {error && (
            <div className="border border-red-800 bg-red-950 p-3 text-sm text-red-300 rounded">
              {error}
            </div>
          )}

            <input
            className="input-ui"
              placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input
            className="input-ui"
              placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
            className="input-ui"
              placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

          <button onClick={handleRegister} className="btn-primary w-full">
              Create account
          </button>

          <p className="text-sm text-neutral-400 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
