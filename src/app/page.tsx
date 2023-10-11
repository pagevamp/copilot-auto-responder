import { Client, Company, CopilotAPI } from "@/utils/copilotApiUtils";
import Image from "next/image";
import SelectField from "./components/Select";
import Textarea from "./components/Textarea";

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
  const enableOptions = [
    { value: "outsideWorkingHours", label: "Outside working hours" },
    { value: "alwaysOn", label: "Always on" },
    { value: "off", label: "Off" },
  ];

  const onOptionChange = async (value: string) => {
    "use server";
    console.log(value);
  };

  const onResponseChange = async (value: string) => {
    "use server";
    console.log(value);
  };
  return (
    <main className="p-8">
      <fieldset>
        <h3 className="text-2xl">Auto responder</h3>
        <p className="text-gray-500">When your clients message you</p>
        <br />
        <section className="p-4 border border-gray-300 rounded">
          <div className="mb-2">Enable auto response</div>
          <SelectField options={enableOptions} onValueChange={onOptionChange} />
        </section>
      </fieldset>
      <br />
      <br />
      <fieldset>
        <h3 className="text-2xl">Set your automated response</h3>
        <p className="text-gray-500">
          The app will send your automated response outside of these hours
        </p>
        <br />
        <section className="p-4 border border-gray-300 rounded">
          <div className="mb-2">Response</div>
          <Textarea
            name="response"
            id="response"
            placeholder="Your automated response"
            className="block w-full p-2 rounded"
            onValueChange={onResponseChange}
          />
        </section>
      </fieldset>
    </main>
  );
}
