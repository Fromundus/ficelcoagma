import Page from '../components/ui/Page'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <Page className='flex items-center justify-center'>
      <Card className='max-w-xl w-full mx-auto' childrenClassName='p-6 flex flex-col gap-6' title='Data Privacy Policy'>
        <div className='w-full'>
          <p className="mb-6 text-graphite text-sm">
            Effective Date: August 1, 2025
          </p>

          <section className="mb-8">
            <h2 className="font-semibold mb-2">1. Information We Collect</h2>
            <div className='text-sm text-graphite'>
              <p className="mb-2">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Personal Identification Information (e.g., name, email, phone)</li>
                <li>Personal Documents</li>
                {/* <li>Technical Data (e.g., IP address, browser, device info)</li> */}
                {/* <li>Payment Information (if applicable)</li> */}
                <li>User-Provided Content</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-semibold mb-2">2. How We Use Your Information</h2>
            <div className='text-sm text-graphite'>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and improve our services</li>
                <li>To process transactions and send updates</li>
                <li>To respond to inquiries and support requests</li>
                <li>To send promotional emails (with consent)</li>
                <li>To comply with legal requirements</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-semibold mb-2">3. Sharing and Disclosure</h2>
            <div className='text-sm text-graphite'>
              <p className="mb-2">We do not sell your data. We may share data with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Service providers (e.g., hosting, analytics)</li>
                <li>Legal authorities if required by law</li>
                <li>Third parties in a business transfer</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-semibold mb-2">4. Your Rights</h2>
            <div className='text-sm text-graphite'>
              <p className="mb-2">You may have rights to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access and correct your personal data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-semibold mb-2">5. Contact Us</h2>
            <div className='text-sm text-graphite'>
              <p className="mb-2">
                If you have questions, contact us at:
              </p>
              <p>Email: <a href="mailto:johncarlcastrocueva@gmail.com" className="text-blue-600 hover:underline">johncarlcastrocueva@gmail.com</a></p>
              <p>Phone: 09605510756</p>
              <p>Address: Salvacion, Panganiban, Catanduanes</p>
            </div>
          </section>

          <p className="text-sm text-graphite">Last updated: August 1, 2025</p>
        </div>
        <Button className='bg-primary text-white' onClick={() => navigate('/online')}>
          Continue
        </Button>
      </Card>
    </Page>
  )
}

export default PrivacyPolicy
