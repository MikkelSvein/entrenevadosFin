"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      } else {
        setSession(data.session);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login");
      }
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  if (!session) {
    return null; // evita parpadeo antes de redirigir
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Bienvenido al Dashboard</h1>
        <p className="text-center">
          Hola, <strong>{session.user.email}</strong>. ¡Has iniciado sesión correctamente!
        </p>
        <div className="mt-4 text-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15932.215393698357!2d-75.4978!3d4.8143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38873d18c77f23%3A0xabc123456789!2sParque%20Los%20Nevados!5e0!3m2!1ses!2sco!4v1694471745791!5m2!1ses!2sco"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
