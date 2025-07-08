// 'use client';
// import styles from '@/styles/signup.module.css';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { z } from 'zod';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signupWithEmail } from '@/lib/auth';
// import { FirebaseError } from 'firebase/app';

// const signupSchema = z.object({
//   firstName: z.string().min(1, "First name required"),
//   lastName: z.string().min(1, "Last name required"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   passwordcnf: z.string().min(6, "Password must be at least 6 characters"),
// }).refine((data) => data.password === data.passwordcnf, {
//   message: "Passwords do not match",
//   path: ["passwordcnf"],
// });

// type SignupFormInputs = z.infer<typeof signupSchema>;

// export default function SignupForm() {

//     const [showPwd, setShowPwd] = useState(false);
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<SignupFormInputs>({
//         resolver: zodResolver(signupSchema),
//     });

//     const onSubmit: SubmitHandler<SignupFormInputs> = async (data)=> {
//         setLoading(true);
//         try {
//           const displayName = `${data.firstName} ${data.lastName}`;
//           await signupWithEmail(data.email, data.password, displayName);
//           router.push("/login");
          
//         } catch (error) {
//           if (error instanceof FirebaseError) {
//             alert(error.message);
//           }
//         } finally {
//         setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//         <div className={styles['form-group']}>
//         <label>Email</label>
//         <input name='email' type='email' required onChange={handleChange} />
//         </div>
//         <div className={styles['form-group']}>
//         <label>Password</label>
//         <input name='password' type='password' required onChange={handleChange} />
//         </div>
//         <button type='submit' className={styles['submit-btn']}>
//         Login
//         </button>
//     </form>
//     );
// }

'use client';
import styles from '@/styles/login.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginWithEmail } from '@/lib/auth';
import { FirebaseError } from 'firebase/app';

// Define schema for login (only email and password)
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setLoading(true);
        try {
          await loginWithEmail(data.email, data.password);
          router.push("/"); // Change to your desired route
        } catch (error) {
          if (error instanceof FirebaseError) {
            alert(error.message);
          }
        } finally {
          setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['form-group']}>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input {...register("email")} type="email" required />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input {...register("password")} type="password" required />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button type='submit' className={styles['submit-btn']} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
    );
}

