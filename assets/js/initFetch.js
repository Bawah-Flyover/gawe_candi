async function initUserData(){
    let userData = await authUser();

    if(!userData){
        return;
    }

    const page = window.location.pathname.split("/").pop(); 
    
    document.getElementById('auth-user-full-name').innerText = userData.user.email;
    if (page === "profile.html") {
        document.getElementById('profile-user-email').innerText = userData.user.email;
    }
}

async function initGetDevice(){
    const page = window.location.pathname.split("/").pop(); 

    let deviceData = await authGetDevice();
    if(deviceData){
        let devices  = deviceData.devices;
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