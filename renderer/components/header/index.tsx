import { usePopupFilter } from "../../store/useFilterPopup";
import { useNavigation } from "../../store/useNavigation";
import Titles from "../preview/Titles";
import PopupTitle from "../preview/Titles/popup-title";

export default function Header() {
    const {open} = useNavigation();
    const {isOpen} = usePopupFilter();
    return (
        <>
            {isOpen && <PopupTitle/>}
            <header className="sticky top-[-1px] w-fit z-10 ">
                <div className="flex justify-between items-center  py-5 bg-blue-300 pr-[10px]">
                    <button onClick={open} className="sticky left-5 z-20 bg-blue-300 ml-5 border border-black px-2 rounded-2xl py-1">Меню</button>
                    <Titles/>
                </div>
            </header>
        </>
    )
}