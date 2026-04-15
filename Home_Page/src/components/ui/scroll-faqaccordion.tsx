"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface ScrollFAQAccordionProps {
  data: FAQItem[];
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export default function ScrollFAQAccordion({
  data,
  className,
  questionClassName,
  answerClassName,
}: ScrollFAQAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const handleToggle = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <div className={cn("max-w-4xl mx-auto text-center py-16", className)}>
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-chip border border-[#C2410C]/20 bg-[#C2410C]/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C2410C]">
            FAQ
          </span>
        </div>
        <h2 className="text-4xl md:text-h2 font-display font-bold text-[#FAF3E0] mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-[#C9A87C]/80 max-w-xl mx-auto text-body">
          Find answers to common questions about HealthTracker, our features, and how we keep your data safe.
        </p>
      </div>

      {/* Accordion */}
      <Accordion.Root type="single" collapsible value={openItem || ""}>
        {data.map((item) => (
          <Accordion.Item
            value={item.id.toString()}
            key={item.id}
            className="mb-4"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className="flex w-full items-center justify-between gap-x-4 cursor-pointer group"
                onClick={() => handleToggle(item.id.toString())}
              >
                {/* Question pill */}
                <div
                  className={cn(
                    "relative flex items-center space-x-3 rounded-xl px-5 py-3 transition-all duration-500",
                    openItem === item.id.toString()
                      ? "bg-[#C2410C]/15 text-[#FAF3E0] border border-[#C2410C]/30"
                      : "bg-[#1E1E1E] text-[#C9A87C] border border-[#C9A87C]/10 group-hover:border-[#C2410C]/20",
                    questionClassName
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "absolute bottom-6",
                        item.iconPosition === "right"
                          ? "right-0"
                          : "left-0"
                      )}
                      style={{
                        transform:
                          item.iconPosition === "right"
                            ? "rotate(7deg)"
                            : "rotate(-4deg)",
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="font-semibold text-sm text-left">
                    {item.question}
                  </span>
                </div>

                {/* Plus/Minus icon */}
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border",
                    openItem === item.id.toString()
                      ? "bg-[#C2410C] border-[#C2410C] text-[#FAF3E0]"
                      : "bg-transparent border-[#C9A87C]/30 text-[#C9A87C] group-hover:border-[#C2410C]/50 group-hover:text-[#C2410C]"
                  )}
                >
                  {openItem === item.id.toString() ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content asChild forceMount>
              <motion.div
                initial="collapsed"
                animate={
                  openItem === item.id.toString() ? "open" : "collapsed"
                }
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="flex justify-end ml-7 mt-3 md:ml-16">
                  <div
                    className={cn(
                      "relative max-w-md rounded-2xl px-5 py-3 text-sm text-left leading-relaxed",
                      "bg-[#3D2314] text-[#FAF3E0]/90 border border-[#C2410C]/20",
                      answerClassName
                    )}
                  >
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
