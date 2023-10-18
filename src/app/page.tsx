import AutoResponder from "./components/AutoResponder";
import { Client, Company, CopilotAPI } from "@/utils/copilotApiUtils";

type SearchParams = { [key: string]: string | string[] | undefined };

async function getContent(searchParams: SearchParams) {
  if (!process.env.COPILOT_API_KEY) {
    throw new Error("Missing COPILOT_API_KEY");
  }

  const copilotAPI = new CopilotAPI(process.env.COPILOT_API_KEY);
  const result: { client?: Client; company?: Company } = {};

  if (searchParams.clientId && typeof searchParams.clientId === "string") {
    result.client = await copilotAPI.getClient(searchParams.clientId);
  }

  if (searchParams.companyId && typeof searchParams.companyId === "string") {
    result.company = await copilotAPI.getCompany(searchParams.companyId);
  }

  return result;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await getContent(searchParams);

  const onOptionChange = async (value: string) => {
    "use server";
    console.log(value);
  };

  const onResponseChange = async (value: string) => {
    "use server";
    console.log(value);
  };
  return (
    <main className="h-full">
      <AutoResponder />
    </main>
  );
}
