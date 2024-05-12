import { APPLICATION_KEY, APPLICATION_KEY_ID, BUCKET_ENDPOINT, BUCKET_NAME, BUCKET_REGION } from "$env/static/private";
import
{
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({
    endpoint: BUCKET_ENDPOINT,
    credentials: {
        accessKeyId: APPLICATION_KEY_ID || "",
        secretAccessKey: APPLICATION_KEY || "",
    },
    region: BUCKET_REGION,
});

interface IUploadOptions
{
    Key: string;
    Body: any;
    ContentType: string;
}

export async function upload({ Key, Body, ContentType, }: IUploadOptions) 
{
    try
    {
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: Key,
            Body: Body,
            ContentType: ContentType,
        });
        const response = await client.send(command);
        return response;
    } catch (e)
    {
        console.error(e);
        return null;
    }
};

export async function list(MaxKeys?: number) 
{
    try
    {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            MaxKeys: MaxKeys ? MaxKeys : 20,
        });
        const response = await client.send(command);
        return response;
    } catch (e)
    {
        console.error(e);
        return null;
    }
};

export async function get(Key: string) 
{
    try
    {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: Key,
        });
        const response = await client.send(command);
        return response;
    } catch (e)
    {
        console.error(e);
        return null;
    }
};

export async function remove(Key: string) 
{
    try
    {
        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: Key,
        });
        const response = await client.send(command);
        return response;
    } catch (e)
    {
        console.error(e);
        return null;
    }
};