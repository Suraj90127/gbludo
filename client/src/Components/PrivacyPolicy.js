import React from "react";
import logo from "./Assets/logo.png";

const PrivacyPolicy = () => {
  return (
    <div className="mt-[60px] -z-20">
      <div className="bg-card text-card-foreground p-6 max-w-lg mx-auto transform transition-transform shadow-lg rounded-lg">
        {/* Header with logo and button */}
        <div className="flex items-center p-4 py-7 justify-start mb-6 bg-[#f2f2f2] rounded-lg shadow">
          <img src={logo} alt="Company Logo" className="w-16 h-16 mr-4" />
          <button className="text-[1rem] font-medium text-primary hover:underline">
            Terms, Privacy, Support
          </button>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-6 mt-4">
          {/* About Us Section */}
          <div>
            <h2 className="text-[1.1rem] font-semibold text-foreground">
              About Us
            </h2>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              gbludo is a real-money gaming product owned and operated by
              Onovatechnologies ("gbludo" or “We” or “Us” or “Our”).
            </p>
          </div>

          {/* Our Business & Products Section */}
          <div>
            <h2 className="text-[1.1rem] font-semibold text-foreground">
              Our Business & Products
            </h2>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              We are an HTML5 game-publishing company with a mission to make
              accessing games fast and easy by removing the friction of app
              installs.
            </p>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              gbludo is a skill-based real-money gaming platform accessible only
              for users in India. It is available on{" "}
              <a
                href="https://gpludo.com"
                className="text-primary hover:underline"
              >
                https://www.gpludo.com
              </a>
              . On gbludo, users can compete for real cash in Tournaments and
              Battles, with winnings encashable via popular options like Paytm
              Wallet, Amazon Pay, Bank Transfer, Mobile Recharges, etc.
            </p>
          </div>

          {/* Our Games Section */}
          <div>
            <h2 className="text-[1.1rem] font-semibold text-foreground">
              Our Games
            </h2>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              gbludo offers a wide variety of high-quality, premium HTML5 games.
              Our games are especially compressed and optimized to work
              seamlessly on low-end devices and slow networks.
            </p>
          </div>

          {/* Privacy Policy Section */}
          <div>
            <h2 className="text-[1.1rem] font-semibold text-foreground">
              Privacy Policy
            </h2>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              At gbludo, we value your privacy and are committed to protecting
              your personal information. This Privacy Policy outlines the types
              of data we collect and how we use, store, and protect that
              information.
            </p>

            <h3 className="text-[1rem] font-medium text-foreground mt-4">
              Information We Collect
            </h3>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              We may collect personal information such as your name, email
              address, phone number, and payment details when you use our
              platform or services. Additionally, we collect data regarding your
              gameplay activity, device information, and location data for fraud
              prevention and game optimization purposes.
            </p>

            <h3 className="text-[1rem] font-medium text-foreground mt-4">
              How We Use Your Information
            </h3>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              Your personal information is used to provide you with the best
              possible gaming experience, to process payments, prevent fraud,
              and enhance our services. We also use your data for customer
              support and communication about our latest updates.
            </p>

            <h3 className="text-[1rem] font-medium text-foreground mt-4">
              Data Security
            </h3>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              We take data security seriously and implement industry-standard
              measures to protect your personal information. All payment
              transactions are encrypted, and sensitive data is stored securely.
            </p>

            <h3 className="text-[1rem] font-medium text-foreground mt-4">
              Your Rights
            </h3>
            <p className="text-[0.9rem] text-gray-600 mt-2">
              You have the right to access, update, or delete your personal
              information at any time. Please contact our support team if you
              have any concerns about your data privacy.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            &copy; 2024 Onovatechnologies | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
