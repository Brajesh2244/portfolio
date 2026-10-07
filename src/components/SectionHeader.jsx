function SectionHeader({ kicker, title, summary, icon: Icon }) {
  return (
    <div className="reveal mb-7 max-w-3xl">
      <div className="eyebrow mb-3">
        <Icon size={15} />
        {kicker}
      </div>
      <h2 className="section-title">{title}</h2>
      {summary ? <p className="mt-3 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-white/65">{summary}</p> : null}
    </div>
  );
}

export default SectionHeader;
