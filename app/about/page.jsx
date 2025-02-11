// app/about/page.tsx
import { ContributorCard } from "@/components/about/ContributorCardProps";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Section Sundai Club */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">
          About Sundai Club
        </h1>

        <div className="space-y-6">
          <p className="text-lg">
            Sundai Club is where{" "}
            <span className="font-semibold">AI passion meets execution</span>.
            Born from the MIT/Harvard ecosystem but open to all builders
            worldwide, we're redefining what's possible in 24 hours of focused
            hacking.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🚀 Our Philosophy</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>No credentials required - just skills and grit</li>
              <li>From zero to deploy in a single Sunday</li>
              <li>Collaboration over competition</li>
              <li>Open source by default</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">💻 Who We Are</h3>
              <p>
                A mix of:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Self-taught developers</li>
                  <li>University students</li>
                  <li>Industry professionals</li>
                  <li>AI researchers</li>
                  <li>Startup founders</li>
                </ul>
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🎯 What We Do</h3>
              <p>
                Every Sunday:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>10AM: Idea pitching</li>
                  <li>11AM: Team formation</li>
                  <li>12PM: Development sprint</li>
                  <li>8PM: MVP deployment</li>
                  <li>Midnight: Post-mortem</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section George AI */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">The George AI Story</h2>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              💡 Birth of a Voice Assistant
            </h3>
            <p>
              "It started with a simple question:{" "}
              <em>
                Can we build a scheduling assistant that feels truly human?
              </em>{" "}
              By 2PM, we were wrestling with voice recognition APIs. By 7PM,
              George was taking his first calls."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Tech Stack</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Next.js 15 App Router</li>
                <li>VAPI for voice processing</li>
                <li>Calendly API integration</li>
                <li>Real-time transcription</li>
              </ul>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <h4 className="font-semibold mb-2">Core Principles</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>No-code configurability</li>
                <li>Natural conversation flow</li>
                <li>Privacy-first design</li>
                <li>Open documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Builders Crew */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Builders Crew</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContributorCard
            name="Alex Turing"
            role="Voice Engine Architect"
            links={{
              github: "https://github.com/alexturing",
              linkedin: "https://linkedin.com/in/alexturing",
              x: "https://x.com/alexturing",
            }}
          />

          <ContributorCard
            name="Samantha Code"
            role="UX Wizard"
            links={{
              portfolio: "https://samanthacode.design",
              instagram: "https://instagram.com/samcodes",
            }}
          />

          <ContributorCard
            name="You?"
            role="Next Contributor"
            links={{
              join: "https://sundai.club/join",
            }}
          />
        </div>
      </section>

      {/* CTAs */}
      <section className="text-center py-12 bg-gray-50 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Ready to Build?</h3>
        <p className="mb-8 max-w-2xl mx-auto">
          Whether you're a seasoned developer or just starting out, Sundai Club
          welcomes all who share our builder mentality.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://sundai.club/join"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Join Next Sunday
          </a>
          <a
            href="https://github.com/sundai-club"
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700"
          >
            Contribute on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
