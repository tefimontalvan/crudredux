import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO,
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      //insertar en la API
      await clienteAxios.post("/productos", producto);

      //si todo sale bien actualizar el state
      dispatch(agregarProductoExito(producto));

      //Alerta
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log({ error });
      //si hay un error cambiar el state
      dispatch(agregarProductoError(true));

      //alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo.",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  //como vamos a modificar el state se carga un payload
  payload: producto,
});

//si hubo un error

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const listaProductos = await clienteAxios.get("/productos");
      dispatch(descargarProductoExito(listaProductos.data));
    } catch (error) {
      console.log({ error });
      dispatch(descargarProductoError(true));
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargarProductoExito = (producto) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: producto,
});

const descargarProductoError = (estado) => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: estado,
});

//Selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());

      //Si se elimina mostrar alerta
      Swal.fire("Eliminado!", "Su producto ha sido eliminado.", "success");
    } catch (error) {
      console.log({ error });
      dispatch(eliminarProductoError(true));
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = (estado) => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: estado,
});

//Colocar producto en edicion

export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//Edita un producto en la API y en el state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());

    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log({ error });
      dispatch(editarProductoError(true));
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoError = (estado) => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: estado,
});
