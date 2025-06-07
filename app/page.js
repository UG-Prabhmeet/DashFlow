import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Layout,
  Calendar,
  BarChart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CompanyCarousel from "@/components/company-carousel";
import Image from "next/image";
import FAQList from "@/components/Faqlist";
import CTASection from "@/components/CTASection";
import WhyChooseUs from "@/components/WhyChooseUs";

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full min-h-screen custom-gradient flex flex-col justify-between px-6 sm:px-12 md:px-32 pt-32 pb-12">
        {/* Text Content */}
        <div className="max-w-2xl text-left">
          <h1 className="text-5xl font-bold leading-tight text-white mb-6">
            Organize. Track. Deliver.
            <br />
            With <span className="text-orange-400">DashFlow</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Your all-in-one platform to manage tasks, teams, and timelines with
            ease and efficiency.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-[#ff6b4a] hover:bg-[#e85d3d] text-white font-semibold"
              >
                Get Started <ChevronRight size={18} className="ml-1" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Image */}
        <div className="w-full mt-16 flex justify-center">
          <img
            src="/dash.png"
            alt="DashFlow Dashboard"
            className="max-w-5xl w-full rounded-xl shadow-2xl border border-white/10"
          />
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row items-stretch justify-center py-24 px-4 bg-white">
        {/* Left: Main Text */}
        <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto md:mx-0 pl-12">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 leading-tight">
            We streamline
            <br />
            your workflow.
            <br />
            So your team can
            <br />
            focus on building.
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            DashFlow makes project planning, task tracking, and team
            collaboration seamless—out of the box.
          </p>
          <button className="flex items-center gap-2 text-blue-600 font-semibold hover:underline text-lg w-fit">
            Explore DashFlow <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Feature Highlights (Faded) */}
        <div className="flex-1 hidden md:flex flex-col justify-center pl-16">
          <ul className="space-y-2 text-2xl font-medium select-none">
            <li className="text-gray-200">Sprint planning</li>
            <li className="text-gray-200">Real-time sync</li>
            <li className="text-gray-200">Custom workflows</li>
            <li className="text-gray-300">Drag & drop tasks</li>
            <li className="text-gray-300">Role-based access</li>
            <li className="text-gray-300">Task dependencies</li>
            <li className="text-gray-400">Timeline view</li>
            <li className="text-gray-400">Issue tracking</li>
            <li className="text-gray-400">Team chat</li>
            <li className="text-gray-400">Comments & mentions</li>
            <li className="text-gray-400">Notifications</li>
            <li className="text-gray-400">Kanban & Gantt</li>
            <li className="text-gray-200">Analytics & reports</li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                  <h4 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Carousel */}
      <section className="py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Trusted by Industry Leaders
          </h3>
          <CompanyCarousel />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />
      {/* FAQ Section */}
      <section className="w-full bg-white py-20 px-4 flex flex-col items-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Title & Description */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl text-black font-bold mb-4">
              Frequently asked
              <br />
              questions
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
              To help you make informed decisions, we’ve compiled answers to
              some of the most commonly asked questions.
            </p>
          </div>
          {/* Right: FAQ List */}
          <FAQList />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
