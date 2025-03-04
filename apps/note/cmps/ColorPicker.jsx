const { useState } = React

const colors = [
    "#FFCCBC",
    "#FFF9C4",
    "#C8E6C9",
    "#B3E5FC",
    "#D1C4E9",
    "#F5E0B2",
    "#FFFFFF",
]

export function ColorPicker({ onSelect, currColor }) {
    const [selectedColor, setSelectedColor] = useState(currColor);

    const handleSelect = (color) => {
        setSelectedColor(color);
        if (onSelect) onSelect(color);
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
                    {/* {selectedColor === color && <span className="checkmark">✔</span>} */}
                </div>
            ))}
        </div>
    );
}