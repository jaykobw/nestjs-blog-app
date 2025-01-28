import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(
    /**
     * Inject configService
     */
    private readonly configService: ConfigService,
  ) {}

  private generateFileName(file: Express.Multer.File) {
    let name = file.originalname.split('.')[0];
    name.replace(/\s/g, '').trim();
    let extension = path.extname(file.originalname);
    let timestamp = new Date().getTime().toString().trim();
    return `${name}-${timestamp}-${uuid4()}${extension}`;
  }

  public async fileUpload(file: Express.Multer.File) {
    try {
      const s3 = new S3();

      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get<string>('appConfig.awsBucketName'),
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
