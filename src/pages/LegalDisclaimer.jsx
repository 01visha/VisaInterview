import React from 'react';
import { FaInfoCircle, FaBalanceScale, FaExclamationTriangle, FaLink, FaGavel, FaUserTie, FaEdit, FaShieldAlt } from 'react-icons/fa';

const LegalDisclaimer = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-6 font-sans">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 text-center border-b">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Legal Disclaimer</h1>
        </div>
        <div className="p-6 space-y-8">
          <Section
            icon={<FaInfoCircle />}
            title="General Information"
            points={[
              "Information provided is for general informational purposes only and not intended as legal advice.",
              "Content should not be relied upon as legal advice or as a substitute for obtaining legal advice from a licensed attorney.",
              "Visa application processes and requirements can vary widely depending on individual circumstances and jurisdiction.",
              "We strongly recommend consulting with a qualified immigration attorney or legal professional for advice tailored to your specific situation.",
              "Results or outcomes described are not guaranteed and may vary based on individual cases.",
              "Every case is unique, and results obtained will depend on the facts and merits of that particular case.",
              "All information is provided in good faith, but we make no representation or warranty regarding its accuracy, adequacy, validity, reliability, availability, or completeness."
            ]}
          />
          <Section
            icon={<FaBalanceScale />}
            title="Professional Advice Disclaimer"
            points={[
              "This website does not provide legal advice.",
              "Nothing contained herein shall be construed as legal advice.",
              "All information provided is for educational and informational purposes only.",
              "For specific legal advice, consult a qualified immigration attorney or legal professional.",
              "Your use of this website or any interaction via this website does not establish an attorney-client relationship.",
              "Every legal matter is unique, and outcomes can vary based on the specifics of each situation.",
              "Seek the advice of a qualified attorney with any questions regarding your legal situation."
            ]}
          />
          <Section
            icon={<FaExclamationTriangle />}
            title="No Guarantees"
            points={[
              "We cannot guarantee that the information on this site will be accurate, complete, or current.",
              "Use of the information on this website is at your own risk.",
              "We will not be liable for any errors or omissions in this information nor for its availability.",
              "We cannot guarantee results or outcomes from any information provided.",
              "Each visa application and immigration case is unique, and results will vary based on specific facts and merits.",
              "We do not guarantee the accuracy, completeness, or usefulness of the information available.",
              "Information provided is subject to change without notice."
            ]}
          />
          <Section
            icon={<FaLink />}
            title="Third-Party Links"
            points={[
              "This website may contain links to third-party websites or content.",
              "External links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.",
              "We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.",
              "We have no control over the nature, content, and availability of linked sites.",
              "The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them."
            ]}
          />
          <Section
            icon={<FaGavel />}
            title="Not Affiliated with Government Agencies"
            points={[
              "We are a private entity and are not affiliated with any government agency.",
              "We do not provide legal representation or services.",
              "Any reliance you place on the information provided by this website is strictly at your own risk.",
              "Our services and website are not endorsed by, or associated with, any government agency.",
              "For official guidance and information, visit the official website of the relevant government authority."
            ]}
          />
          <Section
            icon={<FaUserTie />}
            title="No Attorney-Client Relationship"
            points={[
              "Your use of this website does not create an attorney-client relationship between you and our company or any of its representatives.",
              "Submission of any inquiry or receipt of any response does not establish an attorney-client relationship.",
              "Do not send confidential or time-sensitive information through this website.",
              "Any communication sent through this website may not be treated as privileged or confidential.",
              "Confidential or time-sensitive information should not be sent through this website or via email."
            ]}
          />
          <Section
            icon={<FaEdit />}
            title="Changes and Amendments"
            points={[
              "We reserve the right to modify, amend, or change these terms at any time without prior notice.",
              "Your continued use of the website after any changes signifies your acceptance of the updated terms.",
              "It is your responsibility to regularly check this page for any modifications."
            ]}
          />
          <Section
            icon={<FaShieldAlt />}
            title="Limitations of Liability"
            points={[
              "We will not be liable for any loss or damage including without limitation, indirect or consequential loss or damage.",
              "We are not liable for any loss or damage arising from loss of data or profits in connection with the use of this website.",
              "We have no control over the nature, content, and availability of linked sites.",
              "The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them."
            ]}
          />
        </div>
        <div className="p-6 border-t text-center text-gray-600">
          <p>By using this website, you agree to these terms and conditions. If you have any concerns or questions, please contact us directly for further clarification.</p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ icon, title, points }) => (
  <section className="border-b border-gray-200 pb-6">
    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
      <span className="mr-3 text-blue-600">{icon}</span>
      {title}
    </h2>
    <ul className="list-disc list-inside text-gray-600 space-y-2">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </section>
);

export default LegalDisclaimer;

