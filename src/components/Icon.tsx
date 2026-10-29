import {
  ArrowUpRight, Award, BedDouble, Bot, Briefcase, Building2, Castle, ChartColumn, Clapperboard, Clock, Coins,
  Factory, FileText, FolderOpen, Gem, Globe, GraduationCap, Hammer, HeartPulse, House, Landmark, Layers,
  LayoutTemplate, Link2, LockOpen, Mail, Map, MapPin, MapPinned, Megaphone, MessageCircle, MonitorSmartphone,
  Mountain, MousePointerClick, Palette, PenLine, Plane, Rocket, Search, Ship, ShoppingCart, Sparkles,
  Stethoscope, Sun, Target, TrainFront, TriangleAlert, Trophy, Users, Video, Wallet,
  type LucideIcon,
} from 'lucide-react';

/* Line icons replace the theme's emoji, which rendered differently on every
   device and made the design look less consistent. */
const ICONS: Record<string, LucideIcon> = {
  // services
  'svc:seo': Search, 'svc:ppc': MousePointerClick, 'svc:social-media': Megaphone,
  'svc:web-design': MonitorSmartphone, 'svc:local-seo': MapPin, 'svc:content': PenLine,
  // courses
  'course:digital-marketing': Rocket, 'course:seo': Search, 'course:social-media-marketing': Megaphone,
  'course:ai-marketing': Bot, 'course:graphic-design': Palette, 'course:content-writing': PenLine,
  'course:canva-design': LayoutTemplate, 'course:ai-basics': Sparkles, 'course:wordpress': Globe,
  'course:video-editing': Clapperboard, 'course:freelancing': Briefcase, 'course:meta-ads-basics': Target,
  // industries
  'ind:travel-tourism': Plane, 'ind:ecommerce': ShoppingCart, 'ind:cosmetics': Gem, 'ind:medical': Stethoscope,
  'ind:schools': GraduationCap, 'ind:hotels': BedDouble, 'ind:clinics': HeartPulse, 'ind:real-estate': House,
  // cities
  'city:karachi': Ship, 'city:lahore': Landmark, 'city:islamabad': Building2, 'city:rawalpindi': TrainFront,
  'city:peshawar': Castle, 'city:quetta': Mountain, 'city:faisalabad': Factory, 'city:multan': Sun,
  // generic
  briefcase: Briefcase, award: Award, folder: FolderOpen, file: FileText, video: Video, users: Users,
  wallet: Wallet, clock: Clock, hammer: Hammer, upgrade: ArrowUpRight, trophy: Trophy, local: MapPinned,
  chart: ChartColumn, map: Map, layers: Layers, unlock: LockOpen, link: Link2, coins: Coins, search: Search,
  pin: MapPin, pen: PenLine, chat: MessageCircle, mail: Mail, alert: TriangleAlert, grad: GraduationCap,
};

/* The course "includes" cards are keyed by their title. */
const INCLUDE_ICONS: Record<string, string> = {
  'Free internship': 'briefcase', 'Free certificate': 'award', 'Portfolio you keep': 'folder',
  'Written reference': 'file', 'Session recordings': 'video', 'Small batches': 'users',
  'Low fee, one payment': 'wallet', 'Two to three weeks': 'clock', 'Work on your own project': 'hammer',
  'Credit towards a full course': 'upgrade',
};
export const includeIcon = (title: string) => INCLUDE_ICONS[title] ?? 'award';

export default function Icon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  const C = ICONS[name] ?? Sparkles;
  return <C size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}

export { WhatsAppIcon } from './WhatsAppIcon';
