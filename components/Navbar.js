"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="EntreNevados" height="40" className="me-2" />
          <span className="fw-bold text-brown">EntreNevados</span>
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link fw-bold ${pathname === "/" ? "active" : ""}`}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/categorias"
                className={`nav-link fw-bold ${pathname === "/categorias" ? "active" : ""}`}
              >
                Categorías
              </Link>
            </li>

            {session ? (
              <>
                <li className="nav-item me-2">
                  <span className="nav-link fw-bold">{session.user.email}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-warning fw-bold" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="btn btn-warning fw-bold">
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
