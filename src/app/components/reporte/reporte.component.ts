import { Component, OnInit } from '@angular/core';
import { BubbleDataPoint, ChartConfiguration, ChartData, ChartType, ScatterDataPoint } from 'chart.js';
import { ChartModel } from 'src/app/models/chart.model';
import { cRN, cRS } from 'src/app/models/contantes';
import { EjecutivoVentasModel, Ventas } from 'src/app/models/gerenteVentas.model';
import { Lista } from './listaEjecutivos';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  public lista: Lista = new Lista();
  public listaEjecutivosVentas: Array<EjecutivoVentasModel> = this.lista.listaEjecutivos;
  public listaRangosEquipos: any[] = this.lista.rangosEquipos;
  public listaRangosServios: any[] = this.lista.rangosServicios;
  public ejecutivoSeleccionado: EjecutivoVentasModel = new EjecutivoVentasModel();
  public persona = 0;
  public pie: any = null;



  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  public pieChartData: ChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abil'],
    datasets: [ {
        data: []
      }
    ]
  };
  public pieChartType: ChartType = 'pie';

  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abil'];
  public barChartLegend = true;
  public barChartData: Array<ChartModel> = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.listaEjecutivosVentas);
  }

  public async personaSeleccionada(persona: number) {
    this.pie = null;
    this.persona = 0;
    this.barChartData = [];
    this.pieChartData.datasets[0].data = [];
    const datosTotales: (number | ScatterDataPoint | BubbleDataPoint | null)[] = [];
    console.log('Esperamos');
    await setTimeout(async () => {
      persona = Number(persona);
      if (persona === 0) { return; }
      this.ejecutivoSeleccionado = await this.listaEjecutivosVentas.filter(x => x.id === Number(persona))[0];
      const comision = this.ejecutivoSeleccionado.idRegion === 1 ? cRN : cRS;
      this.ejecutivoSeleccionado.ventas.forEach(async (x, index) => {
        const inicioIndex = index - 3;
        x.comisionBase = ((x.vservicio + x.vequipo) * comision);
        const tresAntes = this.ejecutivoSeleccionado.ventas.slice(inicioIndex, index);
        if (tresAntes.length === 3) {
          const valorInicial = 0;
          const cantidadesServicios = tresAntes.map(y => y.vservicio);
          const suma = cantidadesServicios.reduce((valorAnterior, valorActual) => valorAnterior + valorActual, valorInicial);
          const promedioServicios = suma / 3
          if (x.vservicio > promedioServicios) {
            const porcentaje = ((x.vservicio * 100) / promedioServicios);
            let comXservicios = 0;
            if (porcentaje >= 120) {
              comXservicios = this.listaRangosServios.filter(y => porcentaje >= y.inicio)[0].monto;
              x.nBonoS = 'Nivel: 3'
            } else {
              comXservicios = this.listaRangosServios.filter(y => porcentaje >= y.inicio && porcentaje <= y.fin)[0].monto;
              x.nBonoS = `Nivel: ${this.listaRangosServios.filter(y => porcentaje >= y.inicio && porcentaje <= y.fin)[0].nivel}`;
            }
            x.bonoMVservicios = comXservicios;
          } else {
            x.bonoMVservicios = 0;
          }
        }
        const comXequipos = (this.listaRangosEquipos.filter(y => x.vequipo >= y.inicio && x.vequipo <= y.fin)[0].comision / 100);
        x.nBonoE = `Nivel: ${this.listaRangosEquipos.filter(y => x.vequipo >= y.inicio && x.vequipo <= y.fin)[0].nivel}`;
        x.bonoMVequipos = comXequipos * x.vequipo
        x.bonoTotal = (x.comisionBase + x.bonoMVservicios + x.bonoMVequipos);
  
        datosTotales.push(x.bonoTotal)
        
      });
      this.barChartData = await this.obtenerDatosGraficaAsync(this.ejecutivoSeleccionado.ventas);
      this.pieChartData.datasets[0].data = await datosTotales;
      this.pie = this.pieChartData;
      this.persona = persona
    }, 100);
    console.log('Fin');
  }

  public async obtenerDatosGraficaAsync(arrData: Array<Ventas>) {

    const chartValor: ChartModel[] = [
      { data: [], label: 'Servicios' },
      { data: [], label: 'Equipos' }
    ];

    if (arrData.length > 0) {
      arrData.forEach(async element => {
        chartValor[0].data.push(element.vservicio);
        chartValor[1].data.push(element.vequipo);
      });
    }
    return chartValor;
  }
}
