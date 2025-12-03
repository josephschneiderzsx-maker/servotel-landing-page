import { LucideIcon } from "lucide-react";

export interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    amenities: string[];
    tag?: string;
}

export interface Testimonial {
    id: number;
    text: string;
    author: string;
    role: string;
    image: string;
    rating: number;
}

export interface Service {
    title: string;
    subtitle: string;
    image: string;
}
