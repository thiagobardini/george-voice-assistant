import { GlowingEffect } from "@/components/ui/GlowingEffect";
import Home from "@/app/(home)/home";

export default async function Page() {
  return (
    <>
      <div className="relative">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative z-10">
          <Home />
        </div>
      </div>
    </>
  );
}
