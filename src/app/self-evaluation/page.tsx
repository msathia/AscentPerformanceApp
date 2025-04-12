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
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { generatePerformanceInsights, GeneratePerformanceInsightsOutput } from "@/ai/flows/generate-performance-insights";

const formSchema = z.object({
  sme: z.string().optional(),
  strategicThinking: z.string(),
  execution: z.string(),
  communication: z.string(),
  customerFocus: z.string(),
  breadthOfInfluence: z.string(),
});
import { useForm } from "react-hook-form";






const SelfEvaluationPage = () => {
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
        sme: values.sme,
        strategicThinking: values.strategicThinking,
        execution: values.execution,
        communication: values.communication,
        customerFocus: values.customerFocus,
        breadthOfInfluence: values.breadthOfInfluence,
      },
      managerFeedback: {
        sme: 3,  // Dummy value
        strategicThinking: 4, // Dummy value
        execution: 5, // Dummy value
        communication: 3, // Dummy value
        customerFocus: 4, // Dummy value
        breadthOfInfluence: 5, // Dummy value
      },
    };

    const generatedInsights = await generatePerformanceInsights(input);
    setInsights(generatedInsights);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Self Evaluation</CardTitle>
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
                      <Textarea placeholder="Describe your SME" {...field} />
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
                      <Textarea placeholder="Describe your Strategic Thinking" {...field} />
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
                      <Textarea placeholder="Describe your Execution" {...field} />
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
                      <Textarea placeholder="Describe your Communication" {...field} />
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
                      <Textarea placeholder="Describe your Customer Focus" {...field} />
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
                      <Textarea placeholder="Describe your Breadth of Influence" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {insights && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Strengths:</strong> {insights.strengths}
            </p>
            <p>
              <strong>Areas for Improvement:</strong> {insights.areasForImprovement}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SelfEvaluationPage;
