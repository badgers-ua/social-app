import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp().getRequest();
    return ctx;
  }
}
