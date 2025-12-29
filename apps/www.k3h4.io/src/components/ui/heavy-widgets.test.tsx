import React from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";

import { Calendar } from "./calendar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { ChartContainer } from "./chart";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemHeader,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from "./item";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "./field";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./form";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "./menubar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./navigation-menu";

vi.mock("embla-carousel-react", () => {
    const api = {
        scrollPrev: vi.fn(),
        scrollNext: vi.fn(),
        canScrollPrev: () => true,
        canScrollNext: () => false,
        on: vi.fn(),
        off: vi.fn(),
    };
    const ref = vi.fn();
    return {
        __esModule: true,
        default: () => [ref, api],
    };
});

vi.mock("recharts", () => {
    const ResponsiveContainer = ({ children }: any) => (
        <div data-testid="recharts-container">{typeof children === "function" ? children({}) : children}</div>
    );
    const Tooltip = (props: Record<string, unknown>) => <div data-testid="tooltip" {...props} />;
    const Legend = (props: Record<string, unknown>) => <div data-testid="legend" {...props} />;
    return { __esModule: true, ResponsiveContainer, Tooltip, Legend };
});

beforeAll(() => {
    if (!global.ResizeObserver) {
        // Minimal shim for components that expect ResizeObserver
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    }
});

describe("heavy ui widgets", () => {
    it("renders calendar days", () => {
        render(
            <Calendar
                mode="single"
                selected={new Date("2024-01-10")}
                month={new Date("2024-01-01")}
            />
        );

        expect(screen.getByRole("status")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("wires carousel controls", async () => {
        const user = userEvent.setup();

        render(
            <Carousel>
                <CarouselContent>
                    <CarouselItem>Slide A</CarouselItem>
                    <CarouselItem>Slide B</CarouselItem>
                </CarouselContent>
                <CarouselPrevious aria-label="prev" />
                <CarouselNext aria-label="next" />
            </Carousel>
        );

        expect(screen.getByLabelText("prev")).toBeEnabled();
        expect(screen.getByLabelText("next")).toBeDisabled();

        await user.click(screen.getByLabelText("prev"));
    });

    it("injects chart colors", () => {
        render(
            <ChartContainer config={{ sales: { color: "red" } }}>
                <div>Chart inner</div>
            </ChartContainer>
        );

        const style = Array.from(document.querySelectorAll("style")).find((el) => el.textContent?.includes("--color-sales"));
        expect(style?.textContent).toContain("--color-sales: red");
        expect(screen.getByTestId("recharts-container")).toBeInTheDocument();
    });

    it("renders item layouts", () => {
        render(
            <ItemGroup>
                <Item>
                    <ItemMedia variant="icon">*</ItemMedia>
                    <ItemContent>
                        <ItemHeader>
                            <ItemTitle>Title</ItemTitle>
                            <ItemActions>Action</ItemActions>
                        </ItemHeader>
                        <ItemDescription>Description</ItemDescription>
                        <ItemSeparator />
                    </ItemContent>
                </Item>
            </ItemGroup>
        );

        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("renders field groups and errors", () => {
        render(
            <FieldSet>
                <FieldLegend>Legend</FieldLegend>
                <FieldGroup>
                    <Field orientation="horizontal">
                        <FieldLabel>Label</FieldLabel>
                        <FieldContent>
                            <FieldTitle>Title</FieldTitle>
                            <FieldDescription>Details</FieldDescription>
                            <FieldSeparator>Break</FieldSeparator>
                            <FieldError errors={[{ message: "Oops" }]} />
                        </FieldContent>
                    </Field>
                </FieldGroup>
            </FieldSet>
        );

        expect(screen.getByText("Legend")).toBeInTheDocument();
        expect(screen.getByText("Oops")).toBeInTheDocument();
    });

    it("uses form controls and messages", async () => {
        const Wrapper = () => {
            const form = useForm({ defaultValues: { name: "" } });

            React.useEffect(() => {
                form.setError("name", { message: "Required" });
            }, [form]);

            return (
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <input aria-label="name" {...field} />
                                    </FormControl>
                                    <FormDescription>desc</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            );
        };

        render(<Wrapper />);

        expect(await screen.findByText("Required")).toBeInTheDocument();
    });

    it("shows menubar content when open", () => {
        render(
            <Menubar>
                <MenubarMenu {...({ open: true, onOpenChange: () => { } } as any)}>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent forceMount>
                        <MenubarItem>New</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        );

        expect(screen.getByText("File")).toBeInTheDocument();
        expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("renders navigation menu content", () => {
        render(
            <NavigationMenu value="products">
                <NavigationMenuList>
                    <NavigationMenuItem value="products">
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent forceMount>
                            <NavigationMenuLink href="#item">Item</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );

        fireEvent.click(screen.getByText("Products"));
        expect(screen.getByText("Item")).toBeInTheDocument();
    });
});
