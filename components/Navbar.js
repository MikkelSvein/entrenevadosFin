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
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          <img src="/images/entrenevados.png" alt="EntreNevados" height="40" />
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${pathname === "/" ? "fw-bold" : ""}`}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/categorias"
                className={`nav-link ${pathname === "/categorias" ? "fw-bold" : ""}`}
              >
                Categorías
              </Link>
            </li>
          </ul>

          {session ? (
            <div className="d-flex align-items-center">
              <span className="me-3">{session.user.email}</span>
              <button className="btn btn-warning" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-warning">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
