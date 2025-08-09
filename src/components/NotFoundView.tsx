export const NotFoundView = ({
  title,
  message,
  backAction,
}: {
  title: string;
  message: string;
  backAction: () => void;
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={backAction}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
