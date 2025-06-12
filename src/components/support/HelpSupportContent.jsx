// src/components/HelpSupportContent.jsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function HelpSupportContent() {
  return (
    <div className="py-6">
      {/* ── Page Header ── */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Help & Support
        </h1>
        <p className="text-muted-foreground">
          Find answers to your questions and watch our introduction video.
        </p>
      </div>

      {/* ── Video Introduction ── */}
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden rounded-lg shadow-lg bg-black">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/eU3n-Ylqd1U?si=QDvJ5CCa370KOGZp"
              title="Welcome to Support"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <CardContent className="p-4 text-white text-center">
            <p className="text-lg font-semibold">Welcome to Support</p>
            <p className="text-sm opacity-80 mt-1">
              Get a quick overview of how we can assist you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}