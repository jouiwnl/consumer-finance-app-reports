import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { base64Logo } from './assets/logo64';

interface LoanProps {
  id: number;
  contrato: any;
  nroParcela: number;
  balanceAfterPayment: number;
  dataPagamento: Date;
  dataPagamentoPaga: Date;
  diasPrimeiraParcela: number;
  diasProximaParcela: number;
  diasProximaParcelaOriginal: number;
  valorTotalJurosLoan: number;
  vlParcelaSemJuros: number;
  idContrato: number;
  situacao: string;
  vlParcela: number;
  vlParcelaJuros: number;
}

export function createPdf(loansList: LoanProps[]): TDocumentDefinitions {
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
              text: 'CHECK NUMBER',
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
                      text: loansList[0].contrato.banco.nome,
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
                      text: 'Data Inicial',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: 'June 01, 2016',
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
                      text: 'DATA FINAL',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    {
                      text: 'DATA FINAL',
                      bold: true,
                      fontSize: 14,
                      alignment: 'right',
                      color: 'green',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'DATA FINAL',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    {
                      text: 'DATA FINAL',
                      bold: true,
                      fontSize: 14,
                      alignment: 'right',
                      color: 'green',
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
        text: 'CHECK NUMBER',
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
          widths: [40,40,20,25,'*',50,50,50,'*','*',50,'*'],
          body: [
            [
              {
                text: 'PARTNER',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: 'STOCK',
                border: [false, true, false, true],
                alignment: 'right',
                fillColor: '#eaf2f5',
                textTransform: 'uppercase',
                fontSize: 9,
              },
              {
                text: '#',
                border: [false, true, false, true],
                alignment: 'right',
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
          ],
        },
      },
      '\n',
      '\n\n',
      '\n\n',
      {
        text: 'NOTES',
        style: 'notesTitle',
      },
      {
        text: 'Report made in \n date',
        style: 'notesText',
      },
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