// app/login/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState("login"); // 'login' o 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión, redirigimos al dashboard
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted && data?.session) {
        router.push("/dashboard");
      }
    };
    check();
    return () => (mounted = false);
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signErr) {
      setError(signErr.message);
    } else {
      // Redirigimos al dashboard; la sesión queda persistida automáticamente
      router.push("/dashboard");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Registrar usuario en auth
    const { data, error: signErr } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signErr) {
      setLoading(false);
      setError(signErr.message);
      return;
    }

    // Si el usuario se creó localmente, insertar perfil en tabla profiles (RLS permite solo owner)
    const user = data.user;
    if (user) {
      // full_name puede venir del input
      const { error: insertErr } = await supabase.from("profiles").insert([
        { id: user.id, full_name: fullName || null },
      ]);

      // No bloqueamos al usuario si falla el insert — solo mostramos error
      if (insertErr) {
        console.warn("No se pudo insertar profile:", insertErr);
      }
    }

    setLoading(false);

    // Notar: si signup requiere confirmación por email, session podría no existir.
    // Redirigimos a dashboard si hay sesión, de lo contrario avisamos al usuario.
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session) {
      router.push("/dashboard");
    } else {
      // Avisar al usuario que confirme su correo si aplica
      alert(
        "Registro completado. Revisa tu correo para confirmar la cuenta si recibes un email de confirmación."
      );
      router.push("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-yellow-50 px-4">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800">Acceso</h2>
          <p className="text-center text-gray-500 mb-6">
            Inicia sesión o crea tu cuenta para comenzar
          </p>

          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 text-center ${
                tab === "login"
                  ? "border-b-2 border-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-2 text-center ${
                tab === "register"
                  ? "border-b-2 border-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={tab === "login" ? handleLogin : handleRegister}
            className="space-y-4"
          >
            {tab === "register" && (
              <div>
                <label className="block text-sm font-medium">Nombre completo</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-lg shadow hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Cargando..." : tab === "login" ? "Iniciar Sesión" : "Registrarse"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-green-600 hover:underline">
              ← Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
