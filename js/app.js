const listDog = document.querySelector('.list-card');
const containerCart = document.querySelector('.shopping-cart-dogs');
const cart = document.querySelector('.shooping-cart');
const emptyCart = document.querySelector('#empty-cart');

const containerNotice = document.getElementById('container-notification');

let dogsCart = [];

loadAddEventListener();
//Add evenListener
function loadAddEventListener() {
        listDog.addEventListener('click', addDog);
        cart.addEventListener('click', deleteDog);

        emptyCart.addEventListener('click', () => {
                dogsCart = [];
                cleanHtml();
        });
}

function addDog(e) {
        if (e.target.classList.contains('btn')) {
                const dog = e.target.parentElement.parentElement.parentElement;
                readDogSelected(dog);
                addNotice({ title: 'Success', message: 'Successfully added', autoClose: true })
        }

}

function deleteDog(e) {
        if (e.target.classList.contains('delete-dog')) {
                const dogId = e.target.getAttribute('data-id');
                dogsCart = dogsCart.filter(dog => dog.id !== dogId);
                cartHtml();
        }
}

function readDogSelected(dog) {

        const infoDog = {
                image: dog.querySelector('img').src,
                name: dog.querySelector('h3').textContent,
                price: dog.querySelector('.card-price').textContent,
                id: dog.querySelector('.btn').getAttribute('data-id'),
                quantity: 1
        }

        const exist = dogsCart.some(dog => dog.id === infoDog.id);
        if (exist) {
                const dogs = dogsCart.map(dog => {
                        if (dog.id === infoDog.id) {
                                dog.quantity++;
                                return dog;
                        } else {
                                return dog;
                        }
                })
                dogsCart = [...dogs]
        } else {
                dogsCart = [...dogsCart, infoDog];
        }
        cartHtml();
}

// Crea el HTML para mostrar datos en el carrito
function cartHtml() {
        // Clean the HTML
        cleanHtml();

        // recorre el carrito y genera el html
        dogsCart.forEach(dog => {
                const { image, name, price, quantity, id } = dog;
                const ul = document.createElement('ul');
                ul.innerHTML = `
                        <img src = ${image}>
                        <li>${name}</li>
                        <li>${price}</li>
                        <li>${quantity}</li>
                        <li class="delete-dog" data-id="${id}">x</li>
                
                `;
                //Add the HTML of cart in the ul
                containerCart.appendChild(ul);
        });
}


function cleanHtml() {
        // containerCart.innerHTML = '';
        while (containerCart.firstChild) {
                containerCart.removeChild(containerCart.firstChild);
        }
}

// Notification Functions
function idNotice() {
        const numRadom = Math.floor(Math.random() * 100);
        const date = Date.now();
        const idNotification = numRadom + date;

        return idNotification;
}

function addNotice({ title, message, autoClose }) {
        //Create the notice
        const newNotice = document.createElement('div');

        //Add class to the notice
        newNotice.classList.add('notice');
        const idd = newNotice.id = idNotice();

const notice = `
                <div class="notice-content auto-close">
                        <div class="notice-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                </svg>
                        </div>
                        <div class="notice-text">
                                <p class="title">${title}</p>
                                <p class="description">${message}</p>
                        </div>
                </div>
                <button class="btn-close">
                        <div class="close-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        <path
                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                        </div>
                </button>

`;

// To add plantilla to the notice
newNotice.innerHTML = notice;

// To add new notice to the container
containerNotice.appendChild(newNotice);

containerNotice.addEventListener('click', (e) =>{
        e.preventDefault()

        const noticeId = e.target.closest('div.notice').id;
        if(e.target.closest('button.btn-close')){
                closeNotice(noticeId);
        }
});

function closeNotice(id) {
        document.getElementById(id)?.classList.add('closing');
 }

function handleAnimationClose(e) {
        document.querySelector('.notice').classList.add('auto-close');
        
        if(e.animationName === 'close'){
                newNotice.removeEventListener('animationend', handleAnimationClose);
                newNotice.remove();
        }
}

if(autoClose){
         setTimeout(() => closeNotice(idd), 5000);
}

// Add event Liestener to detect when finish the animation
        newNotice.addEventListener('animationend', handleAnimationClose)

};