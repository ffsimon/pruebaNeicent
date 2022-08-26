import { EjecutivoVentasModel } from "src/app/models/gerenteVentas.model";

export class Lista {
  constructor() { }

  public listaEjecutivos: EjecutivoVentasModel[] = [
    {
      id: 1,
      idRegion: 1,
      region: 'Región Norte',
      nombre: 'Antonio Sepulveda',
      ventas: [
        {
          idMes: 1,
          mes: 'Enero',
          vservicio: 8000,
          vequipo: 20000,
          comisionBase: 0,
          bonoMVservicios: 0,
          nBonoS: 'N/A',
          bonoMVequipos: 0,
          nBonoE: 'N/A',
          bonoTotal: 0
        },
        {
          idMes: 2,
          mes: 'Febrero',
          vservicio: 12000,
          vequipo: 10000,
          comisionBase: 0,
          bonoMVservicios: 0,
          nBonoS: 'N/A',
          bonoMVequipos: 0,
          nBonoE: 'N/A',
          bonoTotal: 0
        },
        {
          idMes: 3,
          mes: 'Marzo',
          vservicio: 10000,
          vequipo: 5000,
          comisionBase: 0,
          bonoMVservicios: 0,
          nBonoS: 'N/A',
          bonoMVequipos: 0,
          nBonoE: 'N/A',
          bonoTotal: 0
        },
        {
          idMes: 4,
          mes: 'Abril',
          vservicio: 11500,
          vequipo: 30000,
          comisionBase: 0,
          bonoMVservicios: 0,
          nBonoS: 'N/A',
          bonoMVequipos: 0,
          nBonoE: 'N/A',
          bonoTotal: 0
        }
      ]
    },
    {
      id: 2,
      idRegion: 1,
      region: 'Región Norte',
      nombre: 'Ana Salas',
      ventas: [
        {
          idMes: 1,
          mes: 'Enero',
          vservicio: 10000,
          vequipo: 9000,
          comisionBase: 0,
          bonoMVservicios: 0,
          nBonoS: 'N/A',
          bonoMVequipos: 0,
          nBonoE: 'N/A',
          bonoTotal: 0
        },
        {
          idMes: 2,
          mes: 'Febrero',
          vservicio: 5000,
          vequipo: 20000,
          comisionBase: 0,
          bonoMVservicios: 0,
          nBonoS: 'N/A',
          bonoMVequipos: 0,
          nBonoE: 'N/A',
          bonoTotal: 0
        },
        {
          idMes: 3,
          mes: 'Marzo',
          vservicio: 8000,
          vequipo: 5000,
          comisionBase: 0,
          bonoMVservicios: 0,
          nBonoS: 'N/A',
          bonoMVequipos: 0,
          nBonoE: 'N/A',
          bonoTotal: 0
        },
        {
          idMes: 4,
          mes: 'Abril',
          vservicio: 5000,
          vequipo: 40000,
          comisionBase: 0,
          bonoMVservicios: 0,
          nBonoS: 'N/A',
          bonoMVequipos: 0,
          nBonoE: 'N/A',
          bonoTotal: 0
        }
      ]
    }
  ];

  public rangosServicios = [
    {
      nivel: 1,
      inicio: 101,
      fin: 109,
      monto: 200
    },
    {
      nivel: 2,
      inicio: 110,
      fin: 119,
      monto: 250
    },
    {
      nivel: 3,
      inicio: 120,
      fin: null,
      monto: 250
    }
  ];

  public rangosEquipos = [
    {
      nivel: 1,
      inicio: 0,
      fin: 250000,
      comision: 0.25
    },
    {
      nivel: 2,
      inicio: 250000,
      fin: 300000,
      comision: 0.50
    },
    {
      nivel: 3,
      inicio: 300000,
      fin: 350000,
      comision: 1.5
    },
    {
      nivel: 4,
      inicio: 350000,
      fin: 450000,
      comision: 2.0
    },
    {
      nivel: 5,
      inicio: 450000,
      fin: 750000,
      comision: 2.5
    },
    {
      nivel: 6,
      inicio: 750000,
      fin: 1000000,
      comision: 4.0
    }
  ];
}