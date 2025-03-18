import React, { useState } from "react";
import {
  Shield,
  CreditCard,
  RefreshCw,
  XCircle,
  Clock,
  Mail,
  ChevronDown,
} from "lucide-react";

const Card = ({ title, icon, children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-2xl font-bold mb-4 flex items-center">
      {icon}
      <span className="ml-2">{title}</span>
    </h2>
    {children}
  </div>
);

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

const PaymentPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card title="Payment Policy" icon={<Shield className="w-6 h-6" />}>
        <p className="mb-4">
          Welcome to CrackVisa's Payment Policy. We are committed to
          safeguarding the privacy and confidentiality of user data.
        </p>
        <p className="text-gray-600">
          By accessing and using CrackVisa, you agree to the policies outlined
          below, detailing how we handle, protect, and use the personal
          information we collect. This document ensures transparency and
          empowers users to make informed choices about their data.
        </p>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card title="Payment Policy" icon={<CreditCard className="w-6 h-6" />}>
          <Accordion title="1. Payment for Services">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                CrackVisa offers various premium features and subscription plans
                for enhanced exam preparation and guidance. These services are
                clearly marked on the Platform, and users are notified of
                applicable charges before completing transactions.
              </li>
              <li>
                Payments for services, subscriptions, or features are securely
                processed through our payment gateways. Users must provide valid
                payment information, such as credit card details or other
                approved methods.
              </li>
              <li>
                The Platform offers multiple payment options, including
                credit/debit cards and bank transfers, and users will be charged
                based on the displayed pricing at the time of purchase or
                subscription.
              </li>
            </ul>
          </Accordion>
          <Accordion title="2. Subscription and Renewals">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                For subscription-based services, the Platform offers both
                monthly and annual plans, allowing users to benefit from ongoing
                exam preparation and guidance services. By subscribing, you
                agree to pay the corresponding fee for your chosen plan.
              </li>
              <li>
                Subscriptions are automatically renewed unless canceled by the
                user before the renewal date. You will be notified of upcoming
                renewals in advance.
              </li>
            </ul>
          </Accordion>
          <Accordion title="3. Currency and Taxes">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                All payments are processed in the currency specified by
                CrackVisa (e.g., INR or USD). You are responsible for any taxes
                or additional charges, including sales tax or VAT that may apply
                based on your location.
              </li>
              <li>
                The Platform may adjust pricing based on market conditions and
                will notify users prior to any price increase.
              </li>
              <li>
                Pricing may be adjusted based on market conditions with prior
                notification.
              </li>
            </ul>
          </Accordion>
          <Accordion title="4. Security">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                CrackVisa uses encryption and secure payment processing services
                to ensure your payment information is protected. However, while
                we take stringent security measures, we cannot guarantee that
                the system will be entirely free from security breaches or
                fraud.
              </li>
            </ul>
          </Accordion>
        </Card>

        <Card title="Refund Policy" icon={<RefreshCw className="w-6 h-6" />}>
          <Accordion title="1. No Refunds for Subscription Fees">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Subscription fees for CrackVisa’s services are non-refundable.
                Once a payment has been made for a subscription plan, it is
                non-refundable, even if the user cancels the subscription during
                the term.
              </li>
              <li>
                If you cancel your subscription, you will continue to have
                access until the end of the billing cycle, but no refunds will
                be issued for the remaining period.
              </li>
            </ul>
          </Accordion>
          <Accordion title="2. Refunds for Other Payments">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                If you believe you were charged incorrectly or did not receive
                the services as expected, please contact CrackVisa support at
                support@crackvisa.com. Refunds may be considered on a
                case-by-case basis for one-time payments or purchases, at
                CrackVisa’s discretion.
              </li>
              <li>
                Refund requests must be submitted within 30 days of payment.
              </li>
            </ul>
          </Accordion>
          <Accordion title="3. Technical Issues and Service Availability">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                If technical issues prevent access to paid services, CrackVisa
                will work to resolve them promptly. Should issues persist, users
                may be eligible for a partial or full refund depending on the
                circumstances.
              </li>
              <li>
                Refund requests must be submitted within 30 days from the date
                of payment.
              </li>
            </ul>
          </Accordion>
          <Accordion title="4. Disputed Charges">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                If a payment is disputed, you must notify CrackVisa and attempt
                to resolve it directly. Unresolved disputes may result in
                suspension or termination of your access.
              </li>
            </ul>
          </Accordion>
        </Card>
      </div>

      <Card title="Cancellation Policy" icon={<XCircle className="w-6 h-6" />}>
        <p className="mb-4">
          Subscription Cancellations: Users may cancel their subscription at any
          time through account settings or by contacting support. Upon
          cancellation, you will have access until the end of the billing cycle.
          Note that cancellations are not eligible for refunds.
        </p>

        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Refund Eligibility
        </h3>
        <ul className="list-disc pl-5 mb-4">
          <li>Incorrect charges</li>
          <li>Services not received as expected</li>
          <li>Technical failures preventing access</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Refund Timeline
        </h3>
        <p className="mb-4">
          Refund requests must be made within 30 days of payment. Approved
          refunds will be processed within 10-15 business days.
        </p>

        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          How to Request a Refund
        </h3>
        <p>
          To request a refund, email CrackVisa support at support@crackvisa.com
          with:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Account details</li>
          <li>Details of the service or product</li>
          <li>Reason for the refund request</li>
          <li>Supporting documents (e.g., receipts)</li>
        </ul>

        <p className="text-gray-600">
          By using the Platform, you agree to our payment and refund policy. All
          payment issues or refund requests should be directed to CrackVisa's
          support team via support@crackvisa.com.
        </p>
      </Card>
    </div>
  );
};

export default PaymentPolicy;
