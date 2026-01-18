import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/use-mobile", () => ({
    useIsMobile: () => false,
}));

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
} from "./sidebar";

describe("Sidebar primitives", () => {
    it("renders sections and toggles collapsed state", async () => {
        const user = userEvent.setup();

        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>Header</SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Group</SidebarGroupLabel>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive tooltip="Tip">Item</SidebarMenuButton>
                                    <SidebarMenuAction aria-label="Action" />
                                    <SidebarMenuBadge>3</SidebarMenuBadge>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>Sub</SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarSeparator />
                    <SidebarFooter>Footer</SidebarFooter>
                </Sidebar>
                <SidebarInset data-testid="inset" />
                <SidebarTrigger aria-label="Toggle Sidebar" />
            </SidebarProvider>
        );

        const sidebar = document.querySelector("[data-state]") as HTMLElement | null;
        expect(sidebar).not.toBeNull();
        expect(sidebar?.getAttribute("data-state")).toBe("expanded");
        expect(screen.getByText("Item")).toBeInTheDocument();
        expect(screen.getByText("Sub")).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
        expect(screen.getByTestId("inset")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /toggle sidebar/i }));
        expect(sidebar?.getAttribute("data-state")).toBe("collapsed");
    });
});
