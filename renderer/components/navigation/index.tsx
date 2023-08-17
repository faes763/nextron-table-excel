
import Link from "next/link";
import { useEffect } from "react";
import { useNavigation } from "../../store/useNavigation";

export default function Navigation() {
    const {close} = useNavigation();
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
          if (event.keyCode === 27 || event.which === 27) close();
        }
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
    return (
      <>
        <div className="z-20 h-screen fixed inset-0 w-[200px] bg-[#e5e7eb] text-black border-r border-black flex-col items-start gap-5 py-8 px-5 flex">
            <button onClick={close}>Закрыть</button>
            <Link href={'/home'}><a onClick={close}>Просмотр</a></Link>
            <Link href={'/admin'}><a onClick={close}>Редактирование</a></Link>
            <Link href={'/create'}><a onClick={close}>Создание</a></Link>
        </div>
        <div onClick={()=>close()} className="cursor-pointer fixed inset-0 w-full h-full z-[11]"></div>
      </>
        
    )
}