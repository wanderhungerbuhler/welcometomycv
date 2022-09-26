import { useEffect, useState } from "react";
import { LogoENUS } from "./Logo_ENUS";
import { LogoPTBR } from "./Logo_PTBR";

export function Header() {
  const [language, setLanguage] = useState("en");

  function handleSelectLanguage(event: any) {
    const language = localStorage.setItem('@language_cv', event);
    setLanguage(language as any);
    location.reload();
  }

  useEffect(() => {
    const language = localStorage.getItem('@language_cv');
    setLanguage(language as any)
  }, [language])

  return (
    <header className="w-full py-5 flex p-8 items-center justify-center bg-gray-700 border-b border-gray-600">

      <div className="w-[1100px] flex justify-between">
        {language === 'pt_BR' ? <LogoPTBR /> : <LogoENUS />}

        <div>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(event) => handleSelectLanguage(event?.target?.value as any)} value={`${language}`}>
            <option value="en">EN</option>
            <option value="pt_BR">PT</option>
          </select>
        </div>
      </div>
    </header>
  )
}
