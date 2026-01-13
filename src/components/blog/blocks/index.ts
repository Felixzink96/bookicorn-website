// Block Components for Sanity Portable Text
import { Callout } from './Callout'
import { Stats } from './Stats'
import { ProConList } from './ProConList'
import { FeatureList } from './FeatureList'
import { CTAButton } from './CTAButton'
import { Accordion } from './Accordion'
import { CodeBlock } from './CodeBlock'
import { Quote } from './Quote'
import { Divider } from './Divider'
import { ComparisonTable } from './ComparisonTable'
import { Video } from './Video'
import { Gallery } from './Gallery'
import { Timeline } from './Timeline'
import { PersonCard } from './PersonCard'
import { FileDownload } from './FileDownload'
import { Table } from './Table'
import { InfoBox } from './InfoBox'
import { PricingCard } from './PricingCard'
import { Embed } from './Embed'

// Re-export individual components
export {
  Callout,
  Stats,
  ProConList,
  FeatureList,
  CTAButton,
  Accordion,
  CodeBlock,
  Quote,
  Divider,
  ComparisonTable,
  Video,
  Gallery,
  Timeline,
  PersonCard,
  FileDownload,
  Table,
  InfoBox,
  PricingCard,
  Embed,
}

// Export all components as a map for easy PortableText integration
export const customBlockComponents = {
  callout: Callout,
  stats: Stats,
  proConList: ProConList,
  featureList: FeatureList,
  ctaButton: CTAButton,
  accordion: Accordion,
  codeBlock: CodeBlock,
  quote: Quote,
  divider: Divider,
  comparisonTable: ComparisonTable,
  video: Video,
  gallery: Gallery,
  timeline: Timeline,
  personCard: PersonCard,
  fileDownload: FileDownload,
  table: Table,
  infoBox: InfoBox,
  pricingCard: PricingCard,
  embed: Embed,
}
