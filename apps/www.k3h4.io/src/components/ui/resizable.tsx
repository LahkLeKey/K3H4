"use client"

import { GripVertical } from "lucide-react"
import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type SeparatorProps,
} from "react-resizable-panels"

import { cn } from "../../lib/utils"

const ResizablePanelGroup = ({ className, ...props }: GroupProps) => (
  <Group
    className={cn("flex h-full w-full [&_[data-separator]]:bg-border", className)}
    {...props}
  />
)

const ResizablePanel = Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: SeparatorProps & { withHandle?: boolean }) => (
  <Separator
    className={cn(
      "group relative flex w-px items-center justify-center bg-border data-[resize-handle-active]:bg-primary data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
