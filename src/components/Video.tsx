import { Controls, DefaultUi, Video as VideoPlayer, PipControl, Player, Ui, Youtube } from "@vime/react";
import { LinkedinLogo, WhatsappLogo } from "phosphor-react";

import '@vime/core/themes/default.css'
import { useGetLessonBySlugQuery } from "../graphql/generated";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface VideoProps {
  lessonSlug: string;
  locale: string;
}

export function Video(props: VideoProps) {
  const [language, setLanguage] = useState();

  useEffect(() => {
    setLanguage(localStorage.getItem('@language_cv') as any);
  }, []);

  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: props.lessonSlug,
      locale: language as any
    }
  });

  if (!data || !data?.lesson) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  console.log(`a`, data)
  return (
    <div className="flex-1">
      <>
        <div className="bg-black flex justify-center">
          <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
            {data.lesson.title === "My Future" || data.lesson.title === "Meu Futuro" ? (
              <Player>
                <Youtube videoId="SC4xMk98Pdc" />
                <DefaultUi />
              </Player>
            ) : (
              <Player>
                <VideoPlayer crossOrigin="" poster="../assets/welcome-bemvindo.png">
                  <source
                    data-src={data.lesson.videoId}
                    type="video/mp4"
                  />
                </VideoPlayer>
                <DefaultUi />
              </Player>
            )}
          </div>
        </div>

        <div className="p-8 max-w-[1100px] mx-auto">
          <div className="flex items-start gap-16">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {data.lesson.title}
              </h1>
              <p className="mt-4 text-gray-200 leading-relaxed">
                {data.lesson.description}
              </p>

              {data.lesson.teacher && (
                <div className="flex items-center gap-4 mt-6">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                    src={data.lesson.teacher.avatarURL}
                    alt={data.lesson.teacher.name}
                  />

                  <div className="leading-relaxed">
                    <strong className="font-bold text-2xl block">
                      {data.lesson.teacher.name}
                    </strong>
                    <span className="text-gray-200 text-sm block">
                      {data.lesson.teacher.bio}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <a href="https://wa.me/+5521975854490" target="_blank" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                <WhatsappLogo size={24} />
                {language === 'pt_BR' ? 'Converse comigo no WhatsApp' : 'Talk to me on WhatsApp'}
              </a>

              <a href="https://www.linkedin.com/in/wanderhungerbuhler/" target="_blank" className="p-4 text-sm border border-blue-600 bg-blue-600 text-gray-100 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-700 hover:text-gray-100 transition-colors">
                <LinkedinLogo size={24} />
                {language === 'pt_BR' ? 'Converse comigo no LinkedIn' : 'Talk to me on LinkedIn'}
              </a>
            </div>
          </div>

          {/* <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material Complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers Exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div> */}
        </div>
      </>
    </div>
  )
}
