/"use client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// const formSchema = z.object({
//   sme: z.string().optional(),
//   strategicThinking: z.string().optional(),
//   execution: z.string().optional(),
//   communication: z.string().optional(),
//   customerFocus: z.string().optional(),
//   breadthOfInfluence: z.string().optional(),
// });

// interface EvaluationFormProps {
//   onSubmit: (values: z.infer<typeof formSchema>) => void;
// }

// const EvaluationForm: React.FC<EvaluationFormProps> = ({ onSubmit }) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       sme: "",
//       strategicThinking: "",
//       execution: "",
//       communication: "",
//       customerFocus: "",
//       breadthOfInfluence: "",
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="sme"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>SME (Subject Matter Expertise)</FormLabel>
//               <FormControl>
//                 <Input placeholder="Rate your SME" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="strategicThinking"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Strategic Thinking</FormLabel>
//               <FormControl>
//                 <Input placeholder="Rate your Strategic Thinking" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="execution"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Execution</FormLabel>
//               <FormControl>
//                 <Input placeholder="Rate your Execution" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="communication"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Communication</FormLabel>
//               <FormControl>
//                 <Input placeholder="Rate your Communication" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="customerFocus"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Customer Focus</FormLabel>
//               <FormControl>
//                 <Input placeholder="Rate your Customer Focus" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="breadthOfInfluence"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Breadth of Influence</FormLabel>
//               <FormControl>
//                 <Input placeholder="Rate your Breadth of Influence" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// };

// export default EvaluationForm;
