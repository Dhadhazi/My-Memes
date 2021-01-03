import * as AWS from "aws-sdk";

export class BucketAccess {
  constructor(
    private readonly s3: AWS.S3 = new AWS.S3({ signatureVersion: "v4" }),
    private readonly bucketName = process.env.IMAGES_S3_BUCKET,
    private readonly urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
  ) {}

  async getUploadUrl(memeId: string): Promise<string> {
    const result = await this.s3.getSignedUrl("putObject", {
      Bucket: this.bucketName,
      Key: memeId,
      Expires: this.urlExpiration,
    });

    console.log("Signed url for bucket created: ", { result: result });

    return result;
  }
}
