import { useEffect, useState } from 'react';
import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import ptBR from 'date-fns/locale/pt-BR'
import enUS from 'date-fns/esm/locale/en-US/index.js';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class'
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const [language, setLanguage] = useState();

  useEffect(() => {
    setLanguage(localStorage.getItem('@language_cv') as any);
  }, []);

  const isLessonAvailable = isPast(props.availableAt)
  const availableDateFormatted = format(props.availableAt, "EEEE' 'd' de ' MMMM' 'k'h'mm", {
    locale: language === 'pt_BR' ? ptBR : enUS
  })

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/welcome/${props?.slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted.toString()}
      </span>

      <div
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-orange-500', {
          'border-orange-500': isActiveLesson,
        })}
      >
        <header className="flex items-center justify-between">

          {isLessonAvailable ? (
            <span className="flex items-center gap-2 text-sm font-medium text-green-500">
              <CheckCircle size={20} />
              {language === 'pt_BR' ? 'Conteúdo disponível' : 'Available content'}
            </span>
          ) : (
            <span className="text-orange-500 flex items-center gap-2 text-sm font-medium">
              <Lock size={20} />
              {language === 'pt_BR' ? 'Em breve' : 'Coming soon'}
            </span>
          )}

          <span className="border-green-300 text-xs rounded py-[0.125rem] px-2 text-white border font-bold">
            {props.type === 'live' ? 'ON' : 'OFF'}
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}
