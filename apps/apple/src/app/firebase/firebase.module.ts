import { DynamicModule, Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin/lib/credential';
import { FB_AUTH_PROVIDER_KEY, FB_BUCKET_PROVIDER_KEY } from '../_constants';
import { Bucket } from '@google-cloud/storage';
import { environment } from '../../environments/environment';

@Global()
@Module({})
export class FireBaseModule {
  static forRoot(): DynamicModule {
    admin.initializeApp({
      credential: admin.credential.cert(
        environment.fbServiceAccount as ServiceAccount
      ),
      storageBucket: environment.fbBucketUrl,
    });

    const bucket: Bucket = admin.storage().bucket();
    const auth: admin.auth.Auth = admin.auth();

    return {
      module: FireBaseModule,
      providers: [
        {
          provide: FB_BUCKET_PROVIDER_KEY,
          useValue: bucket,
        },
        {
          provide: FB_AUTH_PROVIDER_KEY,
          useValue: auth,
        },
      ],
      exports: [FB_BUCKET_PROVIDER_KEY, FB_AUTH_PROVIDER_KEY],
    };
  }
}
