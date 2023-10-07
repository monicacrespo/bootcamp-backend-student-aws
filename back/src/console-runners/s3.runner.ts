import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const run = async () => {
  try {
    const client = new S3Client({ region: 'eu-west-2' });
    const bucket = 'rental-bootcamp-backend-student';
    const fileName = '01-listado-casas.png';
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: fileName,
    });
    const url = await getSignedUrl(client, command);
    console.log({ url });
  } catch (error) {
    console.error(error);
  }
};
