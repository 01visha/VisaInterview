import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-6 font-sans">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 text-center border-b">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Privacy Policy</h1>
        </div>
        <div className="p-6 space-y-8">
          <Section
            title="Welcome to CrackVisa’s Pricing Policy"
            content={`About CrackVisa: We are committed to safeguarding the privacy and confidentiality of user data and to complying with stringent legal standards that reflect our respect for your privacy and trust. By accessing and using CrackVisa, you agree to the policies outlined below, detailing how we handle, protect, and use the personal information we collect. This document ensures transparency and empowers users to make informed choices about their data.
            Our Approach to Privacy: At CrackVisa, we believe in clear, honest communication. This Privacy Policy serves as a guide to understanding your rights and our obligations, establishing a foundation of trust as you use our platform and services. `}
          />

          <Section
            title="Legal Framework"
            content={`Compliance with International Data Protection Laws: CrackVisa adheres to global data protection standards to provide security and consistency for users worldwide. Our compliance includes but is not limited to:
            - Information Technology Act, 2000 (India): This law sets the groundwork for the secure handling of electronic information, especially concerning personal data protection and privacy, forming the basis of our domestic legal compliance.
            - General Data Protection Regulation (GDPR): For users within the EU, GDPR governs the collection, use, and storage of personal information, upholding individuals' rights to privacy and data protection, including rights to access, correction, and deletion.
            - Data Protection Principles: We follow internationally recognized data protection principles, including transparency, purpose limitation, data minimization, and accountability, ensuring that your information is processed lawfully, fairly, and transparently.

            User Rights Under GDPR and Other Applicable Laws:
            - Right to Access: You can request details of your personal data and how it is processed.
            - Right to Rectification: You have the right to correct inaccuracies or complete incomplete information.
            - Right to Erasure: In certain circumstances, you can request the deletion of your data.
            - Right to Restriction of Processing: You can limit the way your data is used under certain conditions.
            - Right to Data Portability: You can request your data in a structured, commonly used format.
            - Right to Object: You may object to certain types of data processing, including direct marketing.`}
          />

          <Section
            title="Information We Collect"
            content={`CrackVisa collects several types of information to provide, personalize, and improve our services. The data we gather includes:
            - Personal Identification Details: Information such as your name, gender, email address, username, and contact information, allowing us to verify identity, facilitate account access, and communicate effectively.
            - Financial and Transaction Data: Payment details, billing addresses, and transaction histories necessary to process payments securely. Financial information is processed through compliant third-party payment gateways.
            - Company and Business Information: For business accounts, we collect details like company name, GST number, office address, and key contacts to authenticate business entities and tailor service offerings.
            - User-Generated Content: Comments, reviews, and other content you share publicly within the platform, along with any private messages sent to other users.
            - Third-Party Account Data: Data from authorized third-party platforms (e.g., Google, social media) linked to your CrackVisa account.
            - Device and Location Information: Device-specific data (IP address, operating system, browser type) and general geographic location data to improve security and user experience.
            - Communication Logs: Records of interactions with our customer support team to ensure high-quality support and service improvement.
            - Sensitive Personal Information: Sensitive data is collected only when necessary and with your explicit consent.`}
          />

          <Section
            title="How We Use Your Information"
            content={`Your data enables us to deliver and enhance CrackVisa’s services, ensuring a seamless and personalized experience. The key uses of data include:
            - Core Service Operations: We use your data to create and manage your account, facilitate transactions, respond to inquiries.
            - Personalized User Experience: Data is used to recommend relevant content, guide you and offer strategic insights for better outcomes.
            - Communications and Notifications: We send important updates, newsletters, or responses to inquiries, ensuring that you’re informed about platform developments and consulting opportunities.
            - Marketing and Promotions: Your data allows us to present offers, deals, and recommendations aligned with your interests. You can opt out of marketing communications at any time.
            - Data Analytics and Performance Optimization: Usage data helps us improve platform functionality, address technical issues, and optimize user engagement.
            - Security and Fraud Prevention: We analyze data to prevent fraudulent activities, safeguard user accounts, and uphold platform integrity.
            - Legal Compliance and Risk Management: Your data is used to meet regulatory requirements, conduct audits, and manage potential risks effectively.`}
          />

          <Section
            title="Sharing Your Information"
            content={`CrackVisa shares your information only under specific circumstances and with strict data protection controls:
            - Business Transfers: If CrackVisa undergoes a merger, acquisition, or asset sale, user data may be transferred to the acquiring entity under confidentiality obligations.
            - Service Providers and Business Partners: We work with vetted service providers (e.g., cloud storage, payment processors) to support essential services.
            - Law Enforcement and Legal Requests: We may disclose information in response to lawful requests from public authorities in compliance with applicable laws.
            - No Unauthorized Data Sharing: We never sell or share your data with unauthorized third parties for marketing purposes without explicit user consent.`}
          />

          <Section
            title="Security of Your Data"
            content={`We implement comprehensive security measures to protect your information, including:
            - Data Encryption: Sensitive data is encrypted during transmission and at rest.
            - Secured Storage Facilities: User data is stored on secure servers.
            - Access Controls and Monitoring: We enforce strict access controls and regularly monitor our systems.`}
          />

          <Section
            title="Retention of Your Information"
            content={`We retain your data for as long as necessary to provide services or as required by law. We periodically review the data we hold, and if it’s no longer needed, we securely dispose of it.`}
          />

          <Section
            title="Your Privacy Rights"
            content="As a user, you have certain rights over your personal data, including access, rectification, deletion, and the right to opt-out of direct marketing."
          />

          <Section
            title="Children’s Privacy"
            content="CrackVisa does not knowingly collect data from children under the age of 13. If we learn that a child under 13 has provided personal information, we will take steps to delete it."
          />

          <Section
            title="Changes to This Privacy Policy"
            content="We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of significant changes via email or platform notifications."
          />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, content }) => (
  <section className="border-b border-gray-200 pb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-600 whitespace-pre-line">{content}</p>
  </section>
);

export default PrivacyPolicy;
