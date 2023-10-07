import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';

export const run = async () => {
 try {
   const client = new S3Client({ region: 'eu-west-2' });
   const bucket = 'bucket-name';
   const command = new ListObjectsCommand({
     Bucket: bucket,
   });
   const data = await client.send(command);
   console.log({ data });
 } catch (error) {
   console.error(error);
 }
};