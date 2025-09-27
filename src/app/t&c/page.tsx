"use client"
import Navbar from '@/components/user/NavBar';
import Footer from '@/components/user/Footer'; 
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-20 pb-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-center my-8">Terms & Conditions</h1>
        <p className="text-center text-gray-600 mb-12">Last updated: September 26, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Alpran Software Pvt Ltd. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Services</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We provide IT training, recruitment, and HR services. All services are subject to availability and may be modified or discontinued at our discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Provide accurate and complete information when registering or using our services</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not use our services for any illegal or unauthorized purpose</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content, including text, graphics, logos, and software, is the property of Alpran Software Pvt 
            Ltd or its licensors and is protected by intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            To the maximum extent permitted by law, Alpran Software Pvt Ltd shall not be liable for any indirect, incidental, 
            special, or consequential damages resulting from the use or inability to use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to modify these terms at any time. Your continued use of our services after changes constitutes acceptance of the new terms.
          </p>
          
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes 
            shall be subject to the exclusive jurisdiction of the courts in Varanasi.
          </p>
        </section>

        <section className="text-center mt-12 mb-20">
          <p className="text-gray-700 text-lg mb-4">
            If you have any questions about this Terms & Conditions, please contact us:
          </p>
          <p className="text-gray-800 text-xl font-medium mb-2">Email: privacy@alpranhrservices.com</p>
          <p className="text-gray-800 text-xl font-medium mb-2">Phone: +91 98399 55309</p>
          <p className="text-gray-800 text-xl font-medium mb-6">Address: Alpran Software Pvt Ltd, Mahmoorganj, Varanasi - 221010</p>
          <Button
                className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => router.push('/contact')}
              >
                Contact Us
              </Button>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;