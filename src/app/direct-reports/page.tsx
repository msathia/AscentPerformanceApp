"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getDirectReports, Employee } from "@/services/employee";

const DirectReportsPage = () => {
  const [directReports, setDirectReports] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchDirectReports = async () => {
      const reports = await getDirectReports("456"); // Replace with actual manager ID
      setDirectReports(reports);
    };

    fetchDirectReports();
  }, []);

  return (
    <main className="flex-1 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Direct Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {directReports.length > 0 ? (
            <ul>
              {directReports.map((report) => (
                <li key={report.id}>{report.name} - {report.role}</li>
              ))}
            </ul>
          ) : (
            <p>No direct reports found.</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default DirectReportsPage;
