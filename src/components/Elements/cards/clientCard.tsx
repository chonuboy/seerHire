import { Card, CardHeader, CardContent } from "./Card";
import { ClientInfo } from "@/lib/models/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Popup } from "./popup";
import { fetchClient } from "@/api/master/clients";
import ClientInfoUpdateForm from "@/components/Forms/updateClientInfo";

export default function ClientCard({ id }: { id: number }) {
  const router = useRouter();
  const [currentClient, setCurrentClient] = useState<ClientInfo | null>(null);
  const [isclientUpdated, setIsClientUpdated] = useState(false);

  useEffect(() => {
    fetchClient(id).then((res) => setCurrentClient(res));
    // return () => {
    //   setCurrentClient(null);
    // }
  },[]);

  return (
    <Card className="p-4">
      <CardHeader>
        <h1>{currentClient?.clientName}</h1>
      </CardHeader>
      <CardContent className="bg-white p-4 mt-4 text-xs md:text-base">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-500">Client HO</p>
            <p className="text-blue-500 font-semibold">{currentClient?.clientHo ? currentClient?.clientHo : "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Finance POC</p>
            <p className="text-blue-500 font-semibold">{currentClient?.financePocName ? currentClient?.financePocName : "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Finance Number</p>
            <p className="text-blue-500 font-semibold">{currentClient?.financeNumber ? currentClient?.financeNumber : "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Finance Email</p>
            <p className="text-blue-500 font-semibold">{currentClient?.financeEmail ? currentClient?.financeEmail : "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">GST</p>
            <p className="text-blue-500 font-semibold">{currentClient?.gstnumber ? currentClient?.gstnumber : "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">CIN</p>
            <p className="text-blue-500 font-semibold">{currentClient?.cinnumber ? currentClient?.cinnumber : "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">PAN</p>
            <p className="text-blue-500 font-semibold">{currentClient?.pannumber ? currentClient?.pannumber : "-"}</p>
          </div>
        </div>
        {isclientUpdated && (
          <Popup onClose={() => setIsClientUpdated(false)}>
            <ClientInfoUpdateForm currentClient={currentClient} id={id} autoClose={()=>{setIsClientUpdated(false)}}/>
          </Popup>
        )}
        <div className="flex justify-end">
          <button
            className="bg-[var(--theme-background)] text-white py-2 px-4 rounded-lg"
            onClick={() => setIsClientUpdated(true)}
          >
            Update
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
