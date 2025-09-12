"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import dynamic from "next/dynamic";

// Import dinámico de Leaflet (para que no falle en SSR)
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setProfile(profileData);
    };

    getProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center p-4 bg-green-700 text-white">
        <h1 className="text-xl font-bold">EntreNevados</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </nav>

      <main className="p-6">
        <h2 className="text-2xl font-bold text-green-800">
          Bienvenido {profile?.full_name || "Explorador"}
        </h2>
        <p className="text-gray-600 mb-6">
          Aquí encontrarás los planes disponibles y su ubicación en el mapa.
        </p>

        {/* Aquí puedes mostrar cards de planes */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="font-bold text-lg">Senderismo</h3>
            <p className="text-sm text-gray-600">
              Explora rutas increíbles alrededor de los nevados.
            </p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="font-bold text-lg">Ciclismo</h3>
            <p className="text-sm text-gray-600">
              Vive la experiencia de recorrer paisajes únicos en bicicleta.
            </p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="font-bold text-lg">Cultura</h3>
            <p className="text-sm text-gray-600">
              Descubre la riqueza cultural y gastronómica de la región.
            </p>
          </div>
        </div>

        {/* Mapa con Leaflet */}
        <div className="h-96">
          <Map />
        </div>
      </main>
    </div>
  );
}
