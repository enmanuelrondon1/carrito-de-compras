import { useReducer, useRef, useState } from "react";

const types = {
  menos: "menos",
  mas: "mas",
  eliminar: "eliminar",
  comprar: "comprar",
};

const valorInicial = [];

const reducer = (state, action) => {
  switch (action.type) {
    case types.menos:
      return state.map((item) =>
        item.id === action.payload && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
    case types.mas:
      return state.map((item) =>
        action.payload === item.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    case types.eliminar:
      return state.filter((item) => item.id !== action.payload);

    case types.comprar:
      return [...state, action.payload];
    default:
  }
  return state;
};

export default function Compra() {
  const inputName = useRef(null);
  const [lista, dispatch] = useReducer(reducer, valorInicial);

  const [product, setProduct] = useState("");

  return (
    <>
      <label htmlFor="producto">Producto</label>
      <input
        id="producto"
        ref={inputName}
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <button
        className="libre"
        onClick={() => {
          inputName.current.focus();
          setProduct("");
          dispatch({
            type: types.comprar,
            payload: { id: Date.now(), nombre: product, cantidad: 1 },
          });
        }}
      >
        Añadir
      </button>

      {lista.map((articulo) => (
        <div key={articulo.id}>
          {articulo.nombre} ({articulo.cantidad} unidades)
          <button
            onClick={() =>
              dispatch({ type: types.menos, payload: articulo.id })
            }
          >
            -{" "}
          </button>
          <button
            onClick={() => dispatch({ type: types.mas, payload: articulo.id })}
          >
            +
          </button>
          <button
            onClick={() =>
              dispatch({ type: types.eliminar, payload: articulo.id })
            }
          >
            x
          </button>
        </div>
      ))}
    </>
  );
}
