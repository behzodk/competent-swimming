import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 text-gray-900",
        destructive: "bg-red-50 border-red-200 text-red-900 [&>svg]:text-red-600",
        success: "bg-green-50 border-green-200 text-green-900 [&>svg]:text-green-600",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-900 [&>svg]:text-yellow-600",
        info: "bg-blue-50 border-blue-200 text-blue-900 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props} />
  );
}

function AlertTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight", className)}
      {...props} />
  );
}

function AlertDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props} />
  );
}

// Pre-styled alert components with icons
function AlertDestructive({ children, ...props }) {
  return (
    <Alert variant="destructive" {...props}>
      <AlertCircle className="h-5 w-5" />
      {children}
    </Alert>
  );
}

function AlertSuccess({ children, ...props }) {
  return (
    <Alert variant="success" {...props}>
      <CheckCircle2 className="h-5 w-5" />
      {children}
    </Alert>
  );
}

function AlertWarning({ children, ...props }) {
  return (
    <Alert variant="warning" {...props}>
      <AlertTriangle className="h-5 w-5" />
      {children}
    </Alert>
  );
}

function AlertInfo({ children, ...props }) {
  return (
    <Alert variant="info" {...props}>
      <Info className="h-5 w-5" />
      {children}
    </Alert>
  );
}

export { 
  Alert, 
  AlertTitle, 
  AlertDescription,
  AlertDestructive,
  AlertSuccess,
  AlertWarning,
  AlertInfo
}
