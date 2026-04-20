import svgPaths from "./svg-55lg8z247s";
import imgImageAbstractDarkFloralBackground from "figma:asset/d385b964a899b28b980af92936ecc5709ade0dad.png";

function ImageAbstractDarkFloralBackground() {
  return (
    <div className="absolute inset-0 opacity-40" data-name="Image (Abstract Dark Floral Background)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageAbstractDarkFloralBackground} />
    </div>
  );
}

function Container() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-0 to-[#0a0a0a] via-1/2 via-[rgba(10,10,10,0.5)]" data-name="Container" />;
}

function Container1() {
  return <div className="bg-[#525252] h-[48px] shrink-0 w-px" data-name="Container" />;
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[31.5px] content-stretch flex flex-col gap-[16px] items-center left-[calc(50%-0.63px)] w-[143px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-w-full not-italic relative shrink-0 text-[#737373] text-[12px] tracking-[1.2px] uppercase w-[min-content]">Scroll to explore</p>
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[32px] relative shrink-0 text-[24px] tracking-[-1px] w-full whitespace-nowrap" data-name="Container">
      <p className="font-['Zodiak_Variable:Light_Italic',sans-serif] font-light italic relative shrink-0 text-white">Bespoke floral</p>
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#efdbbb]" style={{ fontVariationSettings: "'wdth' 100" }}>{` designed to stand out.`}</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-center w-full">
      <Container2 />
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[24px] opacity-60 relative shrink-0 text-[#d4d4d4] text-[16px] tracking-[0.0703px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        We are a floral studio crafting wild, botanical experiences for weddings, events, and spaces.
      </p>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[999px] shrink-0" data-name="Link">
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Contact us
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[16px] items-center left-1/2 top-1/2 w-[472px]">
      <Frame2 />
      <Link />
    </div>
  );
}

function Hero1() {
  return (
    <div className="absolute bg-[#0a0a0a] inset-0 overflow-clip" data-name="Hero">
      <ImageAbstractDarkFloralBackground />
      <Container />
      <Frame3 />
      <Frame />
    </div>
  );
}

function Navbar() {
  return (
    <div className="h-[28px] relative shrink-0 w-[140.992px]" data-name="Navbar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-white top-0 tracking-[-1.4492px] uppercase whitespace-nowrap">Wilde Flower.</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex gap-[4px] items-center justify-center pl-[8px] pr-[6px] py-[4px] relative rounded-[999px] shrink-0" data-name="Link">
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Blooms
      </p>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon/chevron down">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.792px] left-1/2 top-[calc(50%-0.1px)] w-[8.335px]" data-name="Artwork">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33458 4.79229">
            <path d={svgPaths.p3668ce70} fill="var(--fill-0, white)" id="Artwork" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Link">
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        About
      </p>
    </div>
  );
}

function Link3() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Link">
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Services
      </p>
    </div>
  );
}

function Link4() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Link">
      <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Contact
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative rounded-[999px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[999px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Contact us
        </p>
      </div>
    </div>
  );
}

function Navbar1() {
  return (
    <div className="relative shrink-0" data-name="Navbar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Frame1 />
        <Link5 />
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="relative shrink-0 w-full" data-name="Menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[12px] relative size-full">
          <Navbar />
          <Navbar1 />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="hero">
      <Hero1 />
      <Menu />
    </div>
  );
}