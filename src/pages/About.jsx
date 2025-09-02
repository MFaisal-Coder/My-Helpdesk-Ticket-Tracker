import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
/* import team1 from '/images/team1.jpg';
import team2 from '/images/team2.jpg';
import team3 from '/images/team3.jpg'; */

export default function About() {
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
                About Our Vision
              </span>
              <br />
              Building the Future of Support
            </h1>
            <p className="text-xl text-blue-100 max-w-lg">
              We're revolutionizing helpdesk solutions with cutting-edge technology 
              and a passion for exceptional customer experiences.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-1"></div>
            <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            {/* <img
              src={team1}
              alt="Our team collaborating"
              className="relative z-10 rounded-2xl shadow-2xl border border-blue-700/30 transform hover:scale-95 transition-all duration-500"
            /> */}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        ref={(el) => (sections.current[1] = el)}
        className="py-28 px-4 bg-white opacity-0"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold">OUR MISSION</span>
            <h2 className="text-4xl font-bold mt-4">
              Empowering Teams Through Innovation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: "Accelerate Resolution",
                desc: "Reduce ticket times with AI-powered suggestions and automation."
              },
              {
                icon: '❤️',
                title: "Delight Customers",
                desc: "Turn support interactions into positive brand experiences."
              },
              {
                icon: '📈',
                title: "Drive Efficiency",
                desc: "Give your team tools to work smarter, not harder."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={(el) => (sections.current[2] = el)}
        className="py-20 bg-gray-50 opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">MEET THE TEAM</span>
            <h2 className="text-4xl font-bold mt-4">
              The Minds Behind the Magic
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                bio: "15+ years in customer experience technology",
                img: "team2"
              },
              {
                name: "Maria Garcia",
                role: "Head of Product",
                bio: "Passionate about intuitive user experiences",
                img: "team3"
              },
              {
                name: "James Wilson",
                role: "Lead Developer",
                bio: "Builds scalable architectures with a smile",
                img: "team1"
              }
            ].map((member, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={(el) => (sections.current[3] = el)}
        className="py-28 px-4 bg-white opacity-0"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold">OUR VALUES</span>
            <h2 className="text-4xl font-bold mt-4">
              What Guides Everything We Do
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              {[
                {
                  title: "Customer Obsession",
                  desc: "We start with customer needs and work backwards."
                },
                {
                  title: "Innovation",
                  desc: "We challenge conventions to find better solutions."
                },
                {
                  title: "Ownership",
                  desc: "We act like founders and take responsibility."
                }
              ].map((value, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full p-3">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-2xl transform rotate-2"></div>
              {/* <img
                src={team2}
                alt="Team collaborating"
                className="relative rounded-xl shadow-lg border border-gray-200"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => (sections.current[4] = el)}
        className="py-28 bg-gradient-to-r from-blue-900 to-indigo-900 text-white opacity-0"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to See It in Action?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Experience how our platform can transform your helpdesk operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="relative bg-white text-blue-900 font-bold py-4 px-8 rounded-full hover:scale-105 transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">Request Demo</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              to="/contact"
              className="relative border-2 border-blue-300 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-800/30 hover:scale-105 transition-all duration-300"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}