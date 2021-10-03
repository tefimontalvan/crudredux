import React, { Fragment, useEffect } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";
import { Link } from "react-router-dom";

const Productos = () => {
  const error = useSelector((state) => state.productos.error);

  const dispatch = useDispatch();

  const listaProductos = useSelector((state) => state.productos.productos);
  console.log({ listaProductos });

  useEffect(() => {
    //Consulta la API
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, []);

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>

      <table className="table table-striped table-bordered">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col" className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {listaProductos?.data?.map((producto) => {
            return (
              <tr>
                <td>{producto.nombre}</td>
                <td>{producto.precio}$</td>
                <td className="float-right">
                  <Link
                    className="btn btn-danger nuevo-post d-block d-md-inline-block"
                    to={"/productos/editar/" + producto.id}
                  >
                    Editar
                  </Link>
                  <button className="btn btn-success ml-2 text-uppercase">
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {error ? (
        <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>
      ) : null}
    </Fragment>
  );
};

export default Productos;
