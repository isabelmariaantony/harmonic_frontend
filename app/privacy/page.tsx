export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-indigo">
        <p className="text-gray-600 mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          We collect information that you provide directly to us, including but not limited to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Name and contact information</li>
          <li>Account credentials</li>
          <li>Profile information</li>
          <li>Study session data</li>
          <li>Communication preferences</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Provide and maintain our services</li>
          <li>Improve user experience</li>
          <li>Communicate with you about our services</li>
          <li>Ensure platform security</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">3. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">4. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to data processing</li>
          <li>Data portability</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">5. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about this Privacy Policy, please contact us through our Contact page.
        </p>
      </div>
    </div>
  );
} 