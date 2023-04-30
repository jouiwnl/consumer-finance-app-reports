import { S3 } from "../lib/AWSConfig";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;

export class S3Service {
    static async uploadFile(fileName: string, fileBuffer: Buffer) {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
            Body: fileBuffer,
            //ContentType: mimeType//geralmente se acha sozinho
        };

        const data = await S3.upload(params).promise();

        return data;
    }

    static getPresignedFromArchive(archive: SendData) {
        return S3.getSignedUrl('getObject', {
            Bucket: archive.Bucket,
            Key: archive.Key,
            Expires: 2592000
        })
    }
}

