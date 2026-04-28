// app/terms/page.js
import Link from 'next/link'

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for using Tools.NP — free online tools for Nepal.',
}

const EFFECTIVE_DATE = 'April 28, 2026'
const CONTACT_EMAIL  = 'shikharbasnet123@gmail.com'
const SITE_URL       = 'https://www.shikharbasnet.com.np'
const SITE_NAME      = 'Tools.NP'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f1f3f4] dark:bg-[#1a1b1e]">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="bg-white dark:bg-[#292a2d] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-8 py-8 mb-5">
          <h1 className="text-[26px] font-medium text-[#202124] dark:text-[#e8eaed] mb-1">
            Terms & Conditions
          </h1>
          <p className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6]">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>

        {/* Intro */}
        <Section>
          <Body>
            Welcome to <strong className="text-[#202124] dark:text-[#e8eaed]">{SITE_NAME}</strong> ({SITE_URL}). By accessing or using our website and tools, you agree to be bound by these Terms & Conditions. Please read them carefully. If you do not agree, please do not use our Services.
          </Body>
        </Section>

        {/* TOC */}
        <Section title="Table of Contents">
          <nav className="space-y-1">
            {[
              ['#acceptance',    '1. Acceptance of Terms'],
              ['#services',      '2. Description of Services'],
              ['#use',           '3. Acceptable Use'],
              ['#ip',            '4. Intellectual Property'],
              ['#disclaimer',    '5. Disclaimer of Warranties'],
              ['#liability',     '6. Limitation of Liability'],
              ['#accuracy',      '7. Accuracy of Information'],
              ['#ads',           '8. Third-Party Advertising'],
              ['#links',         '9. Third-Party Links'],
              ['#privacy',       '10. Privacy'],
              ['#changes',       '11. Changes to These Terms'],
              ['#governing',     '12. Governing Law'],
              ['#contact-terms', '13. Contact Us'],
            ].map(([href, label]) => (
              <a key={href} href={href}
                className="flex items-center gap-2 text-[14px] text-[#1a73e8] dark:text-[#8ab4f8] hover:underline py-0.5">
                <span className="w-1 h-1 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8] shrink-0" />
                {label}
              </a>
            ))}
          </nav>
        </Section>

        {/* 1 */}
        <Section id="acceptance" title="1. Acceptance of Terms">
          <Body>By visiting, browsing, or using any tool on {SITE_NAME}, you confirm that you are at least 13 years of age, have read and understood these Terms, and agree to be legally bound by them. If you are using the Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</Body>
        </Section>

        {/* 2 */}
        <Section id="services" title="2. Description of Services">
          <Body>
            {SITE_NAME} provides a collection of free online tools and calculators designed specifically for users in Nepal, including but not limited to:
          </Body>
          <ul className="mt-3 space-y-1.5">
            {[
              'BS / AD Date Converter',
              'Age Calculator',
              'GPA & Percentage Calculator',
              'Land Unit Converter (Ropani, Aana, Bigha, Kattha, etc.)',
              'NEPSE Share Profit/Loss Calculator',
              'Salary & Income Tax Calculator (as per Nepal IRD rules)',
              'VAT Calculator (13% Nepal)',
              'Gold Price Calculator',
            ].map(s => <Li key={s}>{s}</Li>)}
          </ul>
          <Body className="mt-3">All tools are provided free of charge and do not require user registration. We reserve the right to add, modify, or discontinue any tool at any time without notice.</Body>
        </Section>

        {/* 3 */}
        <Section id="use" title="3. Acceptable Use">
          <Body>You agree to use {SITE_NAME} only for lawful purposes. You must not:</Body>
          <ul className="mt-3 space-y-1.5">
            <Li>Use the Services in any way that violates applicable local, national, or international laws or regulations</Li>
            <Li>Attempt to gain unauthorized access to any part of the website, its servers, or any connected systems</Li>
            <Li>Use automated tools (bots, scrapers, crawlers) to access or extract data from the Services without prior written permission</Li>
            <Li>Reproduce, distribute, or commercially exploit any part of the Services without our express written consent</Li>
            <Li>Transmit any harmful, offensive, or disruptive content through or in connection with the Services</Li>
            <Li>Attempt to interfere with the proper functioning of the website or its infrastructure</Li>
          </ul>
        </Section>

        {/* 4 */}
        <Section id="ip" title="4. Intellectual Property">
          <Body>All content on {SITE_NAME} — including text, code, design, logos, graphics, and tool outputs — is the property of {SITE_NAME} or its content suppliers and is protected by applicable intellectual property laws. You may use the outputs of our tools for personal, non-commercial purposes. You may not copy, reproduce, modify, distribute, or create derivative works from any part of our website without our prior written consent.</Body>
        </Section>

        {/* 5 */}
        <Section id="disclaimer" title="5. Disclaimer of Warranties">
          <Body>The Services and all tools are provided on an <strong className="text-[#202124] dark:text-[#e8eaed]">"as is" and "as available"</strong> basis without any warranties of any kind, either express or implied, including but not limited to:</Body>
          <ul className="mt-3 space-y-1.5">
            <Li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</Li>
            <Li>Warranties that the Services will be uninterrupted, error-free, or free of viruses or harmful components</Li>
            <Li>Warranties regarding the accuracy, reliability, or completeness of any information provided by the tools</Li>
          </ul>
          <Body className="mt-3">Use of any tool result for financial, legal, medical, or other critical decisions is entirely at your own risk. Always verify results with a qualified professional.</Body>
        </Section>

        {/* 6 */}
        <Section id="liability" title="6. Limitation of Liability">
          <Body>To the fullest extent permitted by law, {SITE_NAME} and its owners, contributors, and operators shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from:</Body>
          <ul className="mt-3 space-y-1.5">
            <Li>Your use of or inability to use the Services or any tool</Li>
            <Li>Any errors, inaccuracies, or omissions in tool results or content</Li>
            <Li>Any financial, tax, or investment decisions made based on tool outputs</Li>
            <Li>Unauthorized access to or alteration of your data</Li>
            <Li>Any other matter relating to the Services</Li>
          </ul>
        </Section>

        {/* 7 */}
        <Section id="accuracy" title="7. Accuracy of Information">
          <Body>{SITE_NAME} strives to provide accurate and up-to-date calculations based on publicly available Nepal government rules, IRD regulations, NEPSE guidelines, and standard conversion rates. However:</Body>
          <ul className="mt-3 space-y-1.5">
            <Li>Tax rates, NEPSE fees, and government regulations change periodically — tool results may not always reflect the most current rates</Li>
            <Li>Gold prices shown are indicative only and may differ from the current market or official Bankers' Association rates</Li>
            <Li>Date conversions are based on standard BS/AD conversion tables which may have minor regional variations</Li>
          </ul>
          <Body className="mt-3">We recommend verifying important calculations with official sources such as the <a href="https://ird.gov.np" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">Inland Revenue Department</a>, <a href="https://www.nepalstock.com.np" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">Nepal Stock Exchange</a>, or your financial advisor.</Body>
        </Section>

        {/* 8 */}
        <Section id="ads" title="8. Third-Party Advertising">
          <Body>{SITE_NAME} displays advertisements served by Google AdSense and potentially other third-party ad networks. By using our Services, you acknowledge that:</Body>
          <ul className="mt-3 space-y-1.5">
            <Li>Third-party advertisers may use cookies and tracking technologies to serve relevant ads</Li>
            <Li>We do not control the content of third-party advertisements</Li>
            <Li>We are not responsible for the products, services, or claims of third-party advertisers</Li>
            <Li>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">Google Ads Settings</a></Li>
          </ul>
        </Section>

        {/* 9 */}
        <Section id="links" title="9. Third-Party Links">
          <Body>Our Services may contain links to external websites or resources. These links are provided for convenience only. {SITE_NAME} has no control over, and accepts no responsibility for, the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any external sites you visit.</Body>
        </Section>

        {/* 10 */}
        <Section id="privacy" title="10. Privacy">
          <Body>Your use of {SITE_NAME} is also governed by our{' '}
            <Link href="/privacy-policy" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference. By using our Services, you consent to the data practices described in our Privacy Policy.
          </Body>
        </Section>

        {/* 11 */}
        <Section id="changes" title="11. Changes to These Terms">
          <Body>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. The "Effective date" at the top of this page will be updated accordingly. Your continued use of the Services after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.</Body>
        </Section>

        {/* 12 */}
        <Section id="governing" title="12. Governing Law">
          <Body>These Terms shall be governed by and construed in accordance with the laws of <strong className="text-[#202124] dark:text-[#e8eaed]">Nepal</strong>, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Nepal.</Body>
        </Section>

        {/* 13 */}
        <Section id="contact-terms" title="13. Contact Us">
          <Body>If you have any questions about these Terms & Conditions, please contact us:</Body>
          <div className="mt-3 px-4 py-3 rounded-lg bg-[#f8f9fa] dark:bg-[#35363a] text-[14px] text-[#3c4043] dark:text-[#bdc1c6]">
            <p className="font-medium text-[#202124] dark:text-[#e8eaed]">Tools.NP</p>
            <p>Nepal</p>
            <a href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>
        </Section>

        <p className="mt-6 text-center text-[12px] text-[#9aa0a6] dark:text-[#5f6368]">
          Tools.NP · These Terms were last updated on {EFFECTIVE_DATE}
        </p>

      </div>
    </div>
  )
}

// ── Shared sub-components (same as privacy-policy) ─────────────────────────

function Section({ id, title, children }) {
  return (
    <div id={id} className="bg-white dark:bg-[#292a2d] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-6 py-6 mb-4 scroll-mt-20">
      {title && (
        <h2 className="text-[16px] font-medium text-[#202124] dark:text-[#e8eaed] mb-3 pb-3 border-b border-[#e8eaed] dark:border-[#404144]">
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}

function Body({ children, className = '' }) {
  return (
    <p className={`text-[14px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed ${className}`}>
      {children}
    </p>
  )
}

function Li({ children }) {
  return (
    <li className="flex gap-2.5 text-[14px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#dadce0] dark:bg-[#5f6368] shrink-0" />
      <span>{children}</span>
    </li>
  )
}