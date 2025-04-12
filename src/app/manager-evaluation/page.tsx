"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { generatePerformanceInsights, GeneratePerformanceInsightsOutput } from "@/ai/flows/generate-performance-insights";
import { getDirectReports, Employee } from "@/services/employee";


const evaluationCriteriaSchema = z.object({
  sme: z.string().min(1, "SME is required"),
  strategicThinking: z.string().min(1, "Strategic Thinking is required"),
  execution: z.string().min(1, "Execution is required"),
  communication: z.string().min(1, "Communication is required"),
  customerFocus: z.string().min(1, "Customer Focus is required"),
  breadthOfInfluence: z.string().min(1, "Breadth of Influence is required"),
});

const formSchema = z.record(z.string(), evaluationCriteriaSchema);



type EvaluationCriteria = z.infer<typeof evaluationCriteriaSchema>;

interface DirectReport {
  id: string;
}

interface ManagerEvaluation {
  [employeeId: string]: EvaluationCriteria;
}
const ManagerEvaluationPage = () => {
  const [insights, setInsights] = useState<{ [employeeId: string]: GeneratePerformanceInsightsOutput }>({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sme: "4",
      strategicThinking: "3",
      execution: "5",
      communication: "4",
      customerFocus: "5",
      breadthOfInfluence: "3",
    },
  });

  const [directReports, setDirectReports] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchDirectReports = async () => {
      const reports = await getDirectReports("456"); // Replace with actual manager ID
      setDirectReports(reports);
    }; //manager ID = "3"

    fetchDirectReports();
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    
    const evaluations: ManagerEvaluation = {};
    for (const employeeId in data) {
      evaluations[employeeId] = {
        sme: data[employeeId].sme,
        strategicThinking: data[employeeId].strategicThinking,
        execution: data[employeeId].execution,
        communication:
          data[employeeId].communication,
        customerFocus: data[employeeId].customerFocus,
        breadthOfInfluence: data[employeeId].breadthOfInfluence,
      };
    }
    
    // Call GenAI to generate insights for each report
    for (const employeeId of directReports.map(dr => dr.id)) {
    const input = {
        employeeId: employeeId, // Each employeeId
        selfEvaluation: {
          sme: "dummy",
          strategicThinking: "dummy",
          execution: "dummy",
          communication: "dummy",customerFocus: "dummy",
          breadthOfInfluence: "dummy",
        },
        managerFeedback: evaluations[employeeId],
      }; 
      const generatedInsights = await generatePerformanceInsights(input);
      setInsights((prevInsights) => ({
        ...prevInsights,
        [employeeId]: generatedInsights,
      }));
    }
  
  }

const insightsCards = Object.entries(insights).map(([employeeId, generatedInsights]) => (
    <div key={employeeId}>
        <Card>
            <CardHeader>
                <CardTitle>Performance Insights for {directReports.find(dr => dr.id == employeeId)?.name || employeeId}</CardTitle>
            </CardHeader>
            <CardContent>
                {generatedInsights && (
                    <>
                        <p><strong>Strengths:</strong> {generatedInsights.strengths}</p>
                        <p><strong>Areas for Improvement:</strong> {generatedInsights.areasForImprovement}</p>
                    </>
                )}
            </CardContent>
        </Card>
    </div>
));
return (
    
    <div><Card>
        <CardHeader>
          <CardTitle>Manager Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {directReports.map((report) => (
                  <div key={report.id} className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Evaluation for {report.name}
                    </h3>
                    <FormField
                      control={form.control}
                      name={`${report.id}.sme`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SME (Subject Matter Expertise)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your SME" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${report.id}.strategicThinking`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Strategic Thinking</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your Strategic Thinking" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${report.id}.execution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Execution</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your Execution" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${report.id}.communication`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Communication</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your Communication" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${report.id}.customerFocus`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Focus</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your Customer Focus" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${report.id}.breadthOfInfluence`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Breadth of Influence</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your Breadth of Influence" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        {insightsCards} </CardContent>
      </Card></div>



);
};

export default ManagerEvaluationPage;
