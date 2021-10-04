import React, { Fragment, useEffect } from "react";
import Swal from "sweetalert2";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";
import { useHistory } from "react-router-dom";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../actions/productoActions";

const Productos = () => {
  const error = useSelector((state) => state.productos.error);

  const dispatch = useDispatch();

  const history = useHistory(); //habilitar history para redireccion

  const listaProductos = useSelector((state) => state.productos.productos);
  console.log({ listaProductos });

  useEffect(() => {
    //Consulta la API
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, []);

  //Confirmar si desea eliminarlo
  const confirmarEliminarProducto = (id) => {
    //preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un producto que se elimina no se puede recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        dispatch(borrarProductoAction(id));
      }
    });
  };

  //funcion que redirije de forma programada
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push("/productos/editar/" + producto.id);
  };
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
                  <button
                    className="btn btn-danger nuevo-post d-block d-md-inline-block"
                    type="button"
                    onClick={() => redireccionarEdicion(producto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-success ml-2 text-uppercase"
                    onClick={() => confirmarEliminarProducto(producto.id)}
                  >
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
