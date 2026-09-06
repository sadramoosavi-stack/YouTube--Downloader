import "./Favourites.css";
import "./Sidebar";

import { IconDownload } from "@tabler/icons-react";
import Sidebar from "./Sidebar";


function Favourites(){
    return(
        <>

        <Sidebar />

        <main className="favourites-page">
            <section className="dashboard-placeholder">
                <IconDownload size = {30} />
                <h2>Your favourite videos will appear here!</h2>
            </section>
        </main>
        </>
    );
}

export default Favourites;