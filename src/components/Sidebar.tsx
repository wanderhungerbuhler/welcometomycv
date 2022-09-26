import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

interface SidebarProps {
  locale: string;
}

export function Sidebar(props: SidebarProps) {
  const language = localStorage.getItem('@language_cv');

  const { data } = useGetLessonsQuery({
    variables: {
      locale: props.locale as any,
    }
  });

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        {language === 'pt_BR' ? 'Um pouco sobre mim' : 'About myself'}
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug as any}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          )
        })}
      </div>
    </aside>
  )
}
