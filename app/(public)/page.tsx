import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesColumn,
  CircleCheck,
  GraduationCap,
  Laptop,
  Sparkles,
  Users,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicCourseCard } from "@/app/(public)/_components/PublicCourseCard";
import { getAllCourses } from "@/app/data/course/get-all-courses";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StatItem {
  label: string;
  value: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const features: FeatureProps[] = [
  {
    title: "Comprehensive Course Catalog",
    description:
      "Access a wide range of courses across various subjects, all in one place.",
    icon: BookOpen,
  },
  {
    title: "Hands-On Learning",
    description:
      "Engage with practical lessons, quizzes, and assignments that reinforce core concepts.",
    icon: Laptop,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed progress tracking and analytics.",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Career-Focused Paths",
    description:
      "Follow structured learning paths designed to help you build job-ready skills.",
    icon: GraduationCap,
  },
];

const stats: StatItem[] = [
  { label: "Published Courses", value: "100+" },
  { label: "Active Learners", value: "12K+" },
  { label: "Completion Rate", value: "92%" },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "LearnMate helped me land my first developer role with clear, practical learning paths.",
    name: "Priya Sharma",
    role: "Frontend Engineer",
  },
  {
    quote:
      "The lesson structure is perfect for busy schedules. I could learn consistently every day.",
    name: "Carlos Mendez",
    role: "Data Analyst",
  },
  {
    quote:
      "I built portfolio projects from the courses and started getting interview calls quickly.",
    name: "Amina Yusuf",
    role: "Software Developer",
  },
];

const trustSignals = [
  "Beginner to Advanced Paths",
  "Practical Projects",
  "Progress Tracking",
  "Mobile Friendly",
];

function StepItem({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <Badge variant="secondary" className="w-fit">
          Step {step}
        </Badge>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function MetricItem({ label, value }: StatItem) {
  return (
    <Card className="border-primary/20">
      <CardContent className="py-5">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

export default async function Home() {
  const courses = await getAllCourses();
  const popular = courses.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-background to-background" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 max-w-2xl">
            <Badge variant="outline" className="mb-5">
              <Sparkles className="size-3.5" />
              Learn smarter, build faster
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Professional learning,
              <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                built for modern careers
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl">
              Discover expertly crafted courses, practical projects, and a
              clear learning roadmap. Move from learning concepts to applying
              them in real-world work.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/courses" className={buttonVariants({ size: "lg" })}>
                Explore Courses
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/login"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Get Started
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {trustSignals.map((item) => (
                <div key={item} className="inline-flex items-center gap-2">
                  <CircleCheck className="size-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg inline-flex items-center gap-2">
                  <Users className="size-5 text-primary" />
                  Learning outcomes snapshot
                </CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                {stats.map((item) => (
                  <MetricItem key={item.label} label={item.label} value={item.value} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Why learners choose LearnMate
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            A focused experience designed to help you build momentum and keep
            learning consistently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardHeader className="space-y-3">
                  <div className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground leading-6">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
            How it works
          </h3>
          <p className="text-muted-foreground mt-2">
            A simple path from enrollment to measurable progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StepItem
            step="1"
            title="Choose your course"
            description="Browse curated categories and pick a course that matches your current level."
          />
          <StepItem
            step="2"
            title="Learn with clear lessons"
            description="Follow structured chapters with practical tasks and examples."
          />
          <StepItem
            step="3"
            title="Track and complete"
            description="Monitor lesson completion and keep your momentum using progress insights."
          />
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Popular courses
            </h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Get started with high-impact courses selected by learner activity.
            </p>
          </div>

          <Link
            href="/courses"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.length ? (
            popular.map((course) => (
              <PublicCourseCard key={course.id} data={course} />
            ))
          ) : (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No courses available yet.
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
            What learners say
          </h3>
          <p className="text-muted-foreground mt-2">
            Real feedback from learners building their skills on LearnMate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <Card key={item.name} className="h-full">
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground leading-7">&ldquo;{item.quote}&rdquo;</p>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-8 md:py-10 mb-10">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-xl md:text-2xl font-semibold tracking-tight">
                Start your learning journey today
              </h4>
              <p className="text-muted-foreground mt-2">
                Join learners improving their skills with structured,
                career-focused content.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/courses" className={buttonVariants()}>
                Browse courses
              </Link>
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
