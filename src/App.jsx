import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Button from "./components/Button";
import data from "./helpers/data.json";
import { calcularTotalPagar } from "./helpers/calcularTotalPagar";

function App() {
  const [cantidad, setCantidad] = useState(1000),
    [meses, setMeses] = useState(6),
    [total, setTotal] = useState(calcularTotalPagar(cantidad, meses)),
    MIN = 1000,
    MAX = 100000,
    STEP = 1000;

  const pagoMensual = total / meses;

  // const pagoMensual = () => {
  //   console.log(total / meses);
  //   return total / meses;
  // };

  useEffect(() => {
    setTotal(calcularTotalPagar(cantidad, meses));
  }, [cantidad, meses]);

  const formatearDinero = (valor) => {
    const formater = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formater.format(valor);
  };

  const ModificarRangoCantidad = (e) => {
    setCantidad(e.target.value);
    setTotal(calcularTotalPagar(cantidad, meses));
  };
  const cambiarMeses = (e) => {
    setMeses(parseInt(e.target.value));
  };

  const handleChangeIncremento = () => {
    const valor = Number(cantidad) + Number(STEP);

    if (valor > MAX) {
      alert("Cantidad no valida, debe ser menor");
      return;
    }
    setCantidad(valor);
    setTotal(calcularTotalPagar(cantidad, meses));
  };

  const handleChangeDecremento = () => {
    const valor = Number(cantidad) - Number(STEP);
    if (valor < MIN) {
      alert("Cantidad no valida");
      return;
    }
    setCantidad(valor);
    setTotal(calcularTotalPagar(cantidad, meses));
  };

  return (
    <>
      <div className="my-20 max-w-lg mx-auto bg-indigo-50 shadow-xl p-10">
        <Header />

        {/*BUTTONS*/}
        <div className="flex justify-between mt-10">
          <Button
            operador="-"
            metodo={handleChangeDecremento}
            valor={cantidad}
          />
          <Button metodo={handleChangeIncremento} valor={cantidad} />
        </div>

        {/**/}
        <div className="my-5">
          <input
            type="range"
            className="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
            min={MIN}
            max={MAX}
            step={STEP}
            value={cantidad}
            onChange={ModificarRangoCantidad}
          />

          <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
            {formatearDinero(cantidad)}
          </p>

          <h2 className="text-2xl font-extrabold text-gray-500 text-center">
            Elige un <span className="text-indigo-600">Plazo</span> a pagar
          </h2>

          <select
            className="w-full p-2 bg-white border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-3"
            value={meses}
            onChange={cambiarMeses}
          >
            <option value={6}>6 Meses</option>
            <option value={12}>12 Meses</option>
            <option value={24}>24 Meses</option>
          </select>
        </div>

        {total > 0 ? (
          <div className="my-5 space-y-3 bg-gray-50 p-5">
            <h2 className="text-2xl font-extrabold text-gray-500 text-center">
              Resumen <span className="text-indigo-600">de pagos</span>
            </h2>
            <p className="text-xl text-gray-500 text-center font-bold">
              {meses}
            </p>
            <p className="text-xl text-gray-500 text-center font-bold">
              Total a pagar: {formatearDinero(total)}
            </p>
            <p className="text-xl text-gray-500 text-center font-bold">
              Mensualidad: {formatearDinero(pagoMensual)}
            </p>
          </div>
        ) : (
          <p className="text-xl text-purple-500 text-center font-bold">
            Añade un monto plazo requerido
          </p>
        )}

        {/*
                <ul>
          {data.frameworks.map((frame, index) => (
            <ElementoLista key={index} frame={frame} />
          ))}
        </ul>
        
        */}
      </div>
    </>
  );
}

export default App;
