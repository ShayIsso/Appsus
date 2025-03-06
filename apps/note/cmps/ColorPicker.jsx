const { useState } = React
import { noteService } from '../services/note.service.js'


const colors = [
    "#FFCCBC",
    "#FFF9C4",
    "#C8E6C9",
    "#B3E5FC",
    "#D1C4E9",
    "#F5E0B2",
    "#FFFFFF",
]

export function ColorPicker({ note, callBack }) {
    const [selectedColor, setSelectedColor] = useState(note.style.backgroundColor);


    const handleSelect = (color) => {
        setSelectedColor(color)
        { callBack(note.id, color) || callBack(color) }
    };

    return (
        <div className="color-picker flex">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={`color-option ${selectedColor === color ? "selected" : ""}`}
                    style={{
                        backgroundColor: color,
                        border: color === "#FFFFFF" && "1px solid #000000"
                    }}
                    onClick={() => handleSelect(color)}
                >
                </div>
            ))}
        </div>
    );
}