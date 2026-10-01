import { resolveSourceUrl } from '@/data/sources';
import styles from './MoreLink.module.css';

export function MoreLink({ sourceId, accessibleNameKo }: { sourceId: string; accessibleNameKo: string }) {
  const { href } = resolveSourceUrl(sourceId);
  return <div className={styles.root}>
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${accessibleNameKo.replace(/공식 정보 보기|공식 정보/g, '').trim()} + MORE`}>
      <span lang="en">+ MORE</span>
    </a>
  </div>;
}
