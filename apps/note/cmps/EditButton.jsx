

export function EditButton({ setIsEdit }) {
    return (
        <div onClick={setIsEdit} className="edit-button flex space-between align-items justify-center">
            <h1>Take a note...</h1>
            <section className="flex space-between align-items justify-center">
                <button><svg xmlns="http://www.w3.org/2000/svg" max-height="24px" viewBox="0 -960 960 960" width="24px" fill="#797979"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#797979"><path d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l386-386 110 110-386 386Zm-190 80Z" /></svg></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#797979"><path d="M240-280h480L570-480 450-320l-90-120-120 160ZM120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm0 0v-560 560Z" /></svg></button>
            </section>
        </div>
    )
}