'use client';
import Link from 'next/link';
import styles from '@/styles/signup.module.css';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {

  return (
    <div className={styles['container']}>
      <div className={styles['signup-box']}>
        <h2 className={styles['login-title']}>Create Your Account</h2>
        <SignupForm>
        </SignupForm>
        <div className={styles['account-exists']}>
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
