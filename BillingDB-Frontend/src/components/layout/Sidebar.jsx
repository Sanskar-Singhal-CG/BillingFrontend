import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen, onClose }){

    const sidebarClass = isOpen ? 'sidebar-open' : 'sidebar';

    return(
        <aside className={sidebarClass}>
            <div>
                <button className="close-button" onClick={onClose}>=</button>
                <h2> Billing System</h2>
            </div>
            <div>
                <NavLink to="/">Billing</NavLink>
                <NavLink to="/products">Products and Categories</NavLink>
                <NavLink to="/party">Party</NavLink>
                <NavLink to="/productPricing">Party Product Pricing</NavLink>
                <NavLink to="/invoices">Invoices</NavLink>
                <NavLink to="/settings">Settings</NavLink>
            </div>
        </aside>
    );
}
export default Sidebar;