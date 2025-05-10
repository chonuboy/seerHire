import { useFormik } from 'formik';
import { interviewRoundSchema } from '@/lib/models/candidate';
import { createInterviewRound } from '@/api/interviews/InterviewRounds';
import { toast } from 'react-toastify';

export default function AddRound({
  className,
  interviewInfo,
  onclose,
}: {
  className?: string;
  interviewInfo?: any;
  onclose?: () => void;
}) {
  const formik = useFormik({
    initialValues: {
      roundNumber: 0,
      roundDate: '',
      interviewerName: '',
      interviewStatus: 'Scheduled',
      technologyInterviewed: '',
      techRating: undefined,
      softskillsRating: undefined,
      remarks: '',
      interview: interviewInfo?.interview || null,
    },
    validationSchema: interviewRoundSchema,
    onSubmit: async (values) => {
      try {
        await createInterviewRound(values).then((data) => {
          console.log(data);
          if(data.status === 200) {
            toast.success("Round added successfully", {
              position: "top-right",
            })
          }
          if (onclose) onclose();
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to add round", {
          position: "top-right",
        });
      }
    },
  });

  return (
    <div className={`${className}`}>
      <div className="w-full max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Add New Round</h1>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* Interview Date */}
          <div className="space-y-2">
            <label htmlFor="roundDate" className="block text-sm font-medium">
              Interview Date
            </label>
            <input
              type="date"
              id="roundDate"
              name="roundDate"
              value={formik.values.roundDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.roundDate && formik.errors.roundDate && (
              <div className="text-red-500 text-sm">{formik.errors.roundDate}</div>
            )}
          </div>

          {/* Round Number */}
          <div className="space-y-2">
            <label htmlFor="roundNumber" className="block text-sm font-medium">
              Round Number
            </label>
            <input
              type="number"
              id="roundNumber"
              name="roundNumber"
              value={formik.values.roundNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.roundNumber && formik.errors.roundNumber && (
              <div className="text-red-500 text-sm">{formik.errors.roundNumber}</div>
            )}
          </div>

          {/* Interviewer Name */}
          <div className="space-y-2">
            <label htmlFor="interviewerName" className="block text-sm font-medium">
              Interviewer Name
            </label>
            <input
              type="text"
              id="interviewerName"
              name="interviewerName"
              value={formik.values.interviewerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Interviewer Name"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.interviewerName && formik.errors.interviewerName && (
              <div className="text-red-500 text-sm">{formik.errors.interviewerName}</div>
            )}
          </div>

          {/* Interview Status */}
          <div className="space-y-2">
            <span className="block text-sm font-medium">Interview Status</span>
            <div className="flex gap-4">
              {['Passed', 'Rejected', 'On-Hold', 'Pending'].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="interviewStatus"
                    value={status}
                    checked={formik.values.interviewStatus === status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">{status}</span>
                </label>
              ))}
            </div>
            {formik.touched.interviewStatus && formik.errors.interviewStatus && (
              <div className="text-red-500 text-sm">{formik.errors.interviewStatus}</div>
            )}
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <label htmlFor="remarks" className="block text-sm font-medium">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={formik.values.remarks}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Remarks"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] dark:text-black"
            />
            {formik.touched.remarks && formik.errors.remarks && (
              <div className="text-red-500 text-sm">{formik.errors.remarks}</div>
            )}
          </div>

          {/* Tech Rating */}
          <div className="space-y-2">
            <label htmlFor="techRating" className="block text-sm font-medium">
              Tech Rating
            </label>
            <input
              type="number"
              id="techRating"
              name="techRating"
              value={formik.values.techRating || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Rating from 1 to 10"
              min="1"
              max="10"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.techRating && formik.errors.techRating && (
              <div className="text-red-500 text-sm">{formik.errors.techRating}</div>
            )}
          </div>

          {/* Soft Skills Rating */}
          <div className="space-y-2">
            <label htmlFor="softskillsRating" className="block text-sm font-medium">
              Soft Skill Rating
            </label>
            <input
              type="number"
              id="softskillsRating"
              name="softskillsRating"
              value={formik.values.softskillsRating || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Rating from 1 to 10"
              min="1"
              max="10"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.softskillsRating && formik.errors.softskillsRating && (
              <div className="text-red-500 text-sm">{formik.errors.softskillsRating}</div>
            )}
          </div>

          {/* Technology Interviewed */}
          <div className="space-y-2">
            <label htmlFor="technologyInterviewed" className="block text-sm font-medium">
              Technology Interviewed
            </label>
            <input
              type="text"
              id="technologyInterviewed"
              name="technologyInterviewed"
              value={formik.values.technologyInterviewed}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Single or Multiple Technologies"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.technologyInterviewed && formik.errors.technologyInterviewed && (
              <div className="text-red-500 text-sm">{formik.errors.technologyInterviewed}</div>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Adding...' : 'Add Round'}
          </button>
          <button
            type="button"
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onclose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}