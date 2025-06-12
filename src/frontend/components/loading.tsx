import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-400 border-solid"></div>
    </div>
  );
}
