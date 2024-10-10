import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface PromptSelectionProps {
  prompts: string[];
  currentPrompt: string;
  setPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const defaultPrompts = [
  "Explain the concept of quantum computing to a 10-year-old.",
  "Write a short story about a robot learning to feel emotions.",
  "Describe the taste of a food you've never tried before.",
  "How would you solve world hunger using only technology available today?",
  "Create a haiku about the internet.",
];

export const PromptSelection: React.FC<PromptSelectionProps> = ({
  prompts,
  currentPrompt,
  setPrompts,
  setCurrentPrompt,
}) => {
  useEffect(() => {
    if (prompts.length === 0) {
      setPrompts(defaultPrompts);
      setCurrentPrompt(defaultPrompts[0]);
    }
  }, [prompts, setPrompts, setCurrentPrompt]);

  const handlePromptsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompts = e.target.value.split('\n').filter(prompt => prompt.trim() !== '');
    setPrompts(newPrompts);
    if (newPrompts.length > 0 && currentPrompt === '') {
      setCurrentPrompt(newPrompts[0]);
    }
  };

  const loadDefaultPrompts = () => {
    setPrompts(defaultPrompts);
    setCurrentPrompt(defaultPrompts[0]);
  };

  const getRandomPrompt = () => {
    const availablePrompts = prompts.filter(prompt => prompt !== currentPrompt);
    if (availablePrompts.length === 0) return currentPrompt;
    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    return availablePrompts[randomIndex];
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="prompts" className="text-sm font-medium">Enter prompts (one per line):</Label>
        <Button onClick={loadDefaultPrompts} variant="outline" size="sm">Load Default Prompts</Button>
      </div>
      <Textarea
        id="prompts"
        value={prompts.join('\n')}
        onChange={handlePromptsChange}
        className="min-h-[100px]"
        placeholder="Enter your prompts here, one per line"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;
            const newValue = value.substring(0, start) + '\n' + value.substring(end);
            setPrompts(newValue.split('\n').filter(prompt => prompt.trim() !== ''));
            textarea.value = newValue;
            textarea.selectionStart = textarea.selectionEnd = start + 1;
          }
        }}
      />
      <div className="flex justify-between items-center">
        <p className="text-sm">Current Prompt: {currentPrompt}</p>
        <Button onClick={() => setCurrentPrompt(getRandomPrompt())} variant="outline" size="sm">Get Random Prompt</Button>
      </div>
    </div>
  );
};