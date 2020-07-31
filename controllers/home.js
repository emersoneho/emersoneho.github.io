import database from "../services/firebase-service.js";
import loading from "../modules/loading.js";

'use strict';

const getResume = async () => {
    let resume = await database.read('resume');
    let files = await database.read('files');
    /* 
        Promise.all([
            database.read('resume'),
            database.read('files'),
            database.read('badges'),
        ]).then((values) => { 
        let resume = values[0];
        let files = values[1];
        let badges = values[2];
    */
    setEducation(resume.education);
    setEmployments(resume.employments);
    setPersonalInfo(resume.personal_info);

    setFiles(files);

    loading.hide();
    //});
}

const getBadges = async () => {
    let badges = await database.read('badges');
    let aux = document.querySelector(".info__badges");

    Object.entries(badges).forEach(([key, value]) => {
        aux.insertAdjacentHTML("beforeEnd", `
            <div class="col-4">
                <a href="${value.link}" target="_blank"
                    <figure>
                        <img src="${value.img}" alt="${value.alt_img}"  class='img-fluid'>
                        <figcaption>${value.caption} <br> ${value.enterprise} </figcaption>
                    </figure>
                </a>
            </div>
        `);

    });
}

const setDescription = async () => {
    let aux = document.querySelector('#description');
    let response = await database.read('informations/description');

    aux.innerText = response ? response : 'error on description request';
    /*  if (response) {
         aux.innerText = response;
     } else {
         aux.innerText = 'error on description request';
     } */
}

const setEducation = (data) => {
    var item = '<h3 class="resume-list_title">education</h3>';
    data.sort((a, b) => a.order - b.order);
    data.forEach((v, k) => {
        item += `
            <div class="resume-list__block">
                <p class="resume-list__block-title">${v.course_name}</p>
                <p class="resume-list__block-date">${v.initial_year} - ${v.final_year}</p>
                <p>${v.university}</p>
                <p>${v.description==undefined?'':v.description}</p>
            </div> 
        `;
    });
    document.querySelector('.education').innerHTML = item;
}

const setEmployments = (data) => {
    var item = '<h3 class="resume-list_title">employment</h3>';
    data.sort((a, b) => a.order - b.order);
    data.forEach((v, k) => {
        item += `
            <div class="resume-list__block">
                <p class="resume-list__block-title">${v.name}</p>
                <p class="resume-list__block-date">${v.initial_year} - ${v.final_year}</p>
                <p>${v.role}</p>
                <p>${v.description==undefined?'':v.description}</p>
            </div> 
        `;
    });
    document.querySelector('.employment').innerHTML = item;
}

const setPersonalInfo = (data) => {
    let info__whatsapp = document.querySelectorAll('.info__whatsapp');
    let info__linkEmail = document.querySelectorAll('.info__linkEmail');
    let info__skypeid = document.querySelectorAll('.info__skypeid');
    let info__name = document.querySelectorAll('.info__name');
    let info__age = document.querySelectorAll('.info__age');
    let info__role = document.querySelectorAll('.info__role');
    let info__address = document.querySelectorAll('.info__address');

    let link__facebook = document.querySelectorAll('.link__facebook');
    let link__github = document.querySelectorAll('.link__github');
    let link__linkedin = document.querySelectorAll('.link__linkedin');

    info__whatsapp.forEach(element => element.textContent = data.whatsapp);
    info__linkEmail.forEach(element => element.textContent = data.email);
    info__skypeid.forEach(element => element.textContent = data.skypeid);
    info__name.forEach(element => element.textContent = data.name);
    info__role.forEach(element => element.textContent = data.role);
    info__age.forEach(element => element.textContent = data.age);
    info__address.forEach(element => element.textContent = data.address);

    link__facebook.forEach(element => element.href = data.social_networks.facebook);
    link__github.forEach(element => element.href = data.social_networks.github);
    link__linkedin.forEach(element => element.href = data.social_networks.linkedin);

}

const setSkills = async () => {
    var title = `<div class="col-md-12"><h3 class="progress-list__title">general skills</h3></div>`;
    let response = await database.read('resume/skills');
    if (response) {
        var item = '';
        response.sort((a, b) => a.order - b.order);
        response.forEach((v, k) => {
            item += `
                <div class="progress-list__skill col-md-4">
                    <p>
                        <span class="progress-list__skill-title">${v.name}</span>
                        <span class="progress-list__skill-value">${v.value}%</span>
                    </p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-valuenow="${v.value}" aria-valuemin="0" aria-valuemax="100" style="width: ${v.value}%;">
                        </div>
                    </div>
                </div>
            `;
        });
        document.querySelector('.info__skills').innerHTML = title + item;
    } else {
        aux.innerText = 'error on description request';
    }
}

const setFiles = (data) => {
    let link__cv = document.querySelectorAll('.link__cv');
    link__cv.forEach(element => element.href = data.cv);

    let link__avatar_image = document.querySelectorAll('.link__avatar_image');
    link__avatar_image.forEach(element => element.src = data.avatar_image);

    let link__cover_image = document.querySelectorAll('.link__cover_image');
    link__cover_image.forEach(element => element.style.backgroundImage = `url("${data.cover_image}")`);
}

window.addEventListener("load", () => {
    setDescription();
    setSkills();
    getBadges();
    getResume();
});