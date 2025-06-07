// FAQList component
"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

function FAQList() {
  const [open, setOpen] = useState(0);
  const faqs = [
    {
      "question": "What is DashFlow?",
      "answer": "DashFlow is a powerful project management tool designed to help teams organize, track, and manage their work efficiently. It combines intuitive design with robust features to streamline your workflow and boost productivity."
    },
    {
      "question": "How does DashFlow compare to other project management tools?",
      "answer": "DashFlow offers a unique combination of intuitive design, powerful features, and flexibility. Unlike other tools, we focus on providing a seamless experience for both agile and traditional project management methodologies, making it versatile for various team structures and project types."
    },
    {
      "question": "Is DashFlow suitable for small teams?",
      "answer": "Absolutely! DashFlow is designed to be scalable and flexible. It works great for small teams and can easily grow with your organization as it expands. Our user-friendly interface ensures that teams of any size can quickly adapt and start benefiting from DashFlow's features."
    },
    {
      "question": "What key features does DashFlow offer?",
      "answer": "DashFlow provides a range of powerful features including intuitive Kanban boards for visualizing workflow, robust sprint planning tools for agile teams, comprehensive reporting for data-driven decisions, customizable workflows, time tracking, and team collaboration tools. These features work seamlessly together to enhance your project management experience."
    },
    {
      "question": "Can DashFlow handle multiple projects simultaneously?",
      "answer": "Yes, DashFlow is built to manage multiple projects concurrently. You can easily switch between projects, and get a bird's-eye view of all your ongoing work. This makes DashFlow ideal for organizations juggling multiple projects or clients."
    },
    {
      "question": "Is there a learning curve for new users?",
      "answer": "While DashFlow is packed with features, we've designed it with user-friendliness in mind. New users can quickly get up to speed thanks to our intuitive interface, helpful onboarding process, and comprehensive documentation."
    }
  ]
  

  return (
    <div className="w-full">
      {faqs.map((item, idx) => (
        <div key={idx} className="border-b">
          <button
            className="w-full flex justify-between items-center py-5 text-left focus:outline-none group"
            onClick={() => setOpen(open === idx ? -1 : idx)}
          >
            <span className="font-semibold text-base md:text-lg text-black">
              {item.question}
            </span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white transition">
              <ArrowRight className="w-5 h-5 text-black" />
            </span>
          </button>
          {open === idx && (
            <div className="pb-5 text-gray-500 text-sm md:text-base pl-1 pr-8">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


export default FAQList;