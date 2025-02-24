const {  NavLink } = ReactRouterDOM

export function MainNav({toggleMenu}) {
    return  (    
       <nav className="main-nav flex">
    <NavLink  onClick={toggleMenu} to="/">Home</NavLink>
    <NavLink  onClick={toggleMenu} to="/about">About</NavLink>
    <NavLink  onClick={toggleMenu} to="/mail">Mail</NavLink>
    <NavLink  onClick={toggleMenu} to="/note">Note</NavLink>
</nav>
    )
}