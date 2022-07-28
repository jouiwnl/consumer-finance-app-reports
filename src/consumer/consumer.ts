import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { AppDataSource } from '../data-source';

import { Report } from '../entity/Report';

import * as AWS from 'aws-sdk';
import * as moment from 'moment';
import { createPdf } from './createDocumentDefinitions';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

dotenv.config();

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

export default async function() {
  const connection = await amqp.connect(process.env.RABBIT_MQ_ADDRESS, "heartbeat=60");
  const channel = await connection.createChannel();
  const queue = "finance-app-report";

  const reportRepository = AppDataSource.getRepository(Report);

  await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });
  await channel.consume(queue, async (mensagem) => {
    const report: LoanProps[] = JSON.parse(mensagem.content.toString());

    pdfMake.createPdf(createPdf(report)).getBuffer(document => {
      fs.writeFile('report.pdf', document, async (err) => {
        if (err) throw err

        const url = await uploadFile(`report-${moment().format('YYYY-MM-DD')}.pdf`, './report.pdf');
        
        const report = new Report();
        report.s3Key = url;

        await reportRepository.save(report).then(() => {
          console.log('report saved with success');
        }).then(() => {
          //fs.unlinkSync('report.pdf');
        });
      });
    });
  
    channel.ack(mensagem);
  })
}

async function uploadFile(fileName, filePath) {

  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: process.env.AWS_REGION
  })

  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: fileContent,
    //ContentType: mimeType//geralmente se acha sozinho
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}