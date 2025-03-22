export default function IssuesCreate() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-2">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-[80%] order-1">
          <div className="flex items-start gap-4 bg-white rounded-md">
            <div className="flex flex-col flex-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add a title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add a description</label>
                <textarea
                  rows={10}
                  placeholder="Type your description here..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 resize-y"
                ></textarea>
              </div>

              <div className="flex items-center justify-end">
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
