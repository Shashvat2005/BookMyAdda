"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import styles from "@/styles/home.module.css";
import "@/app/globals.css";
import { logout } from "@/lib/auth";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // If user is logged in and on /login or /signup, redirect to home/dashboard
      if (
        firebaseUser &&
        (window.location.pathname === "/login" || window.location.pathname === "/signup")
      ) {
        router.replace("/"); // or "/dashboard" if you have a dashboard
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.replace("/login");
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>BOOK MY ADDA</h1>
        <nav className={styles.nav}>
          <button>Support</button>
          <button onClick={() => document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" })}>
            About Us
          </button>
          <button>Connect</button>
          {!user ? (
            <Link href="/login"><button>Login/Signup</button></Link>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
          <button><i className="fas fa-user"></i> Profile</button>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Welcome to Book My Adda</h1>
          <p>Your Ultimate Travel Partner</p>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Where would you like to go?" />
            <button><i className="fas fa-search"></i> Search</button>
          </div>
        </div>
      </section>

      <nav className={styles.navigation}>
        <ul>
          <li><a href="#"><i className="fas fa-hotel"></i> Accommodations</a></li>
          <li><a href="#"><i className="fas fa-plane"></i> Flights</a></li>
          <li><a href="#"><i className="fas fa-box"></i> Packages</a></li>
          <li><a href="#"><i className="fas fa-building"></i> Transfer</a></li>
          <li><a href="#"><i className="fas fa-list"></i> List Your Property</a></li>
        </ul>
      </nav>

      <section className={styles.trippy}>
        <h2><i className="fas fa-robot"></i> Meet Trippy - Your Smart Travel Assistant</h2>
        <p>Let Trippy help plan your perfect trip</p>
        <div className={styles.trippyOptions}>
          <span><i className="fas fa-tag"></i> Best Deals</span>
          <span><i className="fas fa-chart-bar"></i> Hotel Comparisons</span>
          <span><i className="fas fa-brain"></i> AI Recommendations</span>
          <span><i className="fas fa-map-marked-alt"></i> Travel Planning</span>
        </div>
      </section>

      <section className={styles.hotDeals}>
        <h2><i className="fas fa-fire"></i> Hot Hotel Deals</h2>
        <div className={styles.dealsGrid}>
          {[1, 2, 3].map((_, i) => (
            <div className={styles.dealCard} key={i}>
              <div className={styles.dealImage}>
                <img src="/background.jpg" alt="Hotel" />
                <span className={styles.discount}>-30%</span>
              </div>
              <div className={styles.dealContent}>
                <h3>Sample Hotel</h3>
                <p><i className="fas fa-map-marker-alt"></i> City, India</p>
                <p>₹5,999 <span className={styles.originalPrice}>₹8,599</span></p>
                <button className={styles.bookNow}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.aboutUs} id="about-us">
        <h2><i className="fas fa-info-circle"></i> About Us</h2>
        <p><strong>Welcome to Book My Adda – &quot;Your Travel, Your Adda&quot;</strong></p>
        <p>At Book My Adda, we aim to redefine travel by making it seamless, secure, and organized. Our platform is designed to simplify trip planning by offering insights, best hotel deals, and intelligent recommendations. Whether you&apos;re booking a luxurious getaway or a last-minute adventure, we provide the tools to make your journey smooth, affordable, and memorable.</p>

        <p><strong>Our Mission</strong></p>
        <p>To revolutionize travel booking by offering a seamless, transparent, and personalized experience for business and individual travelers.</p>

        <p><strong>Our Vision</strong></p>
        <p>To become India&apos;s most trusted and preferred travel‑booking platform, delivering convenience, innovation, and unmatched value.</p>

        <p><strong>Who We Serve?</strong></p>
        <p><strong>B2B –</strong> Corporate clients, event planners, and travel agencies looking for bulk bookings.</p>
        <p><strong>B2C –</strong> Individual travelers seeking the best hotel deals and smart recommendations.</p>

        <p>At Book My Adda, we&apos;re your family travel partner. Whether it&apos;s a business trip or a vacation, we make sure you get the best deals.</p>

        <p><strong>Start your journey with us today!</strong></p>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.socialLinks}>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
          <p>&copy; 2025 Book My Adda | All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
