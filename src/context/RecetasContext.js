import React, {
  createContext,
  useState,
  useEffect,
} from "react";
import Axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, setRecetas] = useState([]);
  const [busquedaReceta, setBusquedaReceta] = useState({
    ingrediente: "",
    categoria: "",
  });
  const [consultar, setConsultar] = useState(false);
  const { nombre, categoria } = busquedaReceta;
  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const resultado = await Axios.get(url);
        setRecetas(resultado.data.drinks);
      };
      obtenerRecetas();
    }
  }, [busquedaReceta]);

  return (
    <RecetasContext.Provider
      value={{ recetas, setBusquedaReceta, setConsultar }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
