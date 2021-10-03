import React, { useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const EditarProducto = (props) => {
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

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={productoActual?.nombre}
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
