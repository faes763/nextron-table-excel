import { usePopupAlert } from "../../store/usePopupAlert";
import MainHeader from "../../components/mainHeader";
import Tables from "../../components/preview/Tables";
import PopupAlert from "./popup-alert";


export default function Admin() {
    const {isOpen} = usePopupAlert();
    return (
        <>
            <MainHeader/>
            <div className="flex flex-col gap-5 ml-[120px] w-fit">
                {isOpen && <PopupAlert/>}
                <Tables admin={true}/>
            </div>
        </>
       
    )
}