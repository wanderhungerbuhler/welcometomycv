import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Event() {
  const navigation = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [language, setLanguage] = useState();

  const l = localStorage.getItem('@language_cv');

  if (!l) {
    localStorage.setItem('@language_cv', "en");
  }

  if (!slug) {
    navigation('/welcome/who-i-am')
  }

  useEffect(() => {
    const language = localStorage.getItem('@language_cv');
    setLanguage(language as any);
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug
          ? <Video lessonSlug={slug} locale={`${language}`} />
          : <div className="flex-1"></div>}
        <Sidebar locale={`${language}`} />
      </main>
    </div>
  )
}
