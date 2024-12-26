import { AlertTriangle } from "lucide-react";

const UnderConstructionPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="flex justify-center">
          <AlertTriangle className="h-24 w-24 text-yellow-500 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            404 - Under Construction
          </h1>
          <p className="text-xl text-gray-600">
            We're working hard to build something amazing for you
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="h-2 w-64 bg-gray-200 rounded-full">
            <div className="h-full w-1/2 bg-yellow-500 rounded-full animate-bounce" />
          </div>
          <p className="text-sm text-gray-500">
            Expected completion: Coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
