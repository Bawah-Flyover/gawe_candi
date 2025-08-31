async function addNewDevice(){
    const newDeviceSN = document.getElementById('add-new-device-serial-number').value;
    const SNBlankAlert  =document.getElementById('add-new-device-alert-blank');
    SNBlankAlert.style.display = 'none';
    
    if(!newDeviceSN){
        SNBlankAlert.style.display = 'block';
        return;
    }

    // register to server
    newDeviceData = {"serial_number" : newDeviceSN};
    const response = await authAddDevice(newDeviceData);
    const responseData = await response.json();

    const addDeviceModal = bootstrap.Modal.getInstance(document.getElementById('addDeviceModal'));

    if(!response.ok){
        addDeviceModal.hide();
        const errorModal = new bootstrap.Modal(document.getElementById('addDeviceErrorModal'));
        errorModal.show();

        document.getElementById('add-device-error-modal-desciprtion').innerText = responseData.message;
    } else {
        addDeviceModal.hide();
        const successModal = new bootstrap.Modal(document.getElementById('addDeviceSuccessModal'));
        successModal.show();
    }

    return;
}

// modal add device
async function fetchModalAddDevice(){
    await fetch("modalAddDevice.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("modalAddDevice").innerHTML = data;
        });
}