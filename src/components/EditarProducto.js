import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useHistory } from "react-router-dom";
import clienteAxios from "../config/axios";

const EditarProducto = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [productoActual, setProductoActual] = useState();
  const pedirDatos = async () => {
    const productoSeleccionado = await clienteAxios.get(
      "/productos/" + props.match.params.id
    );
    console.log({ productoSeleccionado });
    setProductoActual(productoSeleccionado.data);
  };

  useEffect(() => {
    pedirDatos();
  }, []);

  // Leer los datos del formulario
  const onChangeFormulario = (e) => {
    setProductoActual({
      ...productoActual,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditarProducto = (e) => {
    e.preventDefault();

    dispatch(editarProductoAction(productoActual));

    history.push("/");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={productoActual?.nombre}
                  onChange={onChangeFormulario}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={productoActual?.precio}
                  onChange={onChangeFormulario}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
