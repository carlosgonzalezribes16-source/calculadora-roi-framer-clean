
import React, { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CalculadoraROI({ clean = true, compact = true }) {
  const [datos, setDatos] = useState({
    llamadasDiarias: 6,
    llamadasPerdidas: 2,
    valorCliente: 35,
    diasLaborables: 28,
    minutosPromedio: 2.6,
    plan: "basic",
  });

  const calcularCosteServicio = () => {
    const minutosMensuales = datos.llamadasDiarias * datos.diasLaborables * datos.minutosPromedio;
    let costePorMinuto = 0, costePlan = 0;
    if (datos.plan === "basic"){ costePorMinuto = 0.25; costePlan = 149; }
    else if (datos.plan === "pro"){ costePorMinuto = 0.22; costePlan = 199; }
    else if (datos.plan === "premium"){ costePorMinuto = 0.19; costePlan = 299; }
    return minutosMensuales * costePorMinuto + costePlan;
  };

  const resultados = useMemo(() => {
    const clientesPerdidos = datos.llamadasPerdidas * datos.diasLaborables;
    const dineroPerdido = clientesPerdidos * datos.valorCliente;
    const costeServicio = calcularCosteServicio();
    const gananciaNeta = dineroPerdido - costeServicio;
    const roi = costeServicio > 0 ? ((gananciaNeta / costeServicio) * 100).toFixed(2) : "0.00";
    return { clientesPerdidos, dineroPerdido, gananciaNeta, roi, costeServicio };
  }, [datos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: name === "plan" ? value : Number(value) }));
  };

  const chartData = [
    { name: "Sin codeX", euros: resultados.dineroPerdido },
    { name: "Coste codeX", euros: resultados.costeServicio },
  ];

  return (
    <div className={`container ${compact ? "compact" : ""}`}>
      <h1 className={clean ? "hidden" : ""}> </span>?</h1>
      <p className={clean ? "hidden" : "muted"}> </p>

      <div className="spacer"></div>

      <div className="card">
        <div className="content grid grid-2">
          <div>
            <label>Media de llamadas diarias</label>
            <input type="number" name="llamadasDiarias" value={datos.llamadasDiarias} onChange={handleChange} />
          </div>
          <div>
            <label>Llamadas perdidas diarias</label>
            <input type="number" name="llamadasPerdidas" value={datos.llamadasPerdidas} onChange={handleChange} />
          </div>
          <div>
            <label>Valor medio por cliente (€)</label>
            <input type="number" name="valorCliente" value={datos.valorCliente} onChange={handleChange} />
          </div>
          <div>
            <label>Días laborables al mes</label>
            <input type="number" name="diasLaborables" value={datos.diasLaborables} onChange={handleChange} />
          </div>
          <div>
            <label>Minutos promedio por llamada</label>
            <input type="number" name="minutosPromedio" value={datos.minutosPromedio} onChange={handleChange} step="0.1" />
          </div>
          <div>
            <label>Plan contratado</label>
            <select name="plan" value={datos.plan} onChange={handleChange}>
              <option value="basic">Basic (149 €)</option>
              <option value="pro">Pro (199 €)</option>
              <option value="premium">Premium (299 €)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="spacer"></div>

      <div className="grid grid-2">
        <div className="card">
          <div className="content">
            <h2 style={{marginTop:0}}>Resultados</h2>
            <div>
              <p>Clientes perdidos al mes: <strong>{resultados.clientesPerdidos}</strong></p>
              <p>Dinero perdido por llamadas no atendidas: <strong>{resultados.dineroPerdido.toFixed(2)} €</strong></p>
              <p>Coste total del servicio codeX: <strong>{resultados.costeServicio.toFixed(2)} €</strong></p>
              <p>Ganancia neta con codeX: <strong>{resultados.gananciaNeta.toFixed(2)} €</strong></p>
              <p>ROI: <strong>{resultados.roi}%</strong></p>
              <p className="small">* Solo considera llamadas perdidas. No incluye chats, reservas, pedidos ni horas ahorradas.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="content">
            <h2 style={{marginTop:0}}>Comparativa visual</h2>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="euros" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
