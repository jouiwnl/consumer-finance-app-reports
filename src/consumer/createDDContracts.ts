import moment = require('moment');
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { base64Logo } from './assets/logo64';

interface ReportProps {
  observation: string;
  filtros: any;
  itens: any[],
  totalPayments: number;
  totalInterests: number;
  totalPrincipalPayments: number;
}

export function createPdfContracts(report: ReportProps): TDocumentDefinitions {

  const rows = createTableRows(report);

  const dd: TDocumentDefinitions = {
    content: [
      {
        columns: [
          {
            image:
              `data:image/jpeg;base64, ${base64Logo}`,
            width: 150,
          },
          [
            {
              text: 'GOL LOAN REPORT',
              color: '#333333',
              width: '*',
              fontSize: 28,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 15],
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'Partner',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: report.filtros.partnerName,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Start date',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: report.filtros.initDate,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Final date',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    {
                      text: report.filtros.finalDate,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Situation',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    {
                      text: report.filtros.status,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                }
              ],
            },
          ],
        ],
      },
      '\n\n',
      {
        width: 100,
        alignment: 'center',
        text: 'LOANS ON REPORT',
        margin: [0, 10, 0, 10],
        fontSize: 15,
      },
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function(i, node) {
            return 1;
          },
          vLineWidth: function(i, node) {
            return 1;
          },
          hLineColor: function(i, node) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function(i, node) {
            return '#eaeaea';
          },
          hLineStyle: function(i, node) {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          fillColor: function(rowIndex, node, columnIndex) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['*','*','*','*','*','*','*'],
          body: [
            [
              {
                text: 'PARTNER',
                fillColor: '#eaf2f5',
                alignment: 'center',
                border: [false, true, false, true],
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'STOCK',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'DATE',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'PAYMENT',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'TOTAL PAYMENT',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'STATUS',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'PAID DATE',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
            ],

            ...rows
          ],
        },
      },
      '\n',

      {
        columns: [
          {
            text: `Observation: ${report.observation} \n Report made in: ${moment().format('YYYY-MM-DD hh:mm')}`,
            style: 'notesTitle',
          },
          [
            {
              columns: [
                {
                  text: 'Total loans',
                  color: '#aaaaab',
                  bold: true,
                  width: '*',
                  fontSize: 12,
                  alignment: 'right',
                },
                {
                  text: String(report.itens.length),
                  bold: true,
                  color: '#333333',
                  fontSize: 12,
                  alignment: 'right',
                  width: 100,
                },
              ],
            },
            {
              columns: [
                {
                  text: 'Total Payments',
                  color: '#aaaaab',
                  bold: true,
                  width: '*',
                  fontSize: 12,
                  alignment: 'right',
                },
                {
                  text: formatter.format(report.totalPayments),
                  bold: true,
                  color: '#333333',
                  fontSize: 12,
                  alignment: 'right',
                  width: 100,
                },
              ],
            },
          ]
        ],
      },
      '\n\n',
      '\n\n'
    ],
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3],
      },
      notesText: {
        fontSize: 10,
      },
      infoStyle: {
        fontSize: 10,
        bold: true
      }
    },
    defaultStyle: {
      columnGap: 20,
      //font: 'Quicksand',
    },
    pageMargins: [ 10, 10, 10, 10],
    pageOrientation: 'landscape'
  };

  return dd;
}

function createTableRows(report: ReportProps): any[] {
  const rows = report.itens.map(createRow);

  return rows;
}

function createRow(contract): any[] {
  const rowDefinition: any = [ 
    {
      text: contract.banco.nome,
      fillColor: '#ffffff',
      alignment: 'center',
      border: [false, true, false, true],
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: contract.stockId,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: contract.dataInicioContrato,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: formatter.format(contract.valorParcela),
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: formatter.format(contract.totalPagar),
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: contract.paidWithPayOff ? 'Pay-off' : contract.situacao,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: contract.dataPagamentoParcela,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
  ]

  return rowDefinition;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});