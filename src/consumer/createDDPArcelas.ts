// @ts-nocheck
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

export function createPdfParcelas(report: ReportProps): TDocumentDefinitions {

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
          widths: ['*','*',25,25,55,50,50,45,'*','*',60,55],
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
                text: '#',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'DAYS',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'DUE DATE',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'INTEREST',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'PRINCIPAL',
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
                text: 'PRINCIPAL PAYMENT',
                border: [false, true, false, true],
                alignment: 'center',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'PRINCIPAL BALANCE',
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
                  text: 'Total Interest',
                  color: '#aaaaab',
                  bold: true,
                  width: '*',
                  fontSize: 12,
                  alignment: 'right',
                },
                {
                  text: formatter.format(report.totalInterests),
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
            {
              columns: [
                {
                  text: 'Total Principal',
                  color: '#aaaaab',
                  bold: true,
                  width: '*',
                  fontSize: 12,
                  alignment: 'right',
                },
                {
                  text: formatter.format(report.totalPrincipalPayments),
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

function createRow(loan): any[] {
  const rowDefinition: any = [ 
    {
      text: loan.contrato.banco.nome,
      fillColor: '#ffffff',
      alignment: 'center',
      border: [false, true, false, true],
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: loan.contrato.stockId,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: `${loan.nroParcela}/${loan.contrato.qtdeParcelas}`,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: loan.diasPrimeiraParcela ?? loan.diasProximaParcela,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: loan.dataPagamento,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: formatter.format(loan.vlParcelaJuros),
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: formatter.format(loan.balanceAfterPayment + loan.vlParcela),
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: formatter.format(loan.vlParcela),
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: formatter.format(loan.vlParcela - loan.vlParcelaJuros),
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: formatter.format(loan.balanceAfterPayment),
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: loan.contrato.paidWithPayOff ? 'Pay-off' : loan.situacao,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    },
    {
      text: loan.dataPagamentoPaga,
      border: [false, true, false, true],
      alignment: 'center',
      fillColor: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 8,
    }
  ]

  return rowDefinition;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});