
const { useState, useRef, useEffect } = React
import { DropMenu } from './DropMenu.jsx'
import { ColorPicker } from './ColorPicker.jsx'


export function NoteActionBtns({ options, onSelect, currColor }) {



    const [isDropMenu, setIsDropMenu] = useState(false)
    const [isColorPicker, setIsColorPicker] = useState(false)
    const dropContainer = useRef(null)
    const colorPickerRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (ev) => {
            if (dropContainer.current && !dropContainer.current.contains(ev.target)) {
                setIsDropMenu(false);
            }
            if (colorPickerRef.current && !colorPickerRef.current.contains(ev.target)) {
                setIsColorPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section className="note-action-btns flex justify-center space-between ">
            < button type="button"> <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#757575"><path d="M440-360h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg></button >
            <button type="button"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#757575"><path d="M708-432v-84h-84v-72h84v-84h72v84h84v72h-84v84h-72Zm-324-48q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM96-192v-92q0-25.78 12.5-47.39T143-366q55-32 116-49t125-17q64 0 125 17t116 49q22 13 34.5 34.61T672-284v92H96Zm72-72h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14.5T179-304q-4.95 2.94-7.98 8.24Q168-290.47 168-284v20Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21Zm-.21-73Zm0 361Z" /></svg></button>
            <button type="button" style={{ position: 'relative' }} onClick={() => setIsColorPicker(!isColorPicker)}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#757575"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30.5-149.5t84-122Q264-804 335.5-834T488-864q78 0 146.5 27T754-763q51 47 80.5 110T864-518q0 96-67 163t-163 67h-68q-8 0-14 5t-6 13q0 15 15 25t15 53q0 37-27 66.5T480-96Zm0-384Zm-216 36q25 0 42.5-17.5T324-504q0-25-17.5-42.5T264-564q-25 0-42.5 17.5T204-504q0 25 17.5 42.5T264-444Zm120-144q25 0 42.5-17.5T444-648q0-25-17.5-42.5T384-708q-25 0-42.5 17.5T324-648q0 25 17.5 42.5T384-588Zm192 0q25 0 42.5-17.5T636-648q0-25-17.5-42.5T576-708q-25 0-42.5 17.5T516-648q0 25 17.5 42.5T576-588Zm120 144q25 0 42.5-17.5T756-504q0-25-17.5-42.5T696-564q-25 0-42.5 17.5T636-504q0 25 17.5 42.5T696-444ZM480-168q11 0 17.5-8.5T504-192q0-16-15-28t-15-50q0-38 26.5-64t64.5-26h69q66 0 112-46t46-112q0-115-88.5-194.5T488-792q-134 0-227 91t-93 221q0 130 91 221t221 91Z" /></svg>
                {isColorPicker && (<div ref={colorPickerRef} className="color-picker-container"><ColorPicker currColor={currColor} onSelect={onSelect} /></div>)}
            </button>
            <button type="button"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#757575"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm48-72h432L552-480 444-336l-72-96-108 144Zm-48 72v-528 528Z" /></svg></button>
            <button type="button"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#757575"><path d="m480-276 144-144-51-51-57 57v-150h-72v150l-57-57-51 51 144 144ZM216-624v408h528v-408H216Zm0 480q-29.7 0-50.85-21.15Q144-186.3 144-216v-474q0-14 5.25-27T165-741l54-54q11-11 23.94-16 12.94-5 27.06-5h420q14.12 0 27.06 5T741-795l54 54q10.5 11 15.75 24t5.25 27v474q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm6-552h516l-48-48H270l-48 48Zm258 276Z" /></svg></button>
            <button type="button" style={{ position: 'relative' }} onClick={() => setIsDropMenu(!isDropMenu)}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#757575"><path d="M480.29-146q-36.29 0-61.79-25.62T393-233.21q0-36.39 25.62-62.09 25.62-25.7 61.59-25.7Q517-321 542-295.21t25 62q0 36.21-25.21 61.71t-61.5 25.5Zm0-247q-36.29 0-61.79-25.62T393-480.21Q393-517 418.62-542t61.59-25Q517-567 542-541.79t25 61.5q0 36.29-25.21 61.79t-61.5 25.5Zm0-246q-36.29 0-61.79-26-25.5-25.99-25.5-62.5 0-36.5 25.62-61.5t61.59-25Q517-814 542-788.79t25 61.72q0 36.5-25.21 62.29Q516.58-639 480.29-639Z" /></svg>
                {isDropMenu && <div ref={dropContainer}><DropMenu options={options} /> </div>}
            </button>
        </section >
    )
}