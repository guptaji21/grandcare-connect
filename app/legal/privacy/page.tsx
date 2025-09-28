import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
            </p>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
            </p>
            
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2>5. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
            </p>
            
            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
            
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at privacy@grandcareconnect.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
