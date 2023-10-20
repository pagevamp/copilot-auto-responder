import { NextRequest, NextResponse } from 'next/server';
import { MessageSchema } from '@/types/message';
import { MessageService } from '@/app/api/messages/services/message.service';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = MessageSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error.issues, { status: 422 });
  }

  const messageService = new MessageService();
  await messageService.handleSendMessageWebhook(result.data);

  return NextResponse.json({});
}
