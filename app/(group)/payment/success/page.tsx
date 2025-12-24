

export default function SuccessPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <svg
            className="mx-auto text-green-500 w-16 h-16 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-3xl font-semibold text-gray-800">
            Payment Successful
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Your payment was processed successfully. Thank you for your purchase!
          </p>
        </div>

        <div className="text-center">
         
          <a
            href="/"
            className="inline-block text-lg font-medium text-white bg-green-600 hover:bg-green-700 py-2 px-6 rounded-md shadow-md transition duration-300"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
