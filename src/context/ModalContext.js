import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  // State del provider
  const [idReceta, setIdReceta] = useState(null);
  const [informacionReceta, setReceta] = useState({});

  // Una vez que tenemos una receta, llamar la api
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idReceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
      const resultado = await Axios.get(url);
      setReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  }, [idReceta]);
  return (
    <ModalContext.Provider
      value={{ informacionReceta, setIdReceta, setReceta }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
