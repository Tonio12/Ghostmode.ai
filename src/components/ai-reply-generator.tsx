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
import { Loader2 } from 'lucide-react';

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
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="text-lg font-medium">Generate AI Reply</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Tone</label>
        {!showCustomTone ? (
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((toneOption) => (
                <SelectItem key={toneOption.value} value={toneOption.value}>
                  {toneOption.label}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom Tone...</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="space-y-2">
            <Textarea
              placeholder="Describe your custom tone (e.g., 'playful but professional')"
              value={customTone}
              onChange={(e) => setCustomTone(e.target.value)}
              className="h-20"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCustomTone(false)}
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
          className="w-full"
        >
          Describe Custom Tone
        </Button>
      )}
      
      <Button 
        onClick={generateReply} 
        disabled={isGenerating || (!tone && !customTone)}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Reply...
          </>
        ) : (
          'Generate AI Reply'
        )}
      </Button>
    </div>
  );
} 