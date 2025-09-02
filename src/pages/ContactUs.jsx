import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ContactUs() {
  const sections = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans overflow-hidden">
      {/* Hero Section */}
      <section
        ref={(el) => (sections.current[0] = el)}
        className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20 px-4 flex items-center transition-opacity duration-500 opacity-0"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Get In Touch
              </span>
              <br />
              We'd Love to Hear From You
            </h1>
            <p className="text-xl text-blue-100 max-w-lg">
              Have questions about our helpdesk solutions? Our team is ready to help 
              you transform your customer support experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="mailto:support@helpdeskpro.com"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors duration-300 px-6 py-3 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@helpdeskpro.com
              </a>
              <a
                href="tel:+18005551234"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors duration-300 px-6 py-3 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (800) 555-1234
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-1"></div>
            <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl border border-blue-700/30">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section
        ref={(el) => (sections.current[1] = el)}
        className="py-28 px-4 bg-white opacity-0"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold">OUR OFFICES</span>
            <h2 className="text-4xl font-bold mt-4">
              Visit Us In Person
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: "San Francisco",
                address: "123 Tech Boulevard, Suite 400\nSan Francisco, CA 94107",
                phone: "+1 (415) 555-0199",
                hours: "Mon-Fri: 9AM - 6PM PST"
              },
              {
                city: "New York",
                address: "456 Innovation Ave\nNew York, NY 10001",
                phone: "+1 (212) 555-0187",
                hours: "Mon-Fri: 9AM - 6PM EST"
              },
              {
                city: "London",
                address: "789 Digital Lane\nLondon EC1A 1AA, UK",
                phone: "+44 20 5555 0123",
                hours: "Mon-Fri: 9AM - 6PM GMT"
              }
            ].map((office, i) => (
              <div 
                key={i} 
                className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">{office.city}</h3>
                <div className="space-y-4 text-gray-600">
                  <p className="whitespace-pre-line">{office.address}</p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {office.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section
        ref={(el) => (sections.current[2] = el)}
        className="py-20 bg-gray-50 opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">SUPPORT RESOURCES</span>
            <h2 className="text-4xl font-bold mt-4">
              Additional Ways We Can Help
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Knowledge Base",
                desc: "Browse our comprehensive help articles and tutorials",
                link: "https://support.helpdeskpro.com",
                icon: "📚"
              },
              {
                title: "Community Forum",
                desc: "Connect with other users and share solutions",
                link: "https://community.helpdeskpro.com",
                icon: "💬"
              },
              {
                title: "Live Chat",
                desc: "Instant help from our support team during business hours",
                link: "https://helpdeskpro.com/chat",
                icon: "💡"
              }
            ].map((resource, i) => (
              <a
                key={i}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600">{resource.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => (sections.current[3] = el)}
        className="py-28 bg-gradient-to-r from-blue-900 to-indigo-900 text-white opacity-0"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Our customer success team is available 24/7 to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-us"
              className="relative bg-white text-blue-900 font-bold py-4 px-8 rounded-full hover:scale-105 transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">Contact Support</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <a
              href="tel:+18005551234"
              className="relative border-2 border-blue-300 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-800/30 hover:scale-105 transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}