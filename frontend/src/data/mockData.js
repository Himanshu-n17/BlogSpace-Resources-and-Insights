const mockAuthors = [
  {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia@example.com",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Phoenix Baker",
    email: "phoenix@example.com",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Lana Steiner",
    email: "lana@example.com",
    avatar:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "4",
    name: "Drew Cano",
    email: "drew@example.com",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    createdAt: new Date("2024-01-08"),
  },
];

export const mockCategories = [
  {
    id: "1",
    name: "Design",
    color: "bg-purple-100 text-purple-800",
    count: 12,
  },
  { id: "2", name: "Product", color: "bg-blue-100 text-blue-800", count: 8 },
  {
    id: "3",
    name: "Software Engineering",
    color: "bg-green-100 text-green-800",
    count: 15,
  },
  {
    id: "4",
    name: "Management",
    color: "bg-orange-100 text-orange-800",
    count: 6,
  },
  {
    id: "5",
    name: "Customer Success",
    color: "bg-pink-100 text-pink-800",
    count: 4,
  },
];

export const mockPosts = [
  {
    id: "1",
    title: "UX review presentations",
    content:
      "How do you create compelling presentations that wow your colleagues and impress your managers? In this comprehensive guide, we explore the art of crafting presentations that not only convey information effectively but also engage and inspire your audience.",
    excerpt:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    imageUrl:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    category: "Design",
    tags: ["UX", "Presentation", "Design"],
    author: mockAuthors[0],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    slug: "ux-review-presentations",
  },
  {
    id: "2",
    title: "Migrating to Linear 101",
    content:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Heres how to get started with migrating your team to this powerful project management tool.",
    excerpt:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Heres how to get started.",
    imageUrl:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    category: "Product",
    tags: ["Linear", "Project Management", "Tools"],
    author: mockAuthors[1],
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
    slug: "migrating-to-linear-101",
  },
  {
    id: "3",
    title: "Building your API Stack",
    content:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them. Learn about the essential tools and practices for building robust API stacks.",
    excerpt:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    imageUrl:
      "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    category: "Software Engineering",
    tags: ["API", "Backend", "Development"],
    author: mockAuthors[2],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    slug: "building-your-api-stack",
  },
  {
    id: "4",
    title: "Bill Walsh leadership lessons",
    content:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Learn from one of the greatest coaches in sports history.",
    excerpt:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    imageUrl:
      "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    category: "Management",
    tags: ["Leadership", "Management", "Strategy"],
    author: mockAuthors[0],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
    slug: "bill-walsh-leadership-lessons",
  },
  {
    id: "5",
    title: "PM mental models",
    content:
      "Mental models are simple expressions of complex processes or relationships. They help product managers make better decisions and communicate more effectively.",
    excerpt:
      "Mental models are simple expressions of complex processes or relationships.",
    imageUrl:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    category: "Product",
    tags: ["Product Management", "Strategy", "Mental Models"],
    author: mockAuthors[3],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
    slug: "pm-mental-models",
  },
  {
    id: "6",
    title: "What is Wireframing?",
    content:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry about this essential design practice that forms the foundation of great user experiences.",
    excerpt:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    imageUrl:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    category: "Design",
    tags: ["Wireframing", "UX", "Design Process"],
    author: mockAuthors[2],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    slug: "what-is-wireframing",
  },
];
