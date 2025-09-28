import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using GrandCare Connect, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of GrandCare Connect per device for personal, non-commercial transitory viewing only.
            </p>
            
            <h2>3. Disclaimer</h2>
            <p>
              The materials on GrandCare Connect are provided on an 'as is' basis. GrandCare Connect makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2>4. Limitations</h2>
            <p>
              In no event shall GrandCare Connect or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GrandCare Connect, even if GrandCare Connect or a GrandCare Connect authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2>5. Accuracy of materials</h2>
            <p>
              The materials appearing on GrandCare Connect could include technical, typographical, or photographic errors. GrandCare Connect does not warrant that any of the materials on its website are accurate, complete or current.
            </p>
            
            <h2>6. Links</h2>
            <p>
              GrandCare Connect has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by GrandCare Connect of the site.
            </p>
            
            <h2>7. Modifications</h2>
            <p>
              GrandCare Connect may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
            
            <h2>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
