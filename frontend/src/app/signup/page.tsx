'use client';
import Link from 'next/link';
import styles from '@/styles/signup.module.css';
import SignupForm from '@/components/auth/SignupForm';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";


export default function SignupPage() {

    const router = useRouter();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.replace("/"); // or "/dashboard"
        }
      });
      return () => unsubscribe();
    }, [router]);

  return (
    <div className={styles['container']}>
      <div className={styles['signup-box']}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <button
              type="button"
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginTop: "1rem",
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
          <h2 className={styles['login-title']}>Create Your Account</h2>
        </div>
        <SignupForm>
        </SignupForm>
        <div className={styles['account-exists']}>
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
