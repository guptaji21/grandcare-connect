import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'San Francisco, CA',
      rating: 5,
      text: 'GrandCare Connect has been a lifesaver! The elderly couple we found through the platform treats our 4-year-old like their own grandchild. They\'re reliable, experienced, and so loving.'
    },
    {
      name: 'Michael Chen',
      location: 'Austin, TX',
      rating: 5,
      text: 'As working parents, finding trustworthy childcare was our biggest challenge. The background-checked couples on this platform give us complete peace of mind. Highly recommended!'
    },
    {
      name: 'Emily Rodriguez',
      location: 'Miami, FL',
      rating: 5,
      text: 'The matching system is incredible - it found us the perfect caregivers who speak Spanish and understand our cultural values. Our kids love spending time with them.'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Parents Are Saying
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from families who trust GrandCare Connect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
