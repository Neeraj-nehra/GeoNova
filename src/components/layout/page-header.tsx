"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type PageHeaderProps = {
  title: string;
  showRefresh?: boolean;
};

export function PageHeader({ title, showRefresh = false }: PageHeaderProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.slice(1).map((segment, index) => (
              <React.Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === pathSegments.length - 2 ? (
                     <BreadcrumbPage className="capitalize">{segment.replace(/-/g, ' ')}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                       <Link href={`/${pathSegments.slice(0, index + 2).join('/')}`} className="capitalize">{segment.replace(/-/g, ' ')}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold font-headline mt-2 text-gray-800">{title}</h1>
      </div>
      {showRefresh && (
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      )}
    </div>
  );
}

// Minimal Breadcrumb component if not available in shadcn/ui
// This is a simplified version.
// If you have `breadcrumb.tsx` in `components/ui`, you can remove this.
const Breadcrumb = ({ children }: { children: React.ReactNode }) => <nav aria-label="breadcrumb">{children}</nav>;
const BreadcrumbList = ({ children }: { children: React.ReactNode }) => <ol className="flex items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">{children}</ol>;
const BreadcrumbItem = ({ children }: { children: React.ReactNode }) => <li className="inline-flex items-center gap-1.5">{children}</li>;
const BreadcrumbLink = ({ children, ...props }: { children: React.ReactNode } & React.ComponentProps<typeof Link>) => <Link {...props} className="transition-colors hover:text-foreground">{children}</Link>;
const BreadcrumbPage = ({ children }: { children: React.ReactNode }) => <span role="link" aria-disabled="true" aria-current="page" className="font-normal text-foreground">{children}</span>;
const BreadcrumbSeparator = () => <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18194L5.47483 3.47483C5.24754 3.24754 4.8814 3.31131 4.72126 3.58988L2.29999 7.5L4.72126 11.4101C4.8814 11.6887 5.24754 11.7525 5.47483 11.5252L6.18194 10.8181C6.3595 10.6405 6.32433 10.3444 6.12236 10.203L4.29139 8.75H12.5C12.7761 8.75 13 8.52614 13 8.25V6.75C13 6.47386 12.7761 6.25 12.5 6.25H4.29139L6.12236 4.79697C6.32433 4.65556 6.3595 4.3595 6.18194 4.18194Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></li>;
