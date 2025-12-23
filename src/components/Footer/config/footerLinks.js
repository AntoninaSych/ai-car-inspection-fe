import { ROUTERS } from '../../../constants';

export const footerLinks = [
  {
    title: 'footer.sections.product.title',
    links: [
      { labelKey: 'footer.sections.product.links.faq', href: ROUTERS.FAQ },
      { labelKey: 'footer.sections.product.links.pricing', href: '/pricing' },
      { labelKey: 'footer.sections.product.links.api', href: '/api' },
      { labelKey: 'footer.sections.product.links.mobile', href: '/app' },
    ],
  },
  {
    title: 'footer.sections.company.title',
    links: [
      { labelKey: 'footer.sections.company.links.about', href: '/about' },
      { labelKey: 'footer.sections.company.links.careers', href: '/careers' },
      { labelKey: 'footer.sections.company.links.blog', href: '/blog' },
      { labelKey: 'footer.sections.company.links.contact', href: '/contact' },
    ],
  },
  {
    title: 'footer.sections.legal.title',
    links: [
      { labelKey: 'footer.sections.legal.links.privacy', href: ROUTERS.PP },
      { labelKey: 'footer.sections.legal.links.terms', href: ROUTERS.TERMS },
      { labelKey: 'footer.sections.legal.links.cookies', href: '/cookies' },
      { labelKey: 'footer.sections.legal.links.gdpr', href: '/gdpr' },
    ],
  },
];
