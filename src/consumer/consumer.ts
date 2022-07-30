import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { AppDataSource } from '../data-source';

import { Report } from '../entity/Report';

import * as AWS from 'aws-sdk';
import * as moment from 'moment';
import { createPdfParcelas } from './createDDPArcelas';
import { createPdfContracts } from './createDDContracts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

dotenv.config();

interface ReportProps {
  observation: string;
  filtros: any;
  itens: any[],
  totalPayments: number;
  totalInterests: number;
  totalPrincipalPayments: number;
  type: string;
}

export default async function() {
  try { 
    const connection = await amqp.connect(process.env.RABBIT_MQ_ADDRESS, "heartbeat=60");
    const channel = await connection.createChannel();
    const queue = "finance-app-report";

    const reportRepository = AppDataSource.getRepository(Report);

    await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    await channel.consume(queue, async (mensagem) => {
      const report: ReportProps = await JSON.parse(mensagem.content.toString());
      const definitions: TDocumentDefinitions = report.type === 'P'
        ? createPdfParcelas(report)
        : createPdfContracts(report);

      pdfMake.createPdf(definitions).getBuffer(async document => {
        const s3 = createAwsInstance();
        const archive = await uploadFile(`report${moment().format('YYYY-MM-DD hh:mm:ss')}.pdf`, document);

        const presigned = s3.getSignedUrl('getObject', {
          Bucket: archive.Bucket,
          Key: archive.Key,
          Expires: 2592000
        })

        let saved = new Report();
        saved.path = archive.Location;
        saved.observation = report.observation;
        saved.type = report.type;
        saved.presigned_url = presigned;
        saved.created_at = moment().toDate();

        await reportRepository.save(saved).then(() => {
          console.log('report saved with success');
        }).catch(err => {
          console.log(err)
        });
      });
    
      channel.ack(mensagem);
    })
  } catch(error) {
    console.log("Houve um erro: " + error);
  }
}

function createAwsInstance() {
  return new AWS.S3({
    apiVersion: '2006-03-01',
    region: process.env.AWS_REGION
  });
}

async function uploadFile(fileName: string, fileBuffer: Buffer) {
  const s3 = createAwsInstance();

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: fileBuffer,
    //ContentType: mimeType//geralmente se acha sozinho
  };

  const data = await s3.upload(params).promise();

  return data;
}