// app/privacy-policy/page.js
export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Tools.NP — how we collect, use, and protect your information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f1f3f4] dark:bg-[#1a1b1e]">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header card */}
        <div className="bg-white dark:bg-[#292a2d] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-8 py-8 mb-5">
          <h1 className="text-[26px] font-medium text-[#202124] dark:text-[#e8eaed] mb-1">
            Privacy Notice
          </h1>
          <p className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6]">
            Last updated: April 28, 2026
          </p>
        </div>

        {/* Intro card */}
        <Section>
          <p className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
            This Privacy Notice for <strong className="text-[#202124] dark:text-[#e8eaed]">Tools.NP</strong> ("we," "us," or "our") describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services, including when you:
          </p>
          <ul className="mt-3 space-y-1.5 list-none">
            <Li>Visit our website at <a href="https://www.shikharbasnet.com.np" className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">https://www.shikharbasnet.com.np</a> or any website of ours that links to this Privacy Notice</Li>
            <Li>Use our free online tools, calculators, and informational resources — accessible without registration — which may display third-party advertisements (such as Google AdSense)</Li>
            <Li>Engage with us in other related ways, including any marketing or events</Li>
          </ul>
          <p className="mt-4 text-[14px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
            <strong className="text-[#202124] dark:text-[#e8eaed]">Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services.
          </p>
        </Section>

        {/* TOC */}
        <Section title="Table of Contents">
          <nav className="space-y-1">
            {[
              ['#infocollect',    '1. What Information Do We Collect?'],
              ['#infouse',        '2. How Do We Process Your Information?'],
              ['#whoshare',       '3. When and With Whom Do We Share Your Personal Information?'],
              ['#cookies',        '4. Do We Use Cookies and Other Tracking Technologies?'],
              ['#intltransfers',  '5. Is Your Information Transferred Internationally?'],
              ['#inforetain',     '6. How Long Do We Keep Your Information?'],
              ['#privacyrights',  '7. What Are Your Privacy Rights?'],
              ['#DNT',            '8. Controls for Do-Not-Track Features'],
              ['#policyupdates',  '9. Do We Make Updates to This Notice?'],
              ['#contact',        '10. How Can You Contact Us About This Notice?'],
              ['#request',        '11. How Can You Review, Update, or Delete the Data We Collect From You?'],
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
        <Section id="infocollect" title="1. What Information Do We Collect?">
          <H3>Personal information you disclose to us</H3>
          <Italic>We collect personal information that you provide to us.</Italic>
          <Body>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</Body>
          <Body className="mt-2"><strong className="text-[#202124] dark:text-[#e8eaed]">Personal Information Provided by You</strong> may include: names, phone numbers, email addresses, mailing addresses, job titles, usernames, passwords, contact preferences, billing addresses, contact or authentication data, and debit/credit card numbers.</Body>
          <Body className="mt-2"><strong className="text-[#202124] dark:text-[#e8eaed]">Sensitive Information.</strong> When necessary, with your consent or as otherwise permitted by applicable law, we process sensitive categories of personal information. All personal information you provide must be true, complete, and accurate.</Body>

          <H3 className="mt-5">Information automatically collected</H3>
          <Italic>Some information — such as your IP address and/or browser and device characteristics — is collected automatically when you visit our Services.</Italic>
          <Body className="mt-2">We automatically collect certain information when you visit, use, or navigate the Services. This may include your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and how and when you use our Services. This information is primarily needed to maintain security and operation of our Services and for internal analytics.</Body>
          <Body className="mt-2">Like many businesses, we also collect information through cookies and similar technologies. The information we collect includes:</Body>
          <ul className="mt-2 space-y-1.5">
            <Li><strong className="text-[#202124] dark:text-[#e8eaed]">Log and Usage Data</strong> — IP address, device information, browser type, pages viewed, searches, date/time stamps, and other activity in the Services.</Li>
            <Li><strong className="text-[#202124] dark:text-[#e8eaed]">Device Data</strong> — Computer, phone, tablet, or other device information including hardware model, OS, browser type, ISP/mobile carrier.</Li>
            <Li><strong className="text-[#202124] dark:text-[#e8eaed]">Location Data</strong> — Your device's location (precise or imprecise). You may opt out by disabling location settings on your device.</Li>
          </ul>
        </Section>

        {/* 2 */}
        <Section id="infouse" title="2. How Do We Process Your Information?">
          <Italic>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</Italic>
          <Body className="mt-2">We process your personal information for a variety of reasons depending on how you interact with our Services, including providing and improving Services, communicating with you, preventing fraud, and complying with applicable laws.</Body>
        </Section>

        {/* 3 */}
        <Section id="whoshare" title="3. When and With Whom Do We Share Your Personal Information?">
          <Italic>We may share information in specific situations and with specific third parties.</Italic>
          <Body className="mt-2">We may need to share your personal information in the following situations:</Body>
          <ul className="mt-2 space-y-1.5">
            <Li><strong className="text-[#202124] dark:text-[#e8eaed]">Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</Li>
          </ul>
        </Section>

        {/* 4 */}
        <Section id="cookies" title="4. Do We Use Cookies and Other Tracking Technologies?">
          <Italic>We may use cookies and other tracking technologies to collect and store your information.</Italic>
          <Body className="mt-2">We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some help us maintain security, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</Body>
          <Body className="mt-2">We also permit third parties and service providers (including Google AdSense) to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements tailored to your interests.</Body>
        </Section>

        {/* 5 */}
        <Section id="intltransfers" title="5. Is Your Information Transferred Internationally?">
          <Italic>We may transfer, store, and process your information in countries other than your own.</Italic>
          <Body className="mt-2">Please be aware that your information may be transferred to, stored by, and processed by us in our facilities and in the facilities of third parties with whom we may share your personal information, which may be in other countries.</Body>
          <Body className="mt-2">If you are a resident in the EEA, UK, or Switzerland, those countries may not have data protection laws as comprehensive as your own. However, we will take all necessary measures to protect your personal information in accordance with this Privacy Notice and applicable law.</Body>
        </Section>

        {/* 6 */}
        <Section id="inforetain" title="6. How Long Do We Keep Your Information?">
          <Italic>We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</Italic>
          <Body className="mt-2">We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need, we will either delete or anonymize your information.</Body>
        </Section>

        {/* 7 */}
        <Section id="privacyrights" title="7. What Are Your Privacy Rights?">
          <Italic>You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</Italic>
          <Body className="mt-2"><strong className="text-[#202124] dark:text-[#e8eaed]">Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time by contacting us using the contact details provided in section 10 below. Please note this will not affect the lawfulness of processing before its withdrawal.</Body>
        </Section>

        {/* 8 */}
        <Section id="DNT" title="8. Controls for Do-Not-Track Features">
          <Body>Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature you can activate to signal your privacy preference. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals. If a standard is adopted that we must follow in the future, we will inform you in a revised version of this Privacy Notice.</Body>
        </Section>

        {/* 9 */}
        <Section id="policyupdates" title="9. Do We Make Updates to This Notice?">
          <Italic>Yes, we will update this notice as necessary to stay compliant with relevant laws.</Italic>
          <Body className="mt-2">We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top. If we make material changes, we may notify you by prominently posting a notice or by directly sending you a notification. We encourage you to review this Privacy Notice frequently.</Body>
        </Section>

        {/* 10 */}
        <Section id="contact" title="10. How Can You Contact Us About This Notice?">
          <Body>If you have questions or comments about this notice, you may contact us by post at:</Body>
          <div className="mt-3 px-4 py-3 rounded-lg bg-[#f8f9fa] dark:bg-[#35363a] text-[14px] text-[#3c4043] dark:text-[#bdc1c6]">
            <p className="font-medium text-[#202124] dark:text-[#e8eaed]">Tools.NP</p>
            <p>Nepal</p>
            <a href="mailto:shikharbasnet123@gmail.com"
              className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline">
              shikharbasnet123@gmail.com
            </a>
          </div>
        </Section>

        {/* 11 */}
        <Section id="request" title="11. How Can You Review, Update, or Delete the Data We Collect From You?">
          <Body>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing. To request to review, update, or delete your personal information, please contact us at the email above.</Body>
        </Section>

        <p className="mt-6 text-center text-[12px] text-[#9aa0a6] dark:text-[#5f6368]">
          This Privacy Policy was created using Termly's Privacy Policy Generator.
        </p>

      </div>
    </div>
  )
}

// ── Shared sub-components ──────────────────────────────────────────────────

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

function H3({ children, className = '' }) {
  return (
    <h3 className={`text-[14px] font-semibold text-[#202124] dark:text-[#e8eaed] mb-1.5 ${className}`}>
      {children}
    </h3>
  )
}

function Italic({ children }) {
  return (
    <p className="text-[13px] italic text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed border-l-2 border-[#1a73e8] dark:border-[#8ab4f8] pl-3 mb-2">
      {children}
    </p>
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