import { useFormik } from "formik";
import { clientFormSchema } from "@/lib/models/client";
import { updateClient } from "@/api/master/clients";
import { toast } from "react-toastify";

export default function ClientInfoUpdateForm({
  currentClient,
  id,
  autoClose,
}: {
  currentClient: any;
  id: number;
  autoClose: () => void;
}) {
  const getUpdatedFields = (initialValues: any, values: any) => {
    return Object.keys(values).reduce((acc: Record<string, any>, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
  };

  const formik = useFormik({
    initialValues: currentClient, // Pass initialValues from props
    validationSchema: clientFormSchema,
    onSubmit:(values) => {
      const updatedFields = getUpdatedFields(currentClient, values);
      console.log(updatedFields);
      try {
          updateClient(id, updatedFields).then((data)=>{
            console.log(data);
            autoClose();
            toast.success("Client updated successfully", {
              position: "top-right",
            })
          })
      }catch (error:any) {
        console.log(error);
      }
    },
  });
  return (
    <div className="bg-white mx-auto max-w-3xl p-4 mt-16 rounded-md">
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client HO */}
          <div className="space-y-2">
            <label htmlFor="clientHo" className="font-medium">
              Client HO
            </label>
            <input
              id="clientHo"
              name="clientHo"
              type="text"
              value={formik.values.clientHo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.clientHo && formik.errors.clientHo ? (
              <div className="text-red-500 text-sm">
                {formik.errors.clientHo.toString()}
              </div>
            ) : null}
          </div>

          {/* Finance POC Name */}
          <div className="space-y-2">
            <label htmlFor="financePocName" className="font-medium">
              Finance POC
            </label>
            <input
              id="financePocName"
              name="financePocName"
              type="text"
              value={formik.values.financePocName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.financePocName && formik.errors.financePocName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.financePocName.toString()}
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
              value={formik.values.financeNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.financeNumber && formik.errors.financeNumber ? (
              <div className="text-red-500 text-sm">
                {formik.errors.financeNumber.toString()}
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
              value={formik.values.financeEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.financeEmail && formik.errors.financeEmail ? (
              <div className="text-red-500 text-sm">
                {formik.errors.financeEmail.toString()}
              </div>
            ) : null}
          </div>

          {/* GST Number */}
          <div className="space-y-2">
            <label htmlFor="gstnumber" className="font-medium">
              GST
            </label>
            <input
              id="gstnumber"
              name="gstnumber"
              type="text"
              value={formik.values.gstnumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.gstnumber && formik.errors.gstnumber ? (
              <div className="text-red-500 text-sm">
                {formik.errors.gstnumber.toString()}
              </div>
            ) : null}
          </div>

          {/* CIN Number */}
          <div className="space-y-2">
            <label htmlFor="cinnumber" className="font-medium">
              CIN
            </label>
            <input
              id="cinnumber"
              name="cinnumber"
              type="text"
              value={formik.values.cinnumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.cinnumber && formik.errors.cinnumber ? (
              <div className="text-red-500 text-sm">
                {formik.errors.cinnumber.toString()}
              </div>
            ) : null}
          </div>

          {/* PAN Number */}
          <div className="space-y-2">
            <label htmlFor="pannumber" className="font-medium">
              PAN
            </label>
            <input
              id="pannumber"
              name="pannumber"
              type="text"
              value={formik.values.pannumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.pannumber && formik.errors.pannumber ? (
              <div className="text-red-500 text-sm">
                {formik.errors.pannumber.toString()}
              </div>
            ) : null}
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Update
          </button>
          <button
            type="button"
            onClick={autoClose}
            className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
