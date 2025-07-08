'use client';
import styles from '@/styles/signup.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupWithEmail } from '@/lib/auth';
import { FirebaseError } from 'firebase/app';

const signupSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordcnf: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.passwordcnf, {
  message: "Passwords do not match",
  path: ["passwordcnf"],
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupForm() {

    const [showPwd, setShowPwd] = useState(false);
    const [showCnfPwd, setShowCnfPwd] = useState(false); // NEW STATE
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormInputs>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit: SubmitHandler<SignupFormInputs> = async (data)=> {
        setLoading(true);
        try {
          const displayName = `${data.firstName} ${data.lastName}`;
          await signupWithEmail(data.email, data.password, displayName);
          router.push("/login");
          
        } catch (error) {
          if (error instanceof FirebaseError) {
            alert(error.message);
          }
        } finally {
        setLoading(false);
        }
    };

    return (
        <form id="signup-form" onSubmit={handleSubmit(onSubmit)} className={styles['form-group']}>
      <div className={styles['form-group']}>
        <label>First Name</label>
        <input {...register("firstName")} required />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>
      <div className={styles['form-group']}>
        <label>Last Name</label>
        <input {...register("lastName")} required />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>
      <div className={styles['form-group']}>
        <label>Email</label>
        <input {...register("email")} type="email" required />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className={`${styles['form-group']} ${styles['password-group']}`}>
        <label>Password</label>
        <input
          {...register("password")}
          type={showPwd ? 'text' : 'password'}
          required
        />
        <button
          type="button"
          className={styles['toggle-password']}
          onClick={() => setShowPwd(prev => !prev)}
        >
          <i className={`fas fa-eye${showPwd ? '-slash' : ''}`}></i>
        </button>
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div className={`${styles['form-group']} ${styles['password-group']}`}>
        <label>Confirm Password</label>
        <input
          {...register("passwordcnf")}
          type={showCnfPwd ? 'text' : 'password'}
          required
        />
        <button
          type="button"
          className={styles['toggle-password']}
          onClick={() => setShowCnfPwd(prev => !prev)}
        >
          <i className={`fas fa-eye${showCnfPwd ? '-slash' : ''}`}></i>
        </button>
        {errors.passwordcnf && <span>{errors.passwordcnf.message}</span>}
      </div>

      <button type="submit" className={styles['signup-btn']} disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
    );
}
