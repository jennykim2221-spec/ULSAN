import { Story } from '@/components/story/Story';
import { uiCopy } from '@/data/copy';

export default function Home() {
  return <>
    <a className="skipLink" href="#story-content">{uiCopy.skipToContent.ko}</a>
    <main id="story-content" tabIndex={-1}><Story /></main>
  </>;
}
