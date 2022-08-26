export class EjecutivoVentasModel {
  id: number;
  idRegion: number;
  region: string;
  nombre: string;
  ventas: Ventas[];

  constructor() {
    this.id = 0;
    this.idRegion = 0;
    this.region = '';
    this.nombre = '';
    this.ventas = [];
  }
}

export class Ventas {
  idMes: number;
  mes: string
  vservicio: number;
  vequipo: number;
  comisionBase: number;
  bonoMVservicios: number;
  bonoMVequipos: number;
  bonoTotal: number;
  constructor() {
    this.idMes = 0;
    this.mes = '';
    this.vservicio = 0;
    this.vequipo = 0;
    this.comisionBase = 0;
    this.bonoMVservicios = 0;
    this.bonoMVequipos = 0;
    this.bonoTotal = 0;
  }
}