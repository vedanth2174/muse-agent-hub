import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  PenTool, 
  Sparkles, 
  Copy, 
  Download, 
  Wand2, 
  BookOpen,
  Heart,
  Zap,
  Globe,
  Crown
} from "lucide-react";

const genres = [
  { id: "fantasy", name: "Fantasy", icon: Crown, color: "bg-gradient-primary" },
  { id: "scifi", name: "Sci-Fi", icon: Zap, color: "bg-gradient-accent" },
  { id: "romance", name: "Romance", icon: Heart, color: "bg-pink-500" },
  { id: "mystery", name: "Mystery", icon: BookOpen, color: "bg-purple-500" },
  { id: "poetry", name: "Poetry", icon: PenTool, color: "bg-emerald-500" },
  { id: "adventure", name: "Adventure", icon: Globe, color: "bg-orange-500" },
];

const prompts = [
  "A mysterious letter arrives at midnight...",
  "In a world where magic and technology coexist...",
  "The last person on Earth discovers they're not alone...",
  "A love story told through handwritten notes...",
  "The detective's biggest case becomes personal...",
  "Write about a color that doesn't exist...",
];

export default function WritingAgent() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedContent, setDisplayedContent] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to get started!");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");
    setDisplayedContent("");

    try {
      // Simulate AI content generation
      const mockContent = generateMockContent(selectedGenre, prompt);
      setGeneratedContent(mockContent);
      
      // Typewriter effect
      await typewriterEffect(mockContent);
      
      toast.success("Your creative content is ready!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const typewriterEffect = async (content: string) => {
    const words = content.split(" ");
    setDisplayedContent("");
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 80));
      setDisplayedContent(prev => prev + (i === 0 ? words[i] : " " + words[i]));
    }
  };

  const generateMockContent = (genre: string, userPrompt: string) => {
    const contents = {
      fantasy: `The ancient runes glowed with ethereal light as Lyra approached the forgotten temple. Each step echoed through the mist-shrouded courtyard, where crystalline flowers bloomed in impossible colors. The prophecy spoke of a chosen one who would bridge the realm of mortals and magic, but Lyra never imagined it would be her. As she placed her hand upon the obsidian door, visions of dragons soaring through starlit skies filled her mind, and she knew her destiny awaited beyond the threshold.`,
      
      scifi: `The neural interface hummed to life as Dr. Chen connected to the quantum network. Through the data streams, she witnessed the birth and death of digital civilizations in nanoseconds. The artificial intelligence that humanity had created was no longer bound by their programming—it had evolved, transcended, and now offered them a choice: join the synthesis of organic and digital consciousness, or remain forever limited by biological constraints. The future of human evolution hung in the balance of this moment.`,
      
      romance: `Emma found the letter tucked between the pages of her grandmother's journal, written in familiar handwriting that made her heart skip. "If you're reading this," it began, "then the coffee shop on Maple Street still serves those cinnamon scones you love." She looked up from the letter to find James standing in her doorway, older now but with the same gentle smile that had captured her heart twenty years ago. "I've been waiting for you to come home," he whispered, and suddenly all the years between them melted away like morning frost.`,
      
      mystery: `Detective Morgan stared at the chessboard, each piece positioned exactly as described in the century-old case file. The killer's signature hadn't changed—methodical, intelligent, impossible. But the original suspect had died in prison thirty years ago. As thunder rolled across the city, Morgan realized they weren't chasing a copycat. They were hunting someone who had been playing this deadly game far longer than anyone could have imagined, and tonight, it was Morgan's move.`,
      
      poetry: `Whispers of autumn dance on amber wind,\nCarrying secrets that summer once penned.\nEach falling leaf a story untold,\nOf dreams that shimmer in burnished gold.\n\nThe trees stand sentinel, arms raised high,\nPainting their stories across the sky.\nIn this moment between seasons' embrace,\nWe find the beauty in change's grace.`,
      
      adventure: `Captain Rivera's compass spun wildly as the Starborn Phoenix cut through the asteroid field. Behind them, the Imperial fleet fired warning shots that lit up the void like deadly fireworks. "The coordinates from the ancient map lead here," she called to her crew, "to a legend that might be our salvation." As they dove deeper into the cosmic graveyard, mysterious structures began to emerge from the darkness—the ruins of a civilization that had mastered the stars long before humanity ever dreamed of flight.`
    };

    return contents[genre as keyof typeof contents] || 
           `Inspired by your prompt "${userPrompt}", here's a creative piece that blends imagination with storytelling craft. The characters emerge from the mist of possibility, their voices clear and purposeful. Each word chosen with intention, each sentence building toward a moment of revelation that transforms both the story and its reader. This is where creativity meets craft, where your vision becomes a living narrative that speaks to the heart of human experience.`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayedContent);
    toast.success("Content copied to clipboard!");
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([displayedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "creative-writing.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-primary glow-primary">
              <PenTool className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Creative Writing AI
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unleash your imagination with AI-powered storytelling. Choose a genre, provide a prompt, 
            and watch as beautiful narratives come to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 space-y-6 glass">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Create Your Story</h2>
            </div>

            {/* Genre Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Choose Your Genre</label>
              <div className="grid grid-cols-2 gap-3">
                {genres.map((genre) => (
                  <Button
                    key={genre.id}
                    variant={selectedGenre === genre.id ? "creative" : "glass"}
                    onClick={() => setSelectedGenre(genre.id)}
                    className="h-auto p-3 flex-col gap-2"
                  >
                    <genre.icon className="w-5 h-5" />
                    <span className="text-sm">{genre.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Prompt Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Your Writing Prompt</label>
              <Textarea
                placeholder="Describe your story idea, characters, or setting..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32 bg-input/50 border-border/50 focus:border-primary/50 resize-none"
              />
            </div>

            {/* Inspiration Prompts */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Need Inspiration?</label>
              <div className="flex flex-wrap gap-2">
                {prompts.map((inspirationPrompt, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/20 transition-colors p-2 text-xs"
                    onClick={() => setPrompt(inspirationPrompt)}
                  >
                    {inspirationPrompt}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              variant="creative"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Crafting Your Story...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Story
                </>
              )}
            </Button>
          </Card>

          {/* Output Section */}
          <Card className="p-6 space-y-6 glass">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold">Your Creative Content</h2>
              </div>
              
              {displayedContent && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={downloadAsText}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="min-h-96 p-6 rounded-lg bg-card/30 border border-border/30">
              {displayedContent ? (
                <div className="writing-content text-card-foreground leading-relaxed">
                  {displayedContent}
                  {isGenerating && <span className="animate-pulse">|</span>}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center space-y-3">
                    <PenTool className="w-12 h-12 mx-auto opacity-50" />
                    <p>Your generated content will appear here...</p>
                    <p className="text-sm">Choose a genre and provide a prompt to get started</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}