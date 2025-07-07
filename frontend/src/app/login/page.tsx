'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import styles from '@/styles/login.module.css';

export default function LoginPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', form);
  };

  if (session) {
    return (
      <div className={styles.container}>
        <div className={styles['login-box']}>
          <h2 className={styles['login-title']}>Welcome, {session.user?.name}</h2>
          <button className={styles['submit-btn']} onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles['login-box']}>
        <h2 className={styles['login-title']}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input name='email' type='email' required onChange={handleChange} />
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input name='password' type='password' required onChange={handleChange} />
          </div>
          <button type='submit' className={styles['submit-btn']}>
            Login
          </button>
        </form>

        <div className={styles['social-login']}>
          <button
            className={`${styles['social-btn']} ${styles.google}`}
          onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <i className='fab fa-google'></i> Sign in with Google
          </button>
        </div>

        <div className={styles['signup-link']}>
          Don't have an account?{' '}
          <Link href='/signup' className={styles['signup-link-anchor']}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
