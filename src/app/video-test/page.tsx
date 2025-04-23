'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VideoTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8">
      <h1 className="text-2xl font-bold">Video Test Page</h1>
      
      <div className="max-w-4xl w-full">
        <h2 className="text-xl mb-2">Using Video Element (MP4):</h2>
        <div className="relative aspect-video bg-black/5 rounded-lg overflow-hidden border">
          <video 
            className="w-full h-full" 
            src="/gmailvideo.mp4" 
            controls 
            autoPlay
            muted
            poster="/images/gmailthumbnail.png"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-4 max-w-4xl w-full">
        <h2 className="text-xl">Video Information:</h2>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
          Video path: /gmailvideo.mp4 (should be in public folder)
          Poster path: /images/gmailthumbnail.png
        </pre>
        
        <h2 className="text-xl mt-4">Troubleshooting Options:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Check browser console for errors</li>
          <li>Ensure video file is in the correct format (MP4 with H.264 codec)</li>
          <li>Try different browser attributes (autoplay, muted, etc.)</li>
          <li>Verify file permissions and CORS settings</li>
        </ul>
      </div>
      
      <Button asChild className="mt-4">
        <Link href="/">
          Return to Home
        </Link>
      </Button>
    </div>
  );
} 