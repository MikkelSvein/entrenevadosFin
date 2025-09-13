import React from "react";

function Dashboard({ userEmail }) {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light p-3">
          <h5 className="fw-bold">Bienvenido, {userEmail}</h5>
          <hr />
          <h6 className="fw-bold">Tus Planes</h6>

          {/* Plan de ejemplo */}
          <div className="card mb-3 shadow-sm">
            <img
              src="/aventura.jpg"
              className="card-img-top"
              alt="Turismo de Aventura"
            />
            <div className="card-body">
              <h5 className="card-title">Turismo de Aventura</h5>
              <p className="card-text">Escalada, rafting y senderismo</p>
              <button className="btn btn-warning w-100 fw-bold">
                Ver en mapa
              </button>
            </div>
          </div>

          <div className="card mb-3 shadow-sm">
            <img
              src="/naturaleza.jpg"
              className="card-img-top"
              alt="Turismo de Naturaleza"
            />
            <div className="card-body">
              <h5 className="card-title">Turismo de Naturaleza</h5>
              <p className="card-text">
                Avistamiento de aves y senderismo ecológico
              </p>
              <button className="btn btn-warning w-100 fw-bold">
                Ver en mapa
              </button>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="col-md-9 col-lg-10 p-0">
          <div id="map" style={{ height: "100vh", width: "100%" }}></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
