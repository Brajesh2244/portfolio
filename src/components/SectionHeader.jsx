function SectionHeader({ kicker, title, summary, icon: Icon }) {
  return (
    <div className="reveal mb-10 max-w-3xl">
      <div className="eyebrow mb-4">
        <Icon size={16} />
        {kicker}
      </div>
      <h2 className="section-title">{title}</h2>
      {summary ? <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">{summary}</p> : null}
    </div>
  );
}

export default SectionHeader;
