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
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
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
      <main className="flex-1 p-4">
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
      </main>
    </SidebarProvider>
  );
}
