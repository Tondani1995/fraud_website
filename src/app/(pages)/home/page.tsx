import Wrapper from "@/app/Wrapper";
import CTASection from "@/components/Home/CTASection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import LeadMagnetSection from "@/components/Home/LeadMagnetSection";
import ProblemSection from "@/components/Home/ProblemSection";
import ProofSection from "@/components/Home/ProofSection";
import ServicesSection from "@/components/Home/ServicesSection";

export default function HomePg() {
    return (
        <Wrapper>
            <div>
                <HeroSection />
                <ProblemSection />
                <ServicesSection />
                <HowItWorksSection />
                <ProofSection />
                <LeadMagnetSection />
                <CTASection />
            </div>
        </Wrapper>
    )
}
