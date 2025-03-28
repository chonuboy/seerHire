import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import ClientTable from "@/components/Elements/tables/clientTable";
import { ClientTableColumn } from "@/lib/models/client";
import { useEffect, useState } from "react";
import { fetchAllClients, fetchClient } from "@/api/master/clients";
import { createClient } from "@/api/master/clients";
import { Popup } from "@/components/Elements/cards/popup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { clientValidationSchema } from "@/lib/models/client";
import { searchClient } from "@/api/master/clients";

export default function Clients() {
  const [allClients, setClients] = useState();
  const [isClientAdded, setIsClientAdded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [clientFound, setClientFound] = useState(false);
  const [clientResponse, setClientResponse] = useState("");

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
    });
  }, [currentPage,searchKeyword]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    if (!searchKeyword) {
      toast.error("Please Enter a Keyword", {
        position: "top-center",
      });
    }
    searchClient(searchKeyword).then((data) => {
      if (data.status === "NOT_FOUND") {
        setClientFound(true);
        setClientResponse(data.message);
        return;
      } else {
        setClientFound(false);
        setTimeout(() => {
          setClients(data);
        }, 1000);
      }
    });
      
  };

  const formik = useFormik({
    initialValues: {
      clientName: "",
      clientHo: "",
      financePocName: "",
      financeNumber: "",
      financeEmail: "",
      gstnumber: "",
      cinnumber: "",
      pannumber: "",
      isClientBillingStateTamilNadu: true,
    },
    validationSchema: clientValidationSchema,
    validateOnMount: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      try {
        createClient(values).then((data) => {
          console.log(data);
          if (data.status === 200) {
            toast.success("Client added successfully", {
              position: "top-center",
            });
            setIsClientAdded(false);
          } else {
            toast.error(data.message, {
              position: "top-center",
            });
            setIsClientAdded(false);
          }
          fetchAllClients(currentPage - 1, 10).then((data: any) => {
            setClients(data);
            console.log(data);
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <MainLayout>
      <ContentHeader title="Clients" />
      <div className="flex justify-between gap-4 items-center mb-4 text-xs md:text-base">
        <button
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-base text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={() => setIsClientAdded(true)}
        >
          Add New Client
        </button>
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="text-sm p-1 md:p-2 border w-full  border-gray-300 rounded focus:outline-blue-600 focus:ring-blue-600"
            placeholder="Search Candidates"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {isClientAdded && (
          <Popup onClose={() => setIsClientAdded(false)}>
            <div className="bg-white mx-auto max-w-2xl p-4 mt-16 rounded-md">
              <form
                className="space-y-8 text-xs md:text-base"
                onSubmit={formik.handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Name */}
                  <div className="space-y-2">
                    <label htmlFor="clientName" className="font-medium">
                      Client Name
                    </label>
                    <input
                      id="clientName"
                      name="clientName"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.clientName}
                    />
                    {formik.touched.clientName && formik.errors.clientName ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.clientName}
                      </div>
                    ) : null}
                  </div>

                  {/* Client HO */}
                  <div className="space-y-2">
                    <label htmlFor="clientHo" className="font-medium">
                      Client HO
                    </label>
                    <input
                      id="clientHo"
                      name="clientHo"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.clientHo}
                    />
                    {formik.touched.clientHo && formik.errors.clientHo ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.clientHo}
                      </div>
                    ) : null}
                  </div>

                  {/* Finance POC */}
                  <div className="space-y-2">
                    <label htmlFor="financePocName" className="font-medium">
                      Finance POC
                    </label>
                    <input
                      id="financePocName"
                      name="financePocName"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.financePocName}
                    />
                    {formik.touched.financePocName &&
                    formik.errors.financePocName ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.financePocName}
                      </div>
                    ) : null}
                  </div>

                  {/* Finance Number */}
                  <div className="space-y-2">
                    <label htmlFor="financeNumber" className="font-medium">
                      Finance Number
                    </label>
                    <input
                      id="financeNumber"
                      name="financeNumber"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.financeNumber}
                    />
                    {formik.touched.financeNumber &&
                    formik.errors.financeNumber ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.financeNumber}
                      </div>
                    ) : null}
                  </div>

                  {/* Finance Email */}
                  <div className="space-y-2">
                    <label htmlFor="financeEmail" className="font-medium">
                      Finance Email
                    </label>
                    <input
                      id="financeEmail"
                      name="financeEmail"
                      type="email"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.financeEmail}
                    />
                    {formik.touched.financeEmail &&
                    formik.errors.financeEmail ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.financeEmail}
                      </div>
                    ) : null}
                  </div>

                  {/* GST */}
                  <div className="space-y-2">
                    <label htmlFor="gstnumber" className="font-medium">
                      GST
                    </label>
                    <input
                      id="gstnumber"
                      name="gstnumber"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gstnumber}
                    />
                    {formik.touched.gstnumber && formik.errors.gstnumber ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.gstnumber}
                      </div>
                    ) : null}
                  </div>

                  {/* CIN */}
                  <div className="space-y-2">
                    <label htmlFor="cinnumber" className="font-medium">
                      CIN
                    </label>
                    <input
                      id="cinnumber"
                      name="cinnumber"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cinnumber}
                    />
                    {formik.touched.cinnumber && formik.errors.cinnumber ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.cinnumber}
                      </div>
                    ) : null}
                  </div>

                  {/* PAN */}
                  <div className="space-y-2">
                    <label htmlFor="pannumber" className="font-medium">
                      PAN
                    </label>
                    <input
                      id="pannumber"
                      name="pannumber"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pannumber}
                    />
                    {formik.touched.pannumber && formik.errors.pannumber ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.pannumber}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Add Client
                  </button>
                  <button
                    type="button"
                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => setIsClientAdded(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Popup>
        )}
      </div>

      {clientFound && (
        <div className="text-red-500 my-4">{clientResponse}</div>
      )}

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
