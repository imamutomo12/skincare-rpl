import React from "react";
import { AutorenewRounded } from "@mui/icons-material";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Logo/Spinner */}
        <div className="relative flex justify-center">
          <div className="absolute -inset-2 bg-taro/20 blur-lg rounded-full animate-pulse"></div>
          <div className="relative">
            <AutorenewRounded
              className="text-taro w-16 h-16 animate-spin"
              style={{ animationDuration: "1.5s" }}
            />
          </div>
        </div>

        {/* Text Animation */}
        <div className="space-y-2">
          <h1 className="text-4xl font-jura font-bold text-dongker animate-pulse">
            Halo
          </h1>
          <p className="text-satu font-jura text-lg">
            Analyzing your skin profile...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-taro rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
