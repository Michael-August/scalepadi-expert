import { Briefcase, FolderOpen, MessageCircleMore, Shapes, ThumbsUp } from "lucide-react";

export const Routes = [
    {
        name: "Projects",
        route: "/projects",
        icon: FolderOpen
    },
    {
        name: "Opportunities",
        route: "/opportunities",
        icon: Briefcase
    },
    {
        name: "Performance",
        route: "/performance",
        icon: ThumbsUp
    },
    {
        name: "Messages",
        route: "/messages",
        icon: MessageCircleMore
    },
    // {
    //     name: "Resources",
    //     route: "/resources",
    //     icon: Shapes
    // },
]