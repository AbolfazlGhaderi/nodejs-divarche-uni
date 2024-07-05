import { logger } from '../../core/logging/logger';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CheckEnvVariables } from '../../core/utils/functions.utils';

// Types and Interfaces
type TUploadeFile = { status: boolean; message: string; fileAddress: string | undefined };

//
export class S3Service {
  private s3: S3Client;
  private S3Location: string = CheckEnvVariables(process.env.S3_LOCATION_ENDPOINT, 'S3 Location Endpoint');

  constructor(endpoint: string, accessKeyId: string, secretAccessKey: string) {
    this.s3 = new S3Client({
      region: 'default',
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  async UploadFile(file: Express.Multer.File, bucket: string): Promise<TUploadeFile> {
    const Params = {
      Body: file.buffer,
      Bucket: bucket,
      Key: file.originalname,
    };

    try {
      await this.s3.send(new PutObjectCommand(Params));
      return { status: true, message: 'file uploaded successfully', fileAddress: `${this.S3Location}/${file.originalname}` };
    } catch (error) {
      logger.error('Error uploading file In S3 ', error);
      return { status: false, message: 'Error uploading file . Please try again', fileAddress: undefined };
    }
  }
}
