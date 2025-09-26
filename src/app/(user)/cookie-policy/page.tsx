import Navbar from '@/components/user/NavBar';
import Footer from '@/components/user/Footer';

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 pt-20 pb-8 min-h-screen bg-white text-gray-900">
        <h1 className="text-4xl font-bold mb-6 text-center text-orange-600">Cookie Policy</h1>
        <p className="text-center text-gray-600 mb-12">Last updated: September 26, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
          <p className="leading-relaxed">
            Cookies are small text files that are stored on your device by websites you visit. They help websites remember your actions and preferences (such as login, language, and other display preferences) over a period of time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p className="leading-relaxed mb-4">
            At Alpran HR Services, we use cookies to enhance your user experience, analyze site traffic, and provide personalized content and ads. These cookies enable us to understand how you interact with our services and improve our platform accordingly.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Essential Cookies:</strong> Required for website functionality and security.</li>
            <li><strong>Performance Cookies:</strong> Help us monitor site performance and usage.</li>
            <li><strong>Functionality Cookies:</strong> Remember your preferences for an improved experience.</li>
            <li><strong>Marketing Cookies:</strong> Deliver relevant advertising based on your interests.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
          <p className="leading-relaxed">
            We may allow third-party providers to set cookies on our site for analytics and advertising purposes. These providers have their own privacy policies and controls.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p className="leading-relaxed mb-4">
            You can control or disable cookies by adjusting your browser settings. Note that disabling essential cookies may affect the usability of some features on our site.
          </p>
          <p>
            For more information on managing cookies, please visit <a href="https://www.allaboutcookies.org" className="text-orange-600 underline" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised date.
          </p>
        </section>

        <section className="mt-12 text-center">
          <p className="mb-4">
            If you have any questions about our use of cookies, please contact us at:
          </p>
          <p className="font-medium text-orange-600 mb-1">Email: privacy@alpranhrservices.com</p>
          <p className="font-medium text-orange-600 mb-1">Phone: +91 98399 55309</p>
          <p className="font-medium text-orange-600">Address: Alpran Software Pvt Ltd, Mahmoorganj, Varanasi - 221010</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
