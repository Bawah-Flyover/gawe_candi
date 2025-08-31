async function fetchSidebar(){
    await fetch("sidebar.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("floating-sidebar").innerHTML = data;
            const page = window.location.pathname.split("/").pop(); 

            if (page === "dashboard.html"){
                document.getElementById(`btn-menu-dashboard`).classList.add("btn-sidebar-active");
            }
            else if (page === "profile.html"){
                document.getElementById(`btn-menu-profile`).classList.add("btn-sidebar-active");
            } 
            else{

            }
        });
}