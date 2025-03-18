import React from "react";
import {
  FaInfoCircle,
  FaFileContract,
  FaLock,
  FaShieldAlt,
  FaUserAlt,
  FaGavel,
  FaRegCopy,
  FaExclamationTriangle,
  FaLink,
  FaBan,
  FaExclamationCircle,
} from "react-icons/fa";
import {
  MdOutlineWeb,
  MdOutlineAccountCircle,
  MdPayment,
} from "react-icons/md";
import {
  FaUserSecret,
  FaComments,
  FaPhoneAlt,
  FaEnvelope,
  FaCookieBite,
  FaMapPin,
  FaUserShield,
} from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { GiBangingGavel } from "react-icons/gi";
const TermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-6 font-custom">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Terms and Conditions
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-12 p-6">
          {/* Acceptance of Terms Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <MdOutlineWeb className="mr-3" /> Use Of Platform:
              </h2>
            </div>
            <p className="text-gray-600 mt-4 ">
              Welcome to www.crackvisa.com. Crackvisa is operated by Shubhangee
              ChocoSoft and operated under a company incorporated under the
              provision of the Comp Act, 2013 with its registered office at 206,
              Maharshee Mrunal Apartments 2, Bhende Layout, Swawalambi
              Nagar,Nagpur - 440012. Maharashtra. India. You may be accessing
              our site from a computer / mobile phone device (through IOS/
              Android, for example) and these Terms of Use govern your use of
              our site and your use of our site and your conduct, regardless of
              means of access. The platform will only be used for personal and
              non-commercial use and information. Your use of services shall be
              governed by these terms and conditions (hereinafter “Terms of
              Use”) along with privacy policy, payment policy, and legal
              disclaimer. By merely accessing/using the platform, you are
              acknowledging without limitation or qualification, to be bound by
              these Terms of Use and policies, whether you have read it or not.
              “Accessing browsing or otherwise using the platform indicates your
              unconditional agreement to all the terms and conditions in this
              agreement so please read this agreement carefully before
              proceeding.” You do not agree to any of the terms enumerated in
              the terms of use or the policies, please do not use the platform.
              You are responsible for ensuring that your access to this platform
              and the material available here are legal in each jurisdiction, in
              order through which you access or view the platform or such
              material. Crackvisa reserves the unilateral right to change the
              particulars of the terms of use or the policies from time to time
              and at any time without notice to its users and in its sole
              discretion. Any change/ modification to the terms of use and
              policies will be effective immediately from the date of such
              upload to the site. Your continued use of the platform following
              the modifications to the terms of use and policies constitutes
              your acceptance of the modified terms of use and policies.
            </p>
          </section>

          {/* Changes to Terms Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FaUserSecret className="mr-3" /> Privacy Practices
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              We understand the importance of safeguarding your personal
              information and we have formulated a privacy policy, to ensure
              that your personal information is protected. Apart from these
              terms of use the privacy policy shall also govern your visit and
              use of the site.
            </p>
          </section>

          {/* Use of the Website Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <MdOutlineAccountCircle className="mr-3" /> Your Account
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mt-4">
              <li>
                This site is directed to be used by adults only. We assume that
                any minor, if at all, accessing our site is under the
                supervision of their guardians. Crackvisa or its associates do
                not knowingly collect information from minors. You will be
                restricting access to your computer, and you hereby accept
                responsibility for all activities that occur under your account
                and password. You acknowledge that the information you provide,
                in any manner whatsoever, is not confidential/proprietary and
                does not infringe any rights of a third party in any way.
              </li>

              <li>
                If you know or have reasons to believe that the security of your
                account has been breached, you should contact us immediately at
                the contact info provided below. If we find a breach or
                suspected breach of your account's security, we may require you
                to change your password, temporarily/permanently block, or
                suspend your account without any liability to Crackvisa.
              </li>

              <li>
                We reserve the right to refuse service and/or terminate accounts
                without prior notice if these terms of use are violated or if we
                decide, in our sole discretion, that it would be in Crackvisa’s
                best interest to do so. You are solely responsible for all
                content that you upload, post, email, or otherwise transmit via
                the site. The information provided to us shall be maintained in
                accordance with our privacy policy.
              </li>
            </ul>
          </section>

          {/* Intellectual Property Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <MdPayment className="mr-3" /> Mode of Payment
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>
                  Payment for the services on the site may be made in the
                  following ways:
                </li>
                <li>
                  Payments can be made by{" "}
                  <span className="font-semibold">
                    credit cards, debit cards, net banking, wallets, and UPI.
                  </span>
                </li>
                <li>
                  <span className="font-semibold">
                    Credit card, debit card, net banking, and UPI
                  </span>{" "}
                  are instant payment options and are recommended to ensure
                  faster processing of your order.
                </li>
              </ul>
            </p>
          </section>

          {/* User Accounts Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FaComments className="mr-3" /> Chat/Call Functionality
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>
                  The chat/call functionality has been provided to help you with
                  all site-related queries. Any use of this service shall be
                  subjected to the following conditions:
                </li>
                <li>
                  <span className="font-semibold">Crackvisa</span> may suspend
                  the chat/call service at any time without notice.
                </li>
                <li>
                  <span className="font-semibold">
                    Crackvisa or its executives
                  </span>{" "}
                  are not responsible for any delay caused in attending to or
                  replying to queries via chat/call.
                </li>
                <li>
                  Crackvisa may store communication through chat/call for future
                  reference, and users of this service will not have the right
                  to access such information at a later date.
                </li>
                <li>
                  While ‘Chatting/Calling,’ you must not communicate any
                  objectionable information, including unlawful, threatening,
                  abusive, defamatory, or obscene content.
                </li>
                <li>
                  The chat/call room shall not be used to give suggestions on
                  business opportunities or any other form of solicitation.
                </li>
                <li>
                  You may proceed further and chat/call with our online customer
                  care executive only if you agree to the above terms and
                  conditions.
                </li>
                <li>
                  You authorize Crackvisa and its business associations to call,
                  SMS, chat, and email you regarding your order.
                </li>
              </ul>
            </p>
          </section>

          {/* License Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <HiDocumentText className="mr-3" /> User Contract
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>
                  The information, photos, images, chats, communications,
                  software, data, sound, graphics, emails, or other content
                  shared with us ("user content") are entirely your
                  responsibility.
                  <span className="font-semibold">
                    {" "}
                    Crackvisa is not liable
                  </span>{" "}
                  in any manner for user content.
                </li>
                <li>
                  <span className="font-semibold">Termination:</span> These
                  terms remain effective until terminated by either you or
                  Crackvisa. You may terminate by discontinuing site usage.
                  Crackvisa reserves the right to terminate access without
                  notice and without liability.
                </li>
                <li>
                  <span className="font-semibold">Indemnity:</span> You agree to
                  defend, indemnify, and hold Crackvisa, its employees,
                  directors, officers, agents, subsidiaries, affiliates,
                  partners, and licensors harmless from any claims, liabilities,
                  damages, or expenses (including attorney’s fees) arising from
                  your actions, inactions, or violations of laws, regulations,
                  intellectual property rights, or privacy policies.
                </li>
              </ul>
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
              <li>Republish material from https://crackvisa.com/</li>
              <li>
                Sell, rent, or sub-license material from https://crackvisa.com/
              </li>
              <li>
                Reproduce, duplicate, or copy material from
                https://crackvisa.com/
              </li>
              <li>Redistribute content from https://crackvisa.com/</li>
            </ul>
          </section>

          {/* User Responsibilities Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <GiBangingGavel className="mr-3" /> Governing Law and
                Jurisdiction
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              <ul className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  The terms of use and policies shall be construed by the
                  applicable laws of India. For proceedings arising therefrom,
                  the courts at Mumbai shall have jurisdiction.
                </li>
                <li>
                  Any dispute or difference, either in interpretation or
                  otherwise, of the terms of use and other policies, between the
                  parties hereto shall be referred to an independent arbitrator.
                  The arbitrator will be appointed mutually, and their decision
                  shall be final and binding. This arbitration will follow the
                  Arbitration and Conciliation Act, 1996, as amended from time
                  to time. The seat and venue of the arbitration shall be in
                  Mumbai.
                </li>
                <li>
                  Without prejudice to clause B above, Crackvisa has the right
                  to seek and obtain provisional or interim relief from any
                  court of competent jurisdiction to protect its trademark,
                  other intellectual property rights, or confidential
                  information, and to prevent the status quo pending
                  arbitration.
                </li>
                <li>
                  <span className="font-semibold">Site security:</span> You are
                  prohibited from violating or attempting to violate the
                  security of the site, including but not limited to:
                  <ul className="list-inside list-disc pl-4 space-y-1">
                    <li>
                      Accessing data not intended for you or logging into a
                      server you are not authorized to access.
                    </li>
                    <li>
                      Attempting to probe, scan, or test the vulnerability of a
                      system or network.
                    </li>
                    <li>
                      Bypassing security or authentication measures without
                      proper authorization.
                    </li>
                    <li>
                      Sending unsolicited emails, including promotions or
                      advertisements of services.
                    </li>
                    <li>
                      Forging any header or any part of the email information or
                      news group postings.
                    </li>
                  </ul>
                  Violations of system or network security may result in civil
                  or criminal liability.
                </li>
              </ul>
            </p>
          </section>
          <section>
            {/* Contact Information Section */}
            <div className="mb-6 ">
              <div className="mb-6 border-b-2 border-gray-300 pb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Contact Information
                </h2>
              </div>

              <ul className="list-none space-y-2 mt-2 text-gray-700">
                <li className="flex items-center">
                  <FaEnvelope size={20} className="mr-2 text-gray-800" />
                  Email: <span className="font-medium">ameet@chocosoft.in</span>
                </li>
                <li className="flex items-center">
                  <FaPhoneAlt size={20} className="mr-2 text-gray-800" />
                  Ph:{" "}
                  <span className="font-medium">
                    +91 971-703-6201, +91 833-000-0786
                  </span>
                </li>
              </ul>
            </div>

            {/* Agreement Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Agreement Terms
              </h3>
              <ul className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  You hereby agree that the company may use your name, photos,
                  and videos for publicity in all kinds of media. Additionally,
                  Crackvisa reserves the right to record video and audio
                  testimonials for referencing or promotion as required by the
                  company, both before or after the visa process.
                </li>
                <li>
                  Crackvisa is not bound to any liability relating to visa
                  results or biometrics.
                </li>
                <li>
                  All answers are analyzed and examined by sending the audio to
                  various large language models, getting the output in text, and
                  further analyzing them in terms of grammar, punctuation,
                  pauses, etc.
                </li>
                <li>
                  The questions asked depend on the type of visa, which are
                  based on previous visa questions gathered from search engines
                  and various large language models.
                </li>
              </ul>
            </div>
          </section>

          {/* Privacy Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FaShieldAlt className="mr-3" /> Privacy Policy
              </h2>
            </div>
            {/* Introduction */}
            <p className="mt-4 text-gray-600">
              The following privacy policy is being published per the provisions
              of the IT-Act 2000 and other applicable rules thereunder,
              including but not limited to the Information Technology
              (Intermediary Guidelines and Digital Media Ethics Code) Rules,
              2021.
            </p>

            <p className="mb-4 text-gray-600">
              This privacy policy explains the policy of Crackvisa’s mock
              interview preparations concerning the disclosure, collection,
              storage, usage, and protection of your information during your
              interaction with the website and the application.
            </p>
            <p className="mb-4 text-gray-600">
              Please read this privacy policy carefully and injunction with the
              terms of use. If you do not understand this policy and do not
              accept any part of it, then you should not use this platform, as
              the case may be <br />
              <strong>Information Collected : </strong>
              When you use the platform by way of registration, login creation
              of a user account, creation of a post or mock interviews, or by
              way of interaction via third-party web and/or mobile applications
              or by any other communication with the platform, Crackvisa
              collects your personally identifiable information including:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-600">
              <li>Name</li>
              {/* <li>Date of birth</li> */}
              {/* <li>Gender</li> */}
              {/* <li>Demographic information</li> */}
              <li>Email address</li>
              {/* <li>Telephone number</li> */}
              <li>Mobile number</li>
              {/* <li>Credit card/debit card details</li>
              <li>Geographic location</li>
              <li>Mailing address</li>
              <li>
                Social media account details (including list of contacts/friends
                and interview references)
              </li> */}
            </ul>

            <p className="mb-4 text-gray-600">
              This Privacy Policy outlines Crackvisa’s approach to Data
              Protection and Privacy to fulfill its obligations under the
              applicable laws and regulations. This Privacy Policy applies to
              your Personal Data which is processed by us, whether in physical
              or electronic mode.
            </p>

            <p className="mb-4 text-gray-600">
              By visiting the platform or providing your information, you
              expressly agree to be bound by this Privacy Policy and agree to be
              governed by the laws of India, including but not limited to the
              laws applicable to data protection and privacy. If you do not
              agree, please do not use or access our Platform.
            </p>

            <p className="mb-4 text-gray-600">
              In this Privacy Policy, the expressions ‘Personal Information’,
              ‘Data Subject’, ‘Controller’, ‘Processor’, and ‘Processing’ shall
              have the meanings given to them in the applicable privacy laws.
            </p>

            <p className="mb- text-gray-600">
              We are committed to treating data privacy seriously. You must know
              exactly what we do with your Personal Information.
            </p>

            <p className="mb-4 text-gray-600">
              Throughout this document, “we”, “us”, “our”, “ours”, and
              “crackvisa” refer to CRACKVISA LIMITED. Wherever we have said
              ‘you’ or ‘your’ or ‘Customer’, this means YOU
            </p>

            <h3 className="text-xl font-semibold mb-2">Who Are We</h3>
            <p className="mb-4 text-gray-600">
              Crackvisa is an online platform dedicated to preparing individuals
              for visa interviews. We provide personalized mock interviews with
              expert feedback to help you build confidence and succeed in your
              visa interview process.
            </p>

            <h3 className="text-xl font-semibold mb-2">Roles We Play</h3>
            <p className="mb-4 text-gray-600">
              <ul className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  <strong>Data Controller:</strong> We collect and process
                  personal information you provide through registration, mock
                  interviews, and other platform interactions.
                </li>
                <li>
                  <strong>Data Processor:</strong> We may also process personal
                  data on behalf of other entities, following their instructions
                  for specific purposes. .
                </li>
              </ul>
            </p>

            {/* Our Commitment */}
            <h3 className="text-xl font-semibold mb-2">Our Commitment</h3>
            <p className="mb-4 text-gray-600">
              We commit to protecting your privacy and hence our Personal
              Information handling practices are continually reviewed to ensure
              compliance with the applicable Privacy laws and regulations.
            </p>
          </section>

          {/* Third-Party Links Section */}
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FaCookieBite className="mr-3" /> Information We Collect About
                You
              </h2>
            </div>

            <p className="mt-4 text-gray-600">
              We receive and store certain types of information whenever you
              interact with us. For example, like many websites, we use
              “cookies,” and we obtain certain types of information when your
              web browser accesses our Services. Depending upon the jurisdiction
              from where you might be accessing our Platform and as per
              applicable laws:
            </p>

            <p className="mb-4 text-gray-600">
              You may be served different types of cookies such as strictly
              necessary cookies, performance cookies, etc. For example, if you
              are an international user accessing our Platform, we only collect
              strictly necessary data for the functioning of our Platform.
            </p>
            <p className="mb-4 text-gray-600">
              We receive and store certain types of information whenever you
              interact with us. For example, like many websites, we use
              “cookies,” and we obtain certain types of information when your
              web browser accesses our Services. Depending upon the jurisdiction
              from where you might be accessing our Platform and as per
              applicable laws:
            </p>
            <p className="mb-4 text-gray-600">
              You may be served different types of cookies such as strictly
              necessary cookies, performance cookies, etc. For example, if you
              are an international user accessing our Platform, we only collect
              strictly necessary data for the functioning of our Platform.
            </p>

            {/* Categories of Personal Information */}
            <h3 className="text-xl font-semibold flex items-center mt-6 mb-2">
              Categories of Personal Information
            </h3>

            <p className="mb-4 text-gray-600">
              Categories of Personal Information we may collect and process are
              as follows:
            </p>

            {/* Demographic & Identity Data Section */}
            <div className="category mb-4">
              <h4 className="font-bold text-lg mb-2">
             Identity Data
              </h4>
              <ul className="list-disc ml-6 text-gray-600">
                <li>
                  Contact details such as Name, email address, contact number,
                  profile picture.
                </li>
                <li>
                  Open data and public records such as information about YOU
                  that is openly available on the internet.
                </li>
                <li>
                  Details such as Transaction amount, bank name, card number,
                  and card type.
                </li>
              </ul>
            </div>

            {/* Online Identifiers and Other Technical Data Section */}
            <div className="category mb-4">
              <h4 className="font-bold text-lg mb-2">
                Online Identifiers and Other Technical Data
              </h4>
              <ul className="list-disc ml-6 text-gray-600">
                <li>
                  Location details such as data we get about your location, IP
                  address, logs, or from where you connect a computer to the
                  internet.
                </li>
                <li>
                  Technical details such as device information, location, and
                  network carrier when you use our mobile applications.
                </li>
                <li>
                  Communications details such as the Metadata and other Personal
                  Information we get from communications done through e-mails,
                  SMS, instant messages, and calls.
                </li>
                <li>
                  Usage data details such as data about how you use our
                  platform, pages viewed, etc.
                </li>
              </ul>
            </div>
            <div className="category mb-4">
              <h4 className="font-bold text-lg mb-2">Consent</h4>
              <p className="mb-4 text-gray-600">
                By using the Platform and/ or by providing your information, you
                agree and consent to us collecting, storing, processing,
                transferring, using and sharing of your personal information
                (including sensitive personal information as per applicable law)
                that you disclose on the Platform with third parties or service
                providers for the purposes set out and in accordance with this
                Privacy Policy.
              </p>
            </div>
          </section>

          {/*
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FaBan className="mr-3" /> Termination
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              We may terminate or suspend your access to our website
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>
           
          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FaUserShield className="mr-3" />
                Privacy
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              The website is provided on an "AS IS" and "AS AVAILABLE" basis.
              https://crackvisa.com/ makes no representations or warranties of
              any kind, express or implied, as to the operation of our website
              or the information, content, materials, or products included on
              our website. You expressly agree that your use of our website is
              at your sole risk.
            </p>
          </section>

          <section>
            <div className="border-b-2 border-gray-300 pb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <FaGavel className="mr-3" /> Governing Law
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              These Terms shall be governed and construed in accordance with the
              laws of Maharashtra, India, without regard to its conflict of law
              provisions.
            </p>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
