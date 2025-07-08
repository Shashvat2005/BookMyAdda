'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from 'next-auth/react';
import styles from '@/styles/login.module.css';
import LoginForm from '@/components/auth/LoginForm';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/"); // or "/dashboard"
      }
    });
    return () => unsubscribe();
  }, [router]);

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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <button
            type="button"
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: "0.5rem",
              marginBottom: "1rem",
              fontSize: "1.2rem",
              padding: 2,
              color: "inherit",
            }}
            aria-label="Back to Home"
          >
            &#8592;
          </button>
          <h2 className={styles['login-title']}>Login</h2>
        </div>
        <LoginForm></LoginForm>
        <div className={styles['social-login']}>
          <button
            className={`${styles['social-btn']} ${styles.google}`}
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <i className='fab fa-google'></i> Sign in with Google
          </button>
        </div>

        <div className={styles['signup-link']}>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className={styles['signup-link-anchor']}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
