// app/about/page.tsx
import { ContributorCard } from "@/components/about/ContributorCardProps";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Image from "next/image";

export default function AboutPage() {
  return (
    <BackgroundBeamsWithCollision className="pt-4 relative">
      <div className="max-w-6xl mx-auto p-6">
        {/* Call George Section */}

        <section className="mb-16">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/george-banner-about.svg"
              alt="George"
              width={500}
              height={100}
            />
          </div>
          <div className="relative">
            <GlowingEffect
              blur={0}
              borderWidth={3}
              spread={80}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              className="rounded-xl"
            />
            <div className="relative z-10">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg mb-4">
                  Your privacy-first voice AI assistant that automates call
                  handling and appointment bookings, so you can focus on
                  inspections and what matters most.
                </p>

                <div className="mb-4">
                  <div className="flex items-center">
                    <Image
                      src="/george-icon.png"
                      alt="George"
                      width={38}
                      height={38}
                    />
                    <h2 className="text-2xl font-semibold ml-2">
                      What is Call George?
                    </h2>
                  </div>
                  <p>
                    Call George is your dedicated voice AI agent designed for
                    service-based businesses like inspections, plumbing, and
                    technician services. Prioritizing privacy, it automatically
                    handles incoming calls and books inspections, letting you
                    focus on your core work.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-semibold mb-2">
                    ✨ What Does It Do?
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Instant Answering: Greets incoming calls professionally.
                    </li>
                    <li>
                      Smart Scheduling: Engages with customers and books
                      inspections using your integrated calendar.
                    </li>
                    <li>
                      Automated Confirmations: Sends email confirmations and
                      reminders to secure every appointment.
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl font-semibold mb-2">
                    💬 How It Works
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Voice AI: Uses advanced voice recognition to accurately
                      understand and respond.
                    </li>
                    <li>
                      Seamless Integrations: Connects with your calendar, email,
                      and scheduling tools.
                    </li>
                    <li>
                      Time-Saving Automation: Frees up 3-4 hours daily by
                      handling routine calls.
                    </li>
                    <li>
                      Privacy-Centric: Manages customer interactions while
                      protecting your sensitive data.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    💡 How It Helps You
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Boosts Productivity: Automates routine calls so your team
                      can focus on inspections.
                    </li>
                    <li>
                      Enhances Customer Experience: Provides prompt, reliable
                      service.
                    </li>
                    <li>
                      Streamlines Operations: Reduces scheduling errors and
                      double bookings.
                    </li>
                    <li>
                      Respects Your Privacy: Ensures your data is handled
                      securely.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Call George */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">The Call George Story</h2>

          <div className="space-y-8">
            <div className="relative">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-xl"
              />
              <div className="relative z-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">
                    💡 Birth of a Voice Assistant
                  </h3>
                  <p>
                    "It started with a simple question:{" "}
                    <em>
                      Can we build a scheduling assistant that feels truly
                      human?
                    </em>{" "}
                    By 2PM, we were wrestling with voice recognition APIs. By
                    7PM, George was taking his first calls."
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  className="rounded-xl"
                />
                <div className="relative z-10">
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Tech Stack</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Next.js 15 App Router</li>
                      <li>VAPI for voice processing</li>
                      <li>Calendly API integration</li>
                      <li>Real-time transcription</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  className="rounded-xl"
                />
                <div className="relative z-10">
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
            </div>
          </div>
        </section>

        {/* Section Builders Crew */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Builders Crew</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-xl"
              />
              <div className="relative z-10">
                <ContributorCard
                  name="Thiago Bardini"
                  role="Developer"
                  links={{
                    github: "https://github.com/thiagobardini",
                    linkedin: "https://www.linkedin.com/in/thiagobardini/",
                    portfolio: "https://www.tbardini.com/",
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-xl"
              />
              <div className="relative z-10">
                <ContributorCard
                  name="George"
                  role="Developer"
                  links={{
                    portfolio: "https://www.sundai.club/",
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-xl"
              />
              <div className="relative z-10">
                <ContributorCard
                  name="Connor"
                  role="Developer"
                  links={{
                    portfolio: "https://www.sundai.club/",
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-xl"
              />
              <div className="relative z-10">
                <ContributorCard
                  name="You?"
                  role="Next Contributor"
                  links={{
                    join: "https://sundai.club/join",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section Sundai Club */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-6">About Sundai Club</h2>

          <div className="space-y-6">
            <p className="text-lg">
              Sundai Club is where{" "}
              <span className="font-semibold">AI passion meets execution</span>.
              Born from the MIT/Harvard ecosystem but open to all builders
              worldwide, we're redefining what's possible in 24 hours of focused
              hacking.
            </p>
            <div className="relative">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-xl"
              />
              <div className="relative z-10">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    🚀 Our Philosophy
                  </h2>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>No credentials required - just skills and grit</li>
                    <li>From zero to deploy in a single Sunday</li>
                    <li>Collaboration over competition</li>
                    <li>Open source by default</li>
                    <li>AI for good, not for profit</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="relative">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  className="rounded-xl"
                />
                <div className="relative z-10">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">
                      💻 Who We Are
                    </h3>
                    <p>A mix of:</p>
                    <ul className="list-disc pl-6 pb-16 mt-2 space-y-2">
                      <li>Self-taught developers</li>
                      <li>University students</li>
                      <li>Industry professionals</li>
                      <li>AI researchers</li>
                      <li>Startup founders</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  className="rounded-xl"
                />
                <div className="relative z-10">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">
                      🎯 What We Do
                    </h3>
                    <p>Every Sunday:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>10:00AM: Intro for Newbies</li>
                      <li>10:30AM: Breakfast + Mission pitching</li>
                      <li>11:00AM: Team formation</li>
                      <li>12:00PM: Development sprint</li>
                      <li>14:00PM: Checkup #1 & Lunch</li>
                      <li>21:00PM: Demo & Retrospective</li>
                      <li>22:00PM: Sundai Club ends</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <div className="relative">
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            className="rounded-xl"
          />
          <div className="relative z-10">
            <section className="text-center py-12 bg-gray-50 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Build?</h3>
              <p className="mb-8 max-w-2xl mx-auto">
                Whether you're a seasoned developer or just starting out, Sundai
                Club welcomes all who share our builder mentality.
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
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
