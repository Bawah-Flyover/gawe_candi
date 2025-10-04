async function initUserData(){
    // check local storage for user data
    let userEmail = localStorage.getItem("authEmail");

    // if not found, fetch
    if(!userEmail){
        let userData = await authUser();

        if(!userData){
            return;
        }
        else{
            // save in local storage
            localStorage.setItem("authEmail", userData.user.email);
            userEmail = userData.user.email
        }
    }


    const page = window.location.pathname.split("/").pop(); 
    
    document.getElementById('auth-user-full-name').innerText = userEmail;
    if (page === "profile.html") {
        document.getElementById('profile-user-email').innerText = userEmail;
    }
}

async function initGetDevice(){
    // check local storage for device list
    let userDevices = JSON.parse(localStorage.getItem("userDevices"));

    // if not found, fetch
    if(!userDevices){
        let data = await authGetDevice();

        if(!data){
            return;
        } else {
            userDevices = data.devices;
            localStorage.setItem("userDevices", JSON.stringify(userDevices));
        }
    }
    
    const page = window.location.pathname.split("/").pop(); 

    if(userDevices){
        let devices  = userDevices;
        let devicesLength = devices.length;

        // update device list on sidebar
        let dynamicSidebarElement = document.getElementById('dynamic-sidebar');
        dynamicSidebarElement.innerHTML = ``;

        for(let i=0; i<devicesLength; i++){
            const deviceSN = devices[i].serial;
            dynamicSidebarElement.innerHTML += `
                <div class="row">
                    <button type="button" id="btn-menu-device-${deviceSN}" class="btn btn-sidebar" onclick="window.location.replace('./device.html?sn=${deviceSN}')">
                        <div class="row align-items-center">
                            <div class="col-2" style="margin-bottom: -4px;">
                                <i class='bx bxs-server' ></i>
                            </div>
                            <div class="col">
                                &ensp; ${deviceSN}
                            </div>
                        </div>                                
                    </button>
                </div>
            `;
        }


        if (page === "device.html") {
            const params = new URLSearchParams(window.location.search);
            const deviceSerialNumber = params.get("sn");
            document.getElementById(`btn-menu-device-${deviceSerialNumber}`).classList.add("btn-sidebar-active");

            for(let i=0; i<devicesLength; i++){
                if(devices[i].serial === deviceSerialNumber){
                    document.getElementById('device-registered-date').innerText = devices[i].createdAt;
                }
            }
        }
    }
}


async function initFetch(){
    // fetch html element
    await fetchSidebar();
    await fetchNavbar();
    await fetchModalExportData();
    await fetchModalAddDevice();
    
    // fetch initial data
    await initUserData();
    await initGetDevice();
}

initFetch();