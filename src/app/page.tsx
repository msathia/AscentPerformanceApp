"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import SelfEvaluationPage from "./self-evaluation/page";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation"; // Import usePathname

export default function Home() {  const pathname = usePathname(); // Get the current route
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2>Ascend Performance</h2>
          <p>Talent Management</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton>Home</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/self-evaluation">
                  <SidebarMenuButton>Self evaluation</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/manager-evaluation">
                  <SidebarMenuButton>Manager evaluation</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/direct-reports">
                  <SidebarMenuButton>Direct Reports</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-xs">
            Powered by Firebase Studio
          </p>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-4">{pathname === "/" && (
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
      )}
        {pathname === "/self-evaluation" && (
          //  Instead of linking to the page, render the component directly
          <SelfEvaluationPage />
        )}
        {pathname === "/manager-evaluation" && (
          <Card>
            <CardHeader>
              <CardTitle>Manager Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This section will display the manager evaluation.</p>
            </CardContent>
          </Card>
        )}
        {pathname === "/direct-reports" && (<Card><CardHeader><CardTitle>Direct Reports</CardTitle></CardHeader><CardContent><p>This section will display information about direct reports.</p></CardContent></Card>)}
      </main>
    </SidebarProvider>
  );
}
