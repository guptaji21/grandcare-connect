import { Shield, Users, Star, Clock } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'Background Checked',
      description: 'All caregivers undergo thorough background checks'
    },
    {
      icon: Users,
      title: 'Experienced Couples',
      description: 'Years of childcare experience and references'
    },
    {
      icon: Star,
      title: 'Verified Reviews',
      description: 'Real reviews from satisfied parents'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Available when you need them most'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Parents Trust GrandCare Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {badge.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
