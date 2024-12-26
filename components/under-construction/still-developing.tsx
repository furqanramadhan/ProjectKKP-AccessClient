"use client";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const UnderConstructionPage = () => {
  const [isActive] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="flex justify-center">
          <AlertTriangle className="h-24 w-24 text-color_yellow animate-pulse" />
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
            <div
              className="h-full bg-color_yellow rounded-full animate-bounce"
              style={{ width: "65%", transition: "width 2s ease-in-out" }}
            />
          </div>
          <p className="text-sm text-gray-500">
            Expected completion: Coming soon
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className={cn(
              "w-full lg:w-auto justify-between font-roboto bg-color_blue_normal hover:bg-color_yellow border-none focus-visible:ring-offset-0 outline-none transition"
            )}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
