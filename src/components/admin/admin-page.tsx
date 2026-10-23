import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

/** Top bar 56px (breadcrumb + slot kanan) dan kolom konten 880px. */
export const AdminPage = ({
  title,
  heading = title,
  description,
  topbar,
  action,
  children,
}: {
  title: string;
  heading?: string;
  description: string;
  topbar?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <>
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-[#eceeed] bg-background px-4 md:rounded-t-xl md:px-6">
      <SidebarTrigger className="-ml-1 md:hidden" />
      <p className="flex min-w-0 items-center gap-2 text-sm text-subtle">
        <span className="max-sm:hidden">Admin</span>
        <span className="max-sm:hidden">/</span>
        <span className="truncate font-medium text-foreground">{title}</span>
      </p>
      <div className="ml-auto flex shrink-0 items-center gap-3">{topbar}</div>
    </header>
    <div className="mx-auto flex w-full max-w-[880px] flex-col gap-6 px-4 pt-8 pb-20 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[22px] font-semibold tracking-[-0.01em]">
            {heading}
          </h1>
          <p className="text-subtle">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  </>
);

export const AdminSection = ({
  title,
  description,
  className,
  children,
}: {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section className={cn("flex flex-col gap-5 rounded-xl border p-6", className)}>
    {title && (
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-semibold">{title}</h2>
        {description && (
          <p className="text-[13px] text-subtle">{description}</p>
        )}
      </div>
    )}
    {children}
  </section>
);
