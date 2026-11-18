
export interface DigitalProduct {
  slug: string;
  title: string;
  description: string;
  category: string;
  price: string;
  checkoutUrl: string;
}

export const products: DigitalProduct[] = [
  {
    slug: "entrepreneurs-time-system",
    title: "The Entrepreneur's Time System",
    description:
      "A practical 6-in-1 digital bundle designed to improve productivity, planning, and time management.",
    category: "Productivity",
    price: "$19.99",
    checkoutUrl: "",
  },
];
