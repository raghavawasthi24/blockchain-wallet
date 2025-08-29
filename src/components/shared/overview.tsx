export default function Overview() {
  return (
    <div className="bg-[#27272A] p-4 rounded-2xl">
      <div className="w-1/2 flex flex-col justify-between gap-16">
        <div>
          <p className="font-light mb-4 text-[#A1A1AA]">Portfolio Total</p>
          <p className="text-5xl">$10,275.08</p>
        </div>
        <p className="font-light text-[#A1A1AA]">Last updated: 3:42:12 PM</p>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}
