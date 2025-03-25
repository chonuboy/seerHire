import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import ClientTable from "@/components/Elements/tables/clientTable";
import { ClientTableColumn } from "@/lib/models/client";
import { useEffect, useState } from "react";
import { fetchAllClients, fetchClient } from "@/api/master/clients";
import { createClient } from "@/api/master/clients";
import { Popup } from "@/components/Elements/cards/popup";
import { toast } from "react-toastify";

export default function Clients() {
  const [allClients, setClients] = useState();
  const [isClientAdded, setIsClientAdded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Form Fields
  const [clientName, setClientName] = useState("");
  const [clientHo, setClientHo] = useState("");
  const [financePocName, setFinancePocName] = useState("");
  const [financeNumber, setFinanceNumber] = useState("");
  const [financeEmail, setFinanceEmail] = useState("");
  const [gstnumber, setGstNumber] = useState("");
  const [cinnumber, setCinNumber] = useState("");
  const [pannumber, setPanNumber] = useState("");

  useEffect(() => {
    fetchAllClients(currentPage - 1, 10).then((data: any) => {
      setClients(data);
      console.log(data);
    });
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createClient({
        clientName: clientName,
        clientHo: clientHo,
        isClientBillingStateTamilNadu: true,
        financePocName: financePocName,
        financeNumber: financeNumber,
        financeEmail: financeEmail,
        gstnumber: gstnumber,
        cinnumber: cinnumber,
        pannumber: pannumber,
      })
        .then((data) => {
          toast.error(data, {
            position: "top-right",
          });
          if (data.status === "success") {
            toast.success(data.message, {
              position: "top-right",
            });
            setTimeout(async () => {
              const updatedClients = await fetchAllClients();
              setClients(updatedClients);
            }, 1000);
          } else {
            toast.error(data.message, {
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          toast.error(err, {
            position: "top-right",
          });
        });
      setIsClientAdded(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <ContentHeader title="Clients" />
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white"
          onClick={() => setIsClientAdded(true)}
        >
          Add New Client
        </button>
        {isClientAdded && (
          <Popup onClose={() => setIsClientAdded(false)}>
            <div className="bg-white mx-auto max-w-3xl p-4 mt-16 rounded-md">
              <form className="space-y-8" onSubmit={handleAddClient}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="clientHo" className="font-medium">
                      Client Name
                    </label>
                    <input
                      id="clientHo"
                      type="text"
                      value={clientName}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="clientHo" className="font-medium">
                      Client HO
                    </label>
                    <input
                      id="clientHo"
                      type="text"
                      value={clientHo}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setClientHo(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="financePoc" className="font-medium">
                      Finance POC
                    </label>
                    <input
                      id="financePoc"
                      type="text"
                      value={financePocName}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setFinancePocName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="financeNumber" className="font-medium">
                      Finance Number
                    </label>
                    <input
                      id="financeNumber"
                      type="text"
                      value={financeNumber}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setFinanceNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="financeEmail" className="font-medium">
                      Finance Email
                    </label>
                    <input
                      id="financeEmail"
                      type="email"
                      value={financeEmail}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setFinanceEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="gst" className="font-medium">
                      GST
                    </label>
                    <input
                      id="gst"
                      type="text"
                      value={gstnumber}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setGstNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cin" className="font-medium">
                      CIN
                    </label>
                    <input
                      id="cin"
                      type="text"
                      value={cinnumber}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setCinNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pan" className="font-medium">
                      PAN
                    </label>
                    <input
                      id="pan"
                      type="text"
                      value={pannumber}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setPanNumber(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add Client
                </button>
                <button
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => setIsClientAdded(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </Popup>
        )}
      </div>

      {allClients ? (
        <ClientTable
          clientTableData={allClients}
          clientTableColumns={ClientTableColumn}
          onPageChange={handlePageChange}
        />
      ) : (
        <p className="p-2">Loading Clients...</p>
      )}
    </MainLayout>
  );
}
