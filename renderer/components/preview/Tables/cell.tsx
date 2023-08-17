import clsx from "clsx";
import { usePopupAlert } from "../../../store/usePopupAlert";

interface cellData {
    text: string;
    admin?: boolean;
    address: string;
    first?: boolean;
}

export default function Cell({text,admin,address,first}:cellData) {
    const {open,setCell,setText} = usePopupAlert();
    return (
        <div
            onClick={(event)=>{
                if(admin) {
                    setCell(address);
                    setText(text);
                    open();
                }
            }}
            className={clsx({
                "flex items-center gap-x-1 py-4 h-auto":true,
                "cursor-pointer":admin,
                "!h-full": first
            })}
        >
             <h1 className="text-center  min-w-[200px] break-words max-w-[200px]">
                {text}
            </h1>
        </div>
    )
}