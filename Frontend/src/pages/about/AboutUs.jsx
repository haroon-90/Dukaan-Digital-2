const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] px-6 py-12 md:px-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] tracking-tight">
            About <span className="text-[var(--color-primary)]">Dukaan Digital</span>
          </h1>
          <p className="text-xl text-[var(--color-muted-foreground)] max-w-2xl">
            Empowering local commerce with modern digital solutions.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl">
          <p className="text-lg leading-relaxed text-[var(--color-foreground)]">
            Dukaan Digital isn't just a platform; it's a solution crafted for the heart of local commerce. We are a modern shop management platform built to help shopkeepers, small business owners, and entrepreneurs take control of their business. In an increasingly digital world, we recognize that small shops face unique challenges, and our goal is to empower them with the right tools to thrive.
          </p>
        </div>

        <section id="story">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4 flex items-center gap-2">
            Our Story
          </h2>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed text-lg">
            The idea for Dukaan Digital was born from a simple observation: despite the rise of advanced technology, many local businesses still rely on manual ledgers and outdated methods. We saw hardworking shopkeepers spending countless hours managing inventory on paper, tracking credit (udhaar) in notebooks, and manually tallying daily sales. We decided to create an intuitive, powerful, and easy-to-use digital solution that replaces those inefficiencies with seamless automation. Our journey began with a mission to bridge the technology gap for small businesses, one shop at a time.
          </p>
        </section>

        <section id="mission">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
            Our Mission
          </h2>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed text-lg">
            Our mission is to empower shopkeepers with a simple yet powerful tool that brings transparency and efficiency to their daily operations. We are dedicated to replacing manual registers and complex systems with a user-friendly digital solution that is accessible to everyone. By simplifying tasks like sales tracking, inventory management, and expense logging, we enable business owners to make smarter decisions and focus on what truly matters: serving their customers and growing their business.
          </p>
        </section>

        <section id="features" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
              Key Features
            </h2>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              Dukaan Digital offers a comprehensive suite of features designed to streamline every aspect of your business operations. Our platform provides a centralized hub for all your data.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Real-Time Tracking", desc: "Instantly record and monitor every transaction, giving you a live look at your business's performance." },
              { title: "Inventory Management", desc: "Effortlessly add, update, and manage your products. Get low-stock alerts to ensure you never run out." },
              { title: "Udhaar & Credits", desc: "Ditch the notebooks. Our system securely tracks all outstanding credit and payments." },
              { title: "Business Reports", desc: "Generate insightful reports on sales, expenses, and profit margins to help you make informed decisions." },
              { title: "Intuitive Interface", desc: "Designed with non-technical users in mind, our platform is simple to navigate and requires minimal training." },
              { title: "Secure & Accessible", desc: "Your data is safely stored in the cloud, allowing you to manage your business from any device, anytime." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] p-5 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--color-muted-foreground)]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
            Our Vision
          </h2>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed text-lg">
            We believe that small businesses are the backbone of the economy. Our vision is to create a future where every shopkeeper, regardless of their size or location, has access to the digital tools they need to succeed. By empowering them with technology, we aim to help them not only survive but also grow, scale, and confidently compete in a digital world. We are committed to fostering a vibrant ecosystem of successful small businesses.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;