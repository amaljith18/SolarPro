export interface LegalDoc {
  title: string;
  updated: string;
  sections: Array<{ heading: string; text: string }>;
}

export const privacyPolicy: LegalDoc = {
  title: 'Privacy Policy',
  updated: '2024-01-15',
  sections: [
    {
      heading: 'Information we collect',
      text: 'When you request a quote we collect the details you enter — your name, email address, phone number, property type and message. We do not collect payment information on this website.',
    },
    {
      heading: 'How we use it',
      text: 'We use your information only to respond to your enquiry, prepare a proposal and, if you become a customer, to deliver and support your solar system.',
    },
    {
      heading: 'Sharing',
      text: 'We never sell your personal information. We share it only with service providers who help us operate our business, under confidentiality obligations.',
    },
    {
      heading: 'Your choices',
      text: 'You can ask us at any time to access, correct or delete the personal information we hold about you by contacting info@solarpro.com.',
    },
  ],
};

export const termsAndConditions: LegalDoc = {
  title: 'Terms & Conditions',
  updated: '2024-01-15',
  sections: [
    {
      heading: 'Use of this website',
      text: 'The content on this website is provided for general information. Savings figures and timelines are estimates and vary with location, usage and system design.',
    },
    {
      heading: 'Quotes',
      text: 'Quotes are valid for 30 days and are subject to a site survey. Final pricing is confirmed in your written installation agreement.',
    },
    {
      heading: 'Warranties',
      text: 'Equipment warranties are provided by manufacturers. Our workmanship warranty terms are set out in your installation agreement.',
    },
    {
      heading: 'Contact',
      text: 'Questions about these terms can be sent to info@solarpro.com.',
    },
  ],
};
