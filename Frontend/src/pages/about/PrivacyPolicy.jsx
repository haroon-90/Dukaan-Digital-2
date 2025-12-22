import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] px-6 py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl shadow-lg animate-fade-in-up">
        <div className="mb-10 text-center md:text-left border-b border-[var(--color-border)] pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Last updated: August 2025
          </p>
        </div>

        <div className="space-y-8 text-[var(--color-foreground)] leading-relaxed">
          <p className="text-lg">
            At Dukaan Digital, we are deeply committed to protecting your privacy. This Privacy Policy is designed to clearly explain how we collect, use, and protect your personal and business information when you use our shop management platform and related services. By using Dukaan Digital, you agree to the practices described in this policy.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-4 text-[var(--color-muted-foreground)]">
              We collect information to provide and improve our services to you. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-3 marker:text-[var(--color-primary)]">
              <li>
                <b className="text-[var(--color-foreground)]">Information You Provide:</b> When you create an account, we ask for personal details like your name, phone number, and email address. You also provide us with your shop’s name, address, and business-related information as you use the app.
              </li>
              <li>
                <b className="text-[var(--color-foreground)]">Business Data:</b> As you use the app to manage your shop, we collect and store your business data, including sales records, purchases, expenses, product inventory, and customer credit (udhaar) information. This data is the core of our service and is stored securely to allow you to run your business efficiently.
              </li>
              <li>
                <b className="text-[var(--color-foreground)]">Technical & Usage Information:</b> We automatically collect certain information when you access or use the app. This includes your device information (e.g., type of device, operating system), usage data (e.g., pages visited, features used), and IP address. This helps us understand how our app is used, diagnose technical issues, and improve your experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              2. How We Use Your Information
            </h2>
            <p className="mb-4 text-[var(--color-muted-foreground)]">
              The information we collect is used to power your Dukaan Digital experience and is essential for our operations. We use it to:
            </p>
            <ul className="list-disc pl-6 space-y-3 marker:text-[var(--color-primary)]">
              <li>
                <b className="text-[var(--color-foreground)]">Provide and Personalize Our Services:</b> To set up your account, process transactions, and enable the core features of the app, such as managing your inventory and tracking sales.
              </li>
              <li>
                <b className="text-[var(--color-foreground)]">Communicate with You:</b> To send you important updates about the app, provide customer support, and inform you of new features or services.
              </li>
              <li>
                <b className="text-[var(--color-foreground)]">Improve and Develop Our Platform:</b> By analyzing usage data, we can understand which features are most useful and identify areas for improvement, ensuring the app remains fast and reliable.
              </li>
              <li>
                <b className="text-[var(--color-foreground)]">Ensure Security:</b> To monitor for and prevent fraudulent activity and unauthorized access to your account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              3. Data Security
            </h2>
            <p className="text-[var(--color-muted-foreground)]">
              We take the security of your data seriously. We use industry-standard measures to protect your information from unauthorized access, loss, or misuse. Our security practices include data encryption, secure data centers, and restricted access to sensitive information. While we strive to protect your data, it's important to remember that no system is 100% secure. We also encourage you to use a strong, unique password and to keep your login information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              4. Sharing of Information
            </h2>
            <p className="mb-4 text-[var(--color-muted-foreground)]">
              We do not sell your personal or business data to third parties. We may share information only in specific circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-3 marker:text-[var(--color-primary)]">
              <li>
                <b className="text-[var(--color-foreground)]">With Your Consent:</b> We will share your information if you give us explicit permission to do so.
              </li>
              <li>
                <b className="text-[var(--color-foreground)]">For Service Provision:</b> We may use trusted third-party services to help us run our business, such as cloud hosting providers, payment processors, and analytics services. These partners are bound by confidentiality agreements and are only given access to the information necessary to perform their specific tasks.
              </li>
              <li>
                <b className="text-[var(--color-foreground)]">For Legal Reasons:</b> We may disclose your information if required by law, court order, or government regulation, or to protect our legal rights, property, or safety.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              5. Your Rights
            </h2>
            <p className="mb-4 text-[var(--color-muted-foreground)]">
              You have certain rights regarding the personal information we hold about you. You can request to:
            </p>
            <ul className="list-disc pl-6 space-y-3 marker:text-[var(--color-primary)]">
              <li>
                <b className="text-[var(--color-foreground)]">Access or Update Your Data:</b> You can view and update most of your information directly within the app.
              </li>
              <li>
                <b className="text-[var(--color-foreground)]">Request Deletion:</b> You can ask us to delete your account and all associated data.
              </li>
            </ul>
            <p className="mt-4 text-[var(--color-muted-foreground)]">
              If you have any questions or would like to exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              6. Changes to This Policy
            </h2>
            <p className="text-[var(--color-muted-foreground)]">
              We may update this Privacy Policy periodically to reflect changes in our practices or for legal reasons. When we make significant changes, we will notify you through the app or by email. The updated policy will be effective immediately, and the "Last updated" date at the top of this page will be revised.
            </p>
          </section>

          <section className="pt-6 border-t border-[var(--color-border)]">
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
              7. Contact Us
            </h2>
            <p className="text-[var(--color-muted-foreground)]">
              If you have any questions about this Privacy Policy, your data, or our privacy practices, please contact our support team at:
            </p>
            <p className="mt-2 font-medium">
              <a href="mailto:haroonboy90@gmail.com" className="text-[var(--color-primary)] hover:underline">support@dukaandigital.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;