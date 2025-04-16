'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';

// List of available tones
const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'empathetic', label: 'Empathetic' },
  { value: 'apologetic', label: 'Apologetic' },
  { value: 'direct', label: 'Direct and Brief' }
];

interface AIReplyGeneratorProps {
  emailContent: string;
  onReplyGenerated: (reply: string) => void;
}

export function AIReplyGenerator({ emailContent, onReplyGenerated }: AIReplyGeneratorProps) {
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTone, setCustomTone] = useState('');
  const [showCustomTone, setShowCustomTone] = useState(false);

  const generateReply = async () => {
    try {
      setIsGenerating(true);
      
      const selectedTone = showCustomTone ? customTone : tone;
      
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          emailContent,
          tone: selectedTone
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate reply');
      }

      const data = await response.json();
      onReplyGenerated(data.reply);
      toast.success('AI reply generated successfully!');
    } catch (error) {
      console.error('Error generating reply:', error);
      toast.error('Failed to generate reply. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      className="space-y-5 rounded-lg border p-6 bg-gradient-to-br from-background to-primary/5 relative overflow-hidden shadow-sm"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-0 right-0 size-24 bg-primary/5 rounded-bl-full -mr-6 -mt-6 opacity-70" />

      <div className="flex items-center">
        <Wand2 className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-medium">Generate AI Reply</h3>
      </div>
      
      <div className="space-y-3">
        <label className="text-sm font-medium flex items-center">
          <Sparkles className="h-4 w-4 text-primary mr-1.5" />
          Select Tone
        </label>
        {!showCustomTone ? (
          <Select 
            value={tone} 
            onValueChange={setTone}
            disabled={isGenerating}
          >
            <SelectTrigger className="w-full bg-background border-primary/20 focus:ring-primary/20">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent className="max-h-[280px]">
              {TONES.map((toneOption) => (
                <SelectItem 
                  key={toneOption.value} 
                  value={toneOption.value}
                  className="hover:bg-primary/10 focus:bg-primary/10 transition-colors"
                >
                  {toneOption.label}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom Tone...</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="space-y-3">
            <Textarea
              placeholder="Describe your custom tone (e.g., 'playful but professional')"
              value={customTone}
              onChange={(e) => setCustomTone(e.target.value)}
              className="h-20 bg-background resize-none border-primary/20 focus-visible:ring-primary/20"
              disabled={isGenerating}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCustomTone(false)}
              disabled={isGenerating}
              className="border-primary/20 hover:bg-primary/10 hover:text-primary"
            >
              Use Preset Tone
            </Button>
          </div>
        )}
      </div>

      {tone === 'custom' && !showCustomTone && (
        <Button 
          variant="outline" 
          onClick={() => setShowCustomTone(true)}
          className="w-full border-primary/20 hover:bg-primary/10 hover:text-primary"
          disabled={isGenerating}
        >
          Describe Custom Tone
        </Button>
      )}
      
      <Button 
        onClick={generateReply} 
        disabled={isGenerating || (!tone && !customTone)}
        className="w-full bg-primary/90 hover:bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Reply...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Reply
          </>
        )}
      </Button>
    </motion.div>
  );
} 