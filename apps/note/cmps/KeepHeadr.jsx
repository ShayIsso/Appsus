


export function KeepHeader(){

    return(
        <header className="keep-header flex align-center">

            <section className="flex align-center">
              <button className="menu-btn"><span className="material-icons">menu</span></button>
              <img className="keep-logo" src="assets/img/google-keep-logo.png" alt="keep logo"></img>
              <h1 className="keep-title">Keep</h1>
           
          

              <div className="search-bar">
               <button><span className="material-icons search-btn">search</span></button>
               <input type="text" placeholder="Search" />
               <button><span className="material-icons close-btn">close</span></button>
             </div>
           </section>


          <section className="flex align-center">
             <button><span className="material-icons refresh-btn">replay</span></button>
             <button><span className="material-icons-outlined">view_agenda</span></button> 
             <button><span className="material-icons-outlined">settings</span></button> 
          </section>

        </header>
    )
}

