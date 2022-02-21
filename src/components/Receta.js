import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import Modal from "@mui/material/Modal";
/* import { makeStyles } from "@mui/styles"; */

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "95vh",
  overflow: "auto",
  backgroundColor: "#fff",
  border: "1px solid blue",
  borderRadius: 10,
  boxShadow: 24,
  padding: 30,
};

/* const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
})); */

const Receta = ({ receta }) => {
  // Configuracion del modal de mui
  /*   const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();*/
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Extraer los valores del context
  const { informacionReceta, setIdReceta, setReceta } =
    useContext(ModalContext);

  // Muestra y formatea los ingredientes
  const mostrarIngredientes = (informacion) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (informacion[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {informacion[`strIngredient${i}`]}{" "}
            {informacion[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              setIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver receta
          </button>
          <Modal
            open={open}
            onClose={() => {
              setIdReceta(null);
              setReceta({});
              handleClose();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style}>
              <h2>{informacionReceta.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{informacionReceta.strInstructions}</p>
              <img
                className="img-fluid my-4"
                src={informacionReceta.strDrinkThumb}
                alt={`Imagen de ${informacionReceta.strDrink}`}
              />
              <h3>Ingredientes y cantidades</h3>
              <ul>
                {mostrarIngredientes(informacionReceta)}
              </ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
