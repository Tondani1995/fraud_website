import Wrapper from '@/app/Wrapper'
import AwarenessResilienceSection from '@/components/Services/AwarenessResilienceSection'
import EngagementOptionsSection from '@/components/Services/EngagementOptionsSection'
import FraudHealthCheckSection from '@/components/Services/FraudHealthCheckSection'
import FraudProgrammeDesignSection from '@/components/Services/FraudProgrammeDesignSection'
import InternalFraudControlsSection from '@/components/Services/InternalFraudControlsSection'
import ServicesHero from '@/components/Services/ServicesHero'
import ThreatIntelligenceSection from '@/components/Services/ThreatIntelligenceSection'
import React from 'react'

export default function page() {
    return (
        <Wrapper>
            <div>
                <ServicesHero />
                <FraudHealthCheckSection />
                <ThreatIntelligenceSection />
                <FraudProgrammeDesignSection />
                <AwarenessResilienceSection />
                <InternalFraudControlsSection />
                <EngagementOptionsSection />
            </div>
        </Wrapper>
    )
}
