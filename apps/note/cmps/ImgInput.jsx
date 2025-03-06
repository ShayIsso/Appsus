
const { useRef } = React

export function ImgInput({ imgRef, note, callBack }) {


    function handleImageUpload(ev) {
        const file = ev.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                callBack.addImg(note.id, base64String);
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <input
            ref={imgRef}
            type="file"
            accept="image/*"
            style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }}
            onChange={handleImageUpload}
        />
    )
}