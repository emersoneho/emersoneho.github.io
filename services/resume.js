const getResume = () => {
    Promise.all([firebaseService.read('resume')]).then((values) => {
        let info = values[0];
        setEducation(info.education);
        setEmployments(info.employments);
        setPersonalInfo(info.personal_info);
    });
}
const setDescription = () => {
    let aux = document.querySelector('#description');

    database.ref('informations/description').on('value', (snapshot) => {
        aux.innerText = snapshot.val();
    }, () => {
        aux.innerText = 'error on description request';
    });
}
const setEducation = (data) => {}
const setEmployments = (data) => {}

const setPersonalInfo = (data) => {
    let info__whatsapp = document.querySelectorAll('.info__whatsapp');
    let info__linkEmail = document.querySelectorAll('.info__linkEmail');
    let info__skypeid = document.querySelectorAll('.info__skypeid');
    let info__name = document.querySelectorAll('.info__name');
    let info__role = document.querySelectorAll('.info__role');

    info__whatsapp.forEach(element => element.textContent = data.whatsapp);
    info__linkEmail.forEach(element => element.textContent = data.email);
    info__skypeid.forEach(element => element.textContent = data.skypeid);
    info__name.forEach(element => element.textContent = data.address);
    info__role.forEach(element => element.textContent = data.role);
}

window.addEventListener("load", getResume());
window.addEventListener("load", setDescription());