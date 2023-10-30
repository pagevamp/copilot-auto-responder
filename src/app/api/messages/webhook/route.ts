import * as crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { MessageSchema } from '@/types/message';
import { MessageService } from '@/app/api/messages/services/message.service';
import appConfig from '@/config/app';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const body = JSON.parse(rawBody);
  const result = MessageSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error.issues, { status: 422 });
  }

  const signature = crypto.createHmac("sha256", appConfig.webhookSigningSecret).update(rawBody).digest("hex");

  if (signature !== request.headers.get('x-copilot-signature')) {
    return NextResponse.json({
      message: 'Invalid signature'
    }, { status: 400 })
  }

  const messageService = new MessageService();
  await messageService.handleSendMessageWebhook(result.data);

  return NextResponse.json({});
}
