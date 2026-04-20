function Container() {
  return (
    <div className="relative shrink-0 w-[1182px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[48px] items-start relative size-full">
        <p className="font-['Zodiak_Variable:Light_Italic',sans-serif] font-light italic leading-[20px] relative shrink-0 text-[#efdbbb] text-[14px] tracking-[-0.5px] whitespace-nowrap">Our Roots</p>
        <p className="font-['Zodiak_Variable:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#525252] text-[48px] tracking-[-1.5px] w-[1182px]">
          <span className="leading-[64px] text-white">{`Inspired by nature's unrefined beauty, we established a studio that breaks away from traditi`}</span>
          <span className="leading-[64px]">onal floristry.</span>
          <span className="leading-[64px] text-white">{` `}</span>
          <span className="leading-[64px]">We source the most exquisite, unconventional blooms. Our mission is clear: to bring the wild, poetic essence of nature into modern spaces.</span>
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex items-center px-[96px] py-[128px] relative size-full" data-name="About">
      <Container />
    </div>
  );
}