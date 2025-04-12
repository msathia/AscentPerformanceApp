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

const formSchema = z.object({
  sme: z.string().optional(),
  strategicThinking: z.string().optional(),
  execution: z.string().optional(),
  communication: z.string().optional(),
  customerFocus: z.string().optional(),
  breadthOfInfluence: z.string().optional(),
});

const ManagerEvaluationPage = () => {
  const [insights, setInsights] = useState<GeneratePerformanceInsightsOutput | null>(null);
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Call GenAI to generate insights
    const input = {
      employeeId: "123", // Replace with actual employee ID
      selfEvaluation: {
        sme: 3,  // Dummy value
        strategicThinking: 4, // Dummy value
        execution: 5, // Dummy value
        communication: 3, // Dummy value
        customerFocus: 4, // Dummy value
        breadthOfInfluence: 5, // Dummy value
      },
      managerFeedback: {
        sme: parseInt(values.sme || "0"),
        strategicThinking: parseInt(values.strategicThinking || "0"),
        execution: parseInt(values.execution || "0"),
        communication: parseInt(values.communication || "0"),
        customerFocus: parseInt(values.customerFocus || "0"),
        breadthOfInfluence: parseInt(values.breadthOfInfluence || "0"),
      },
    };

    const generatedInsights = await generatePerformanceInsights(input);
    setInsights(generatedInsights);
  }

  const insightsCard = insights ? (
    <Card>
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Strengths:</strong> {insights.strengths}</p>
        <p><strong>Areas for Improvement:</strong> {insights.areasForImprovement}</p>
      </CardContent>
    </Card>
  ) : null;
  return (

    <div><Card>
        <CardHeader>
          <CardTitle>Manager Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="sme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SME (Subject Matter Expertise)</FormLabel>
                    <FormControl>
                      <Input placeholder="Rate your SME" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="strategicThinking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strategic Thinking</FormLabel>
                    <FormControl>
                      <Input placeholder="Rate your Strategic Thinking" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="execution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Execution</FormLabel>
                    <FormControl>
                      <Input placeholder="Rate your Execution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="communication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Communication</FormLabel>
                    <FormControl>
                      <Input placeholder="Rate your Communication" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerFocus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Focus</FormLabel>
                    <FormControl>
                      <Input placeholder="Rate your Customer Focus" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="breadthOfInfluence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breadth of Influence</FormLabel>
                    <FormControl>
                      <Input placeholder="Rate your Breadth of Influence" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>{insightsCard}</div>



  );
};

export default ManagerEvaluationPage;
