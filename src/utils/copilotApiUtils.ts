import {
  Message,
  SendMessageErrorResponse,
  SendMessageRequest,
} from '@/types/message';

const BaseApiURL = 'https://api-beta.copilot.com/v1';

export type MeResponse = {
  id: string;
  givenName: string;
  familyName: string;
  email: string;
  portalName: string;
};

type ClientCustomField = string | string[];

export type Client = {
  id: string;
  givenName: string;
  familyName: string;
  email: string;
  companyId: string;
  customFields: Record<string, ClientCustomField>;
};

export type Company = {
  id: string;
  name: string;
  iconImageUrl: string;
};

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class CopilotAPI {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendApiData<T>(
    path: string,
    method: Method = Method.GET,
    payload?: unknown,
  ): Promise<T> {
    const response = await fetch(`${BaseApiURL}/${path}`, {
      headers: {
        'x-api-key': this.apiKey,
      },
      method: method,
      body: payload ? JSON.stringify(payload) : undefined,
    });

    const data = await response.json();
    return data;
  }

  async me() {
    return this.sendApiData<MeResponse>('me');
  }

  async getClient(clientId: string) {
    return this.sendApiData<Client>(`clients/${clientId}`);
  }

  async getCompany(companyId: string) {
    return this.sendApiData<Company>(`companies/${companyId}`);
  }

  async sendMessage(
    payload: SendMessageRequest,
  ): Promise<Message | SendMessageErrorResponse> {
    return this.sendApiData<Message | SendMessageErrorResponse>(
      `messages`,
      Method.POST,
      payload,
    );
  }
}
