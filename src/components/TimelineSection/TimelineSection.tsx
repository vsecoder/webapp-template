import styles from './TimelineSection.module.css';
import { Timeline } from '@telegram-apps/telegram-ui';

interface TimelineItem {
  header: string;
  description: string;
}

interface TimelineSectionProps {
  items: TimelineItem[];
  active: number;
}

export const TimelineSection = ({ items = [], active = 0 }: TimelineSectionProps) => (
  <Timeline className={styles.timeline} active={active}>
    {items.map((item, index) => (
      <Timeline.Item key={index} header={item.header}>
        {item.description}
      </Timeline.Item>
    ))}
  </Timeline>
);
