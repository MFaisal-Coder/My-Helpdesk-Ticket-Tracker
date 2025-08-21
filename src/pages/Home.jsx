import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import user1 from "/images/user1.jpg";
import user2 from "/images/user2.jpg";
import user3 from "/images/user3.jpg";
import user4 from "/images/user4.jpg";
import user5 from "/images/user5.jpg";
import comp1 from "/images/comp1.png";
import comp2 from "/images/comp2.png";
import comp3 from "/images/comp3.png";
import comp4 from "/images/comp4.png";
import comp6 from "/images/comp6.png";
import testimony1 from "/images/testimony1.jpg";
import testimony2 from "/images/testimony2.jpg";
import testimony3 from "/images/testimony3.jpg";
import heroimg1 from "/images/heroimg1.webp";
import heroimg2 from "/images/heroimg2.avif";
import heroimg3 from "/images/heroimg3.webp";
import heroimg4 from "/images/heroimg4.avif";

export default function Home() {
  const sections = useRef([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const caraouselImages = [heroimg1, heroimg2, heroimg3, heroimg4];
  const [fadeState, setFadeState] = useState("fade-in");

  useEffect(() => {
   const timer = setInterval(() => {
      setFadeState('fade-out');
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === caraouselImages.length - 1 ? 0 : prevIndex + 1
        );
        setFadeState('fade-in');
      }, 500); 
    }, 7000);

    return () => clearInterval(timer); 
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
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
      {/* Animated Hero Section */}
      <section
        ref={(el) => (sections.current[0] = el)}
        className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20 px-4 flex items-center transition-opacity duration-500 opacity-0"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Modern Helpdesk
              </span>
              <br />
              For The Digital Age
            </h1>
            <p className="text-xl text-blue-100 max-w-lg">
              Revolutionize your support workflow with our dynamic ticketing and
              real-time analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/sign-up"
                className="relative bg-white text-blue-900 font-bold py-4 px-8 rounded-full hover:scale-105 transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Get Started Free</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link
                to="/demo"
                className="relative border-2 border-blue-300 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-800/30 hover:scale-105 transition-all duration-300"
              >
                Live Demo
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-8">
              <div className="flex -space-x-4">
                {[user1, user2, user3, user4, user5].map((item) => (
                  <div
                    key={item}
                    className="h-10 w-10 overflow-hidden rounded-full bg-blue-700 border-2 border-blue-900"
                  >
                    <img src={item} alt="user-images" />
                  </div>
                ))}
              </div>
              <p className="text-blue-200 text-sm">
                Trusted by 10,000+ teams worldwide
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-1"></div>
            <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <img
              src={caraouselImages[currentImageIndex]}
              alt="Dashboard Preview"
              className={`relative z-10 h-100 max-w-130 w-full object-cover rounded-2xl shadow-2xl border border-blue-700/30 transform hover:scale-95 transition-all duration-500 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section
        ref={(el) => (sections.current[1] = el)}
        className="py-16 bg-gray-50 opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 mb-12">
            TRUSTED BY INNOVATIVE TEAMS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {[comp1, comp2, comp3, comp4, comp6].map(
              (company, i) => (
                <div
                  key={i}
                  className="max-w-46"
                >
                  <img className="w-full" src={company} alt="company-logos" />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={(el) => (sections.current[2] = el)}
        className="py-28 px-4 bg-white opacity-0"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold">
              POWERFUL FEATURES
            </span>
            <h2 className="text-4xl font-bold mt-4">
              Everything You Need in One Platform
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Ticket Management
              </div>
              <h3 className="text-3xl font-bold">Intuitive Ticket System</h3>
              <p className="text-gray-600 text-lg">
                Create, assign, and track tickets with our beautiful interface
                designed for maximum productivity.
              </p>
              <ul className="space-y-3">
                {[
                  "Drag-and-drop prioritization",
                  "Custom ticket fields",
                  "Automated routing",
                  "SLA tracking",
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-2xl transform rotate-2"></div>
              <img
                src="https://www.servicenow.com/content/dam/servicenow-assets/public/scripts/homepage-redesign/marquee/homepage-ai-control-tower-1.sm.jpg"
                alt="Ticket Management"
                className="relative rounded-xl shadow-lg border border-gray-200"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Analytics
              </div>
              <h3 className="text-3xl font-bold">Real-time Insights</h3>
              <p className="text-gray-600 text-lg">
                Make data-driven decisions with beautiful dashboards and
                customizable reports.
              </p>
              <ul className="space-y-3">
                {[
                  "Team performance metrics",
                  "Customer satisfaction trends",
                  "Ticket volume forecasting",
                  "Custom report builder",
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-purple-100 rounded-2xl transform -rotate-2"></div>
              <img
                src="https://www.servicenow.com/content/dam/servicenow-assets/public/scripts/homepage-redesign/marquee/homepage-ai-control-tower-1.sm.jpg"
                alt="Analytics Dashboard"
                className="relative rounded-xl shadow-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={(el) => (sections.current[3] = el)}
        className="py-20 bg-gray-50 opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold mt-4">
              Trusted by Teams Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This platform reduced our response times by 60%. Game changer for our support team!",
                name: "Sarah Johnson",
                title: "Support Director, TechCorp",
                img: testimony1,
              },
              {
                quote:
                  "The analytics alone are worth the price. We've improved our CSAT by 35% in 3 months.",
                name: "Michael Chen",
                title: "CXO, Startup Inc",
                img: testimony2,
              },
              {
                quote:
                  "Implementation was seamless and our agents love the intuitive interface.",
                name: "David Wilson",
                title: "IT Manager, Enterprise Co",
                img: testimony3,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white p-8 flex flex-col flex-wrap justify-between rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="h-full shrink-0 w-full object-cover"
                      />
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => (sections.current[4] = el)}
        className="py-28 bg-gradient-to-r from-blue-900 to-indigo-800 text-white opacity-0"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Helpdesk?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of teams who deliver exceptional support with our
            platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sign-up"
              className="relative bg-white text-blue-900 font-bold py-4 px-8 rounded-full hover:scale-105 transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">Start Free Trial</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              to="/contact"
              className="relative border-2 border-blue-300 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-800/30 hover:scale-105 transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
