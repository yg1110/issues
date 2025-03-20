import { useState } from "react";

interface Tab {
  label: string | React.ReactNode;
  contents: React.ReactNode;
}

interface Props {
  tabs: Tab[];
}

export default function TabList({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="relative">
      <div className="border-gray-300 px-[1rem] sticky top-[64px] bg-white z-1">
        <div className="flex justify-start gap-6 bg-bottom">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`relative py-2 px-4 text-sm font-medium transition-all 
              ${
                activeTab === index
                  ? "text-gray-800 font-semibold after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[3px] after:bg-[#f78166] after:rounded-t-md after:z-1"
                  : "text-gray-600 hover:text-gray-800 cursor-pointer"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300"></div>
      </div>
      <div className="p-4">{tabs[activeTab].contents}</div>
    </div>
  );
}
