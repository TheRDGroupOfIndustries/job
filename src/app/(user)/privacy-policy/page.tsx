"use client";
import Navbar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const PrivacyPolicyPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="container mx-auto px-4 pt-20 pb-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-center my-8">Privacy Policy</h1>
        <p className="text-center text-gray-600 mb-12">
          Last updated: September 26, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            At Alpran Software Pvt Ltd, we are committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and
            safeguard your personal information when you use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Personal identification information (name, email, phone number,
              etc.)
            </li>
            <li>Demographic information (age, gender, location, etc.)</li>
            <li>
              Professional information (resume, work experience, education,
              etc.)
            </li>
            <li>Usage data and website analytics</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use your information to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Provide and maintain our services</li>
            <li>
              Process job applications and match candidates with opportunities
            </li>
            <li>Send you updates, newsletters, and marketing communications</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            4. Data Sharing and Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>Potential employers (for job applications)</li>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners in connection with our services</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We do not sell our personal information to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Access your personal information</li>
            <li>Correct inaccuracies in your information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the &quot;last updated&quot; date.
          </p>
        </section>

        <section className="text-center mt-12 mb-20">
          <p className="text-gray-700 text-lg mb-4">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <p className="text-gray-800 text-xl font-medium mb-2">
            Email: privacy@alpranhrservices.com
          </p>
          <p className="text-gray-800 text-xl font-medium mb-2">
            Phone: +91 98399 55309
          </p>
          <p className="text-gray-800 text-xl font-medium mb-6">
            Address: Alpran Software Pvt Ltd, Mahmoorganj, Varanasi - 221010
          </p>
          <Button
            className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => router.push("/contact")}
          >
            Contact Us
          </Button>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
