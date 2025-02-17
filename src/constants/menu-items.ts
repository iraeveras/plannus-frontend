// File: src/constants/menu-items.ts

import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    Gauge,
    ChevronRight,
} from "lucide-react";

// Menu items.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Gauge,
        },
        {
            title: "Cadastros",
            url: "#",
            icon: SquareTerminal,
            isActive: false,
            items: [
                {
                    title: "Premissas",
                    url: "/premises/new",
                },
            ],
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export default data;