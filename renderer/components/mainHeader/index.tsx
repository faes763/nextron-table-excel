import { useEffect } from "react";
import { useChangeTitle } from "../../store/useChangeTitle";
import { useNavigation } from "../../store/useNavigation";
import Header from "../header"
import Navigation from "../navigation"
import PopupChangeTitle from "../preview/Titles/popup-change-title";

export default function MainHeader() {
  const {isOpen} = useNavigation();
  const {isOpenTitle,noChange} = useChangeTitle();

  useEffect(()=>noChange(),[]);

  return (
        <>
            <Header />
            {isOpen && <Navigation/>}
            {isOpenTitle && <PopupChangeTitle/>}
        </>  
    )
}