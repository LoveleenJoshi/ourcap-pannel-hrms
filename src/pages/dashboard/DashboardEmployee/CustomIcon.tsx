import React from "react";
interface iconProps{
    id:string;
    membership:{
    free:string[];
    pro:string[];
    },
    styles:string;
    unicode:string;
    style?: React.CSSProperties;
    className?: string;
    onClickBtn?:()=>void;
}

const CustomIcon:React.FC<iconProps>=({unicode,className,style,onClickBtn})=>{
    return(
        <span className={`fa ${unicode} ${className}` } style={style} onClick={onClickBtn}/>
    )
}

export default CustomIcon;
// {
//     attributes: {
//         id: 'calendar',
//         membership: {
//             free: ['solid', 'regular'],
//             pro: ['solid', 'regular', 'light', 'duotone'],
//         },
//         styles: ['solid', 'regular', 'light', 'duotone'],
//         unicode: 'f133',
//         voted: false,
//     },
//     id: 'calendar',
//     links: {
//         self: '/api/icons/calendar',
//     },
//     type: 'icon',
// },