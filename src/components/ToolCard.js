import Link from 'next/link'

export default function ToolCard({ tool }) {
  const Icon = tool.icon

  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex flex-col rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-white dark:bg-[#2d2e30] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] dark:hover:shadow-[0_1px_6px_rgba(0,0,0,0.5)] hover:border-[#d2e3fc] dark:hover:border-[#3b78e7] transition-all duration-150 p-5 min-h-[176px] cursor-pointer"
    >
      {/* Icon chip */}

      <div className={`mb-4 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${tool.iconBg}`}>
        <Icon size={28} className={tool.iconColor} />
      </div>

      {/* Title */}
      <h2 className="font-medium text-[18px] leading-snug text-[#202124] dark:text-[#e8eaed] mb-1 tracking-[0.01em]">
        {tool.title}
      </h2>

      {/* Description */}
      <p className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6] leading-[1.5] flex-1">
        {tool.description}
      </p>

      {/* CTA */}
      <div className="mt-4 flex justify-end">
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#1a73e8] dark:text-[#669df6] group-hover:underline">
          Open tool
        </span>
      </div>
    </Link>
  )
}