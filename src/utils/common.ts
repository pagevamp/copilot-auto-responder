import { NextResponse } from 'next/server';
import { CopilotAPI, MeResponse } from '@/utils/copilotApiUtils';

export function errorHandler(message: string, status: number = 200) {
  return NextResponse.json({ message }, {
    status
  })
}

export async function getCurrentUser(): Promise<MeResponse> {
  if (!process.env.COPILOT_API_KEY) {
    throw new Error('Copilot API key is not set.');
  }

  const copilotClient = new CopilotAPI(process.env.COPILOT_API_KEY);
  return await copilotClient.me();
}
