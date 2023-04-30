import * as dotenv from 'dotenv';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

import { Report } from '../entity/Report';

import * as moment from 'moment';
import { createPdfParcelas } from './createDDPArcelas';
import { createPdfContracts } from './createDDContracts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import logger from '../logger/index';
import { SQSService } from "../service/SQSService";
import { S3Service } from "../service/S3Service";
import { Message } from "aws-sdk/clients/sqs";
import { prisma } from "../lib/prisma";

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

export default function() {
  return SQSService.receiveMessage(async (message: Message) => {
    const report: ReportProps = await JSON.parse(message.Body.toString());
    const definitions: TDocumentDefinitions = report.type === 'P'
      ? createPdfParcelas(report)
      : createPdfContracts(report);

    pdfMake.createPdf(definitions).getBuffer(async document => {
      const archive = await S3Service.uploadFile(
        `report${moment().format('YYYY-MM-DD hh:mm:ss')}.pdf`,
        document
      );

      const presigned = S3Service.getPresignedFromArchive(archive);

      try {
        let toSave = await prisma.report.create({
          data: {
            path: archive.Location,
            observation: report.observation,
            type: report.type,
            presigned_url: presigned,
            created_at: moment().toDate()
          }
        });

        logger.info(`Report ${toSave.id} saved with success`);
      } catch (err) {
        logger.error("Has an error to save report...", err)
      }
    });
  })
}