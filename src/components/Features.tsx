import { 
  MessageSquare, 
  Shield, 
  Clock, 
  MessageCircle} from 'lucide-react';

const features = [
  {
    name: 'AI Message Replier',
    description:
      'Get AI-crafted responses to overwhelming messages in your preferred tone. Paste any message, choose a tone, and get a reply you can use.',
    icon: MessageSquare,
  },
  {
    name: 'Boundary Setter Templates',
    description:
      'Quick, pre-written responses to set healthy boundaries. Use templates like "Hey, I need a little space right now. Nothing personal 💛" or customize your own.',
    icon: Shield,
  },
  {
    name: 'Scheduled Auto-Replies',
    description:
      'Set up automatic responses based on your schedule. Connect to Telegram and choose when and how Ghostmode replies automatically.',
    icon: Clock,
  },
  {
    name: 'Tone Coach',
    description:
      'Get AI suggestions to improve your message tone. Paste your draft and get suggestions like "Make this sound more confident" or "Soften this a little".',
    icon: MessageCircle,
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-accent">Set Healthy Boundaries</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            Features that give you space to breathe
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            Ghostmode.ai helps you set healthy boundaries and manage overwhelming messages with AI-powered tools.
            No guilt. Just space to breathe.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
