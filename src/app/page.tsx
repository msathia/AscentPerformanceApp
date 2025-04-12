"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Ascend Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This application is designed to streamline the talent review
              process.
            </p>
          </CardContent>
        </Card>
      </div>
  );
}
