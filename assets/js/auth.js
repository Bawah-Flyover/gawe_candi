const serverAddress = "https://api.microbess.id";
//const serverAddress = "http://192.168.1.20:8000";

// ========================================================================================
// AUTH
// ========================================================================================

async function checkToken(){
    let token = localStorage.getItem("authToken");
    if(!token){
        window.location.replace("./");
    }
}

async function authRegister(data){
    const endpoint = serverAddress + "/api/v1/register";

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


async function authLogin(data){
    const endpoint = serverAddress + "/api/v1/login";

    try{
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response;
    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function authLogout(){
    const endpoint = serverAddress + "/api/v1/logout";
    
    /*
    try{
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization' :`${type} ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if(response.ok){
            localStorage.removeItem("authToken");
            localStorage.removeItem("authType");

            window.location.href = "./login_v2.html";
        }

    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
        */
    
    // delete saved token
    localStorage.removeItem("authToken");
    localStorage.removeItem("authType");

    window.location.href = "./login_v2.html";
}


async function authUser(){
    const endpoint = serverAddress + "/api/v1/user";
    const token = localStorage.getItem("authToken");
    const type = 'Bearer';

    try{
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization' :`${type} ${token}`,
                'Content-Type': 'application/json'
            },
        });

        let data = await response.json();
        return data;

    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


async function authChangePassword(data){
    const endpoint = serverAddress + "/api/v1/change-password";
    const token = localStorage.getItem("authToken");
    const type = 'Bearer';

    try{
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Authorization' : `${type} ${token}`,
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        });

        return response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// ========================================================================================
// DATA
// ========================================================================================

async function authGetInverter(serialNumber){
    const endpoint = serverAddress + "/api/v1/inverter?serial=" + serialNumber;
    const token = localStorage.getItem("authToken");
    const type = 'Bearer';

    try{
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization' :`${type} ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return response;

    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function authGetBattery(serialNumber){
    const endpoint = serverAddress + "/api/v1/battery?serial=" + serialNumber;
    const token = localStorage.getItem("authToken");
    const type = 'Bearer';

    try{
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization' :`${type} ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return response;

    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// ========================================================================================
// DEVICES
// ========================================================================================
async function authGetDevice(){
    const endpoint = serverAddress + "/api/v1/devices";
    const token = localStorage.getItem("authToken");
    const type = 'Bearer';

    try{
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization' :`${type} ${token}`,
                'Content-Type': 'application/json'
            },
        });

        let data = await response.json();
        return data;

    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function authAddDevice(data){
    const endpoint = serverAddress + "/api/v1/device";
    const token = localStorage.getItem("authToken");
    const type = 'Bearer';

    try{
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization' :`${type} ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response;

    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


async function authDeleteDevice(data){
    const endpoint = serverAddress + "/api/v1/device";
    const token = localStorage.getItem("authToken");
    const type = 'Bearer';

    try{
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization' :`${type} ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response;

    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

