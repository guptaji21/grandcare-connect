import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Shield, Heart } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Search & Match',
      description: 'Find caregivers in your area using our smart matching algorithm that considers location, availability, experience, and your child\'s needs.'
    },
    {
      icon: Shield,
      title: 'Background Checked',
      description: 'All our caregivers undergo thorough background checks, ID verification, and reference checks to ensure your child\'s safety.'
    },
    {
      icon: Heart,
      title: 'Book & Care',
      description: 'Book your preferred time slot, meet your caregivers, and enjoy peace of mind knowing your child is in loving, experienced hands.'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How GrandCare Connect Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, safe, and secure childcare booking in three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
