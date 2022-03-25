document.addEventListener ("DOMContentLoaded", function (event) {
    function handleSubmit () {
        let users = 0
        document.querySelectorAll ('.item-grid').forEach (el => {
            users += (parseInt (el.dataset.kiss) + parseInt (el.dataset.marry) + parseInt (el.dataset.kill))
            const xhr = new XMLHttpRequest ();
            xhr.open ("PUT", `${location.origin}/characters`, true);
            xhr.setRequestHeader ('Content-Type', 'application/json');
            if (el.dataset.type == 'kiss') {
                xhr.send (JSON.stringify ({
                    "_id": `${el.dataset.id}`,
                    "kiss": `${parseInt (el.dataset.kiss) + 1}`
                }));
            }
            if (el.dataset.type == 'marry') {
                xhr.send (JSON.stringify ({
                    "_id": `${el.dataset.id}`,
                    "marry": `${parseInt (el.dataset.marry) + 1}`
                }));
            }
            if (el.dataset.type == 'kill') {
                xhr.send (JSON.stringify ({
                    "_id": `${el.dataset.id}`,
                    "kill": `${parseInt (el.dataset.kill) + 1}`
                }));
            }
        })
        document.querySelector ('body').insertAdjacentHTML ('afterbegin', `
<div class="popup">
    <div class="popup__body">
        <div class="popup__text"><span class="popup__users">${users}</span> пользователей ответило</div>
        <div class="popup__items"></div>
        <div class="popup__footer">
        <div class="popup__btn" onclick="document.location.reload()">Следующий раунд</div>
        </div>
    </div>  
</div>
`)
        let tmpUsers = 0
        document.querySelectorAll ('.item-grid').forEach ((el, index) => {
            tmpUsers = (parseInt (el.dataset.kiss) + parseInt (el.dataset.marry) + parseInt (el.dataset.kill))
            document.querySelector ('.popup__items').insertAdjacentHTML ('beforeend', `
            <div class="popup__item item-popup">
            <div class="item-popup__bar">
            <div class="item-popup__el">${Math.round (parseInt (el.dataset.kiss) / tmpUsers * 100)}%</div>
            <div class="item-popup__el">${Math.round (parseInt (el.dataset.marry) / tmpUsers * 100)}%</div>
            <div class="item-popup__el">${Math.round (parseInt (el.dataset.kill) / tmpUsers * 100)}%</div>
            </div>
            <div class="item-popup__img" data-type="${el.dataset.type}"><img src="${document.querySelectorAll ('.item-grid__img')[index].childNodes[0].attributes.src.value}" alt=""></div>
            <div class="item-popup__icon" data-type="${el.dataset.type}"><img src="${document.querySelectorAll ('.item-grid__button')[index].childNodes[0].attributes.src.value}" alt=""></div>
            </div>
            `)
        })
        document.querySelectorAll ('.item-popup__el').forEach (el => el.style.height = `${el.innerText}`)

    }
    let typesArray = ['', '', '']
    const btn = document.createElement ('div')
    btn.classList.add ('item-grid__button', 'item-grid__button_addable')

    document.querySelectorAll ('.item-grid__img').forEach (el => el.addEventListener ("click", () => {
        el.parentElement.classList.toggle ('active')
        el.classList.toggle ('active_img')
        if (el.nextElementSibling.attributes.getNamedItem ('hidden')) {
            el.nextElementSibling.attributes.removeNamedItem ('hidden')
        } else {
            el.nextElementSibling.setAttribute ('hidden', 'hidden')
        }
    }))
    document.querySelectorAll ('.item-grid__button').forEach ((el) => el.addEventListener ("click", () => {
        el.parentElement.parentElement.parentElement.classList.toggle ('active')
        el.parentElement.parentElement.previousElementSibling.classList.toggle ('active_img')
        if (el.parentElement.parentElement.attributes.getNamedItem ('hidden')) {
            el.parentElement.parentElement.attributes.removeNamedItem ('hidden')
        } else {
            el.parentElement.parentElement.setAttribute ('hidden', 'hidden')
        }
        switch (el.dataset.type) {
            case 'kiss':
                console.log (1)
                el.parentElement.parentElement.parentElement.dataset.type = 'kiss'
                //el.parentElement.parentElement.parentElement.prepend(kissEl)
                el.parentElement.parentElement.parentElement.style.background = '#c050a8'
                break
            case 'marry':
                console.log (2)
                el.parentElement.parentElement.parentElement.dataset.type = 'marry'
                el.parentElement.parentElement.parentElement.style.background = '#b48af0'
                break
            case 'kill':
                console.log (3)
                el.parentElement.parentElement.parentElement.dataset.type = 'kill'
                el.parentElement.parentElement.parentElement.style.background = '#ff4d5d'
                break
        }
        document.querySelectorAll ('.item-grid').forEach ((el, index) => {
            typesArray[index] = el.dataset.type
        })
        if (typesArray[0] !== typesArray[1] && typesArray[0] !== typesArray[2] && typesArray[1] !== typesArray[2] && !typesArray.includes (undefined)) {
            document.querySelector ('.game').append (btn)
            btn.innerText = 'Подтвердить'
            btn.addEventListener ("click", handleSubmit)
        } else {
            if (!typesArray.includes (undefined)) {
                document.querySelector ('.game').append (btn)
                btn.innerText = 'Дубликаты'
                btn.removeEventListener('click', handleSubmit)
            }
        }
    }))
});