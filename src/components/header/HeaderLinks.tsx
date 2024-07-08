"use client";

import Link from "next/link";
import styles from "@/components/header/headerLinks.module.css";
import { usePathname } from "next/navigation";
import { logoutUserAction } from "@/lib/actions";

export default function HeaderLinks() {
  const pathname = usePathname();

  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={styles.navbarLinks}>
          <li>
            <Link
              className={`${styles.link} ${
                pathname == "/dashboard" ? styles.underline : ""
              }`}
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${
                pathname == "/profile" ? styles.underline : ""
              }`}
              href={"/profile"}
            >
              Perfil
            </Link>
          </li>
        </ul>
        <li className={styles.logout} onClick={() => logoutUserAction()}>
          Logout
        </li>
      </nav>
    </header>
  );
}
