import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Chat } from "@/components/chat";
import PdfTextExtractor from "@/components/PDF";
import PrePareDataasync from "../scripts/pinecone-prepare-docs";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useToast } from "@/components/ui/use-toast"


export default function Home() {
  
  return (
    <AuroraBackground>
    <main className="relative container p-4 flex min-h-screen flex-col  w-screen">
    <div className=" p-4 flex h-14 items-center justify-between  sticky top-0 z-50 w-full  backdrop-blur">
      <span className="font-bold light:text-black dark:text-[#ffffff] text-4xl">Realtime-NewsGPT </span>
      <DarkModeToggle />
    </div>

      <div>
        <div className="flex flex-col justify-center md:flex-row md:space-x-4 p-4">
          <NewsFeatureCard
            image="/news.webp"
            title="Real-Time News Updates"
            description="Our real-time news GPT service ensures you stay informed about the latest developments as they happen. Experience instant updates on various topics, including politics, tech, sports, and more."
          />
          <NewsFeatureCard
            image="/paper.webp"
            title="Personalized News Experience"
            description="Tailor your news feed to match your interests and preferences. Our platform allows you to customize your news sources and topics, ensuring that you receive content that matters most to you."
          />
          <NewsFeatureCard
            image="/comment.webp"
            title="Interactive Conversations"
            description="Engage in interactive conversations with our AI-powered chat interface to explore news topics further. Ask questions, seek clarifications, or delve deeper into specific stories effortlessly."
          />
        </div>
      </div>
      <div className="flex flex-1 py-4">
        <div className="w-full">
          {/* new */}
          <Chat />
        </div>
      </div>

{/* pdf */}
      <PdfTextExtractor cb={PrePareDataasync}></PdfTextExtractor>
    </main>
    </AuroraBackground>
  );
}

function NewsFeatureCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="mt-16 ">
      <Image
        src={image}
        width={200}
        height={200}
        className="w-16 h-16 m-auto -mb-6"
        alt="logo"
      />
      <div className="max-w-sm overflow-hidden shadow-lg p-8 pt-12 bg-white rounded-lg dark:bg-black dark:text-white hover:shadow-2xl  cursor-pointer hover:ring-2">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
