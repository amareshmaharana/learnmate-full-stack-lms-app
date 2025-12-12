import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: "Comprehensive Course Library",
    description:
      "Access a wide range of courses across various subjects, all in one place.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: "🧑‍🏫",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed progress tracking and analytics.",
    icon: "📈",
  },
  {
    title: "Mobile Access",
    description:
      "Learn on the go with our mobile-friendly platform, accessible from any device.",
    icon: "📱",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline" className="text-sm">
            Empower learning anytime, anywhere.
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your learning experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access our high-quality courses anytime,
            anywhere.
          </p>

          <div className="flex flex-row sm:flex-row gap-4 mt-8">
            {/* for exploring course */}
            <Link
              className={buttonVariants({
                size: "lg",
              })}
              href="/courses"
            >
              Explore Courses
            </Link>

            {/* to login to access the courses */}
            <Link
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
              href="/login"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
