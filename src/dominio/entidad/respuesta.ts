export class Respuesta {
  mensaje: string;
  data?: any | any[];
  constructor(mensaje: string, data: any) {
    this.mensaje = mensaje;
    this.data = data;
  }
}
