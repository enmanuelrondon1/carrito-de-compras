import { useState } from "react";
import { useReducer } from "react";

const types = {
  masM: "masM",
  menosM: "menosM",
  masA: "masA",
  menosA: "menosA",
};


const currentTime = new Date();
const month = currentTime.getMonth();
const year = currentTime.getFullYear();



const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const valorInicial = { m: month, a: year };

const reducer = (state, action) => {
  let newMonth = state.m;
  let newYear = state.a;

  switch (action.type) {
    case types.masM:
      newMonth = newMonth == 11 ? 0 : newMonth + 1;
      break;
    case types.menosM:
      newMonth = newMonth == 0 ? 11 : newMonth - 1;
      break;

    case types.masA:
      newYear = newYear + action.payload;
      break;

    case types.menosA:
      newYear = newYear - action.payload;
      break;
  }
  return { m: newMonth, a: newYear };
};
const Calendario = () => {
  const [fecha, dispatch] = useReducer(reducer, valorInicial);
  const [unidades, setUnidades] = useState(1)
  return (
    <>
      <div
        style={
          (fecha.m < month && fecha.a <= year) || fecha.a < year
            ? { color: "red" } : { color: "green" }}
      > {meses[fecha.m]} {fecha.a} </div>

      <div>
        <button onClick={() => dispatch({ type:types.menosM })}>-</button>
       <span>  Meses: </span>
         <button onClick={() => dispatch({ type:types.masM })}>+</button>
      </div>

      <div>
        <button onClick={() => dispatch({ type: types.menosA, payload:Number(unidades) })}>-</button>
        <input type="number" value={unidades} onChange={(e) => setUnidades(e.target.value)} />
        <span>Años:</span>
         <button onClick={() => dispatch({ type: types.masA, payload:Number(unidades) })}>+</button>
      </div>
    </>
  );
};
export default Calendario;
