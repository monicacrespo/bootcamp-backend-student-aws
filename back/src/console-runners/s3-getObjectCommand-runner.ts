import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
  import fs from 'fs';
  import { Readable } from 'stream';

export const run = async () => {
  try {
    const client = new S3Client({ region: 'eu-west-2' });
    const bucket = 'bucket-name';

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: 'french-apartment.jpg',
    });
    const data = await client.send(command);
    console.log({ data });

   const image = data.Body as Readable;
   const destination = fs.createWriteStream('./test.png');
   image.pipe(destination);
  } catch (error) {
    console.error(error);
  }
};