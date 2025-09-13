"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Mapa = dynamic(() => import("./components/MapView"), { ssr: false });

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

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-4 p-3">
          {session && (
            <>
              <h5 className="fw-bold">Bienvenido, {session.user.email}</h5>
              <h6 className="mt-4">Tus Planes</h6>
              {/* Aquí van los cards de planes */}
            </>
          )}
        </div>

        {/* Mapa */}
        <div className="col-md-8">
          <Mapa />
        </div>
      </div>
    </div>
  );
}
