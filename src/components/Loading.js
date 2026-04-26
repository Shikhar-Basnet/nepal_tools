export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f1f3f4] dark:bg-[#111111] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">

        {/* Google-style spinning circle */}
        <div className="w-10 h-10 rounded-full border-4 border-[#e8eaed] dark:border-[#3c4043] border-t-[#1a73e8] dark:border-t-[#669df6] animate-spin" />

        <p className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6]">
          Loading...
        </p>

      </div>
    </div>
  )
}