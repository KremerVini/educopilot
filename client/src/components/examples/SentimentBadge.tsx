import SentimentBadge from '../SentimentBadge';

export default function SentimentBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <SentimentBadge sentiment="positive" confidence={92} />
      <SentimentBadge sentiment="neutral" confidence={78} />
      <SentimentBadge sentiment="negative" confidence={85} />
      <SentimentBadge sentiment="alert" confidence={95} />
    </div>
  );
}
