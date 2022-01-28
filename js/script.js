// Бургер меню

const button = document.querySelector('.menu__icon');
const menu = document.querySelector('.menu__body');

button.addEventListener("click", function (e) {
    button.classList.toggle('_active');
    menu.classList.toggle('_active');
});

// Плавное появление объектов
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            //Высота объекта
            const animItemHeight = animItem.offsetHeight;
            // Позиция объекта относительно верха, на сколько ниже верха страницы
            const animItemOffset = offset(animItem).top;

            //Коеффицент
            const animStart = 4;

            //Момент старта анимации = Высота окна браузера - Высота объекта
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            console.log(animItemPoint);
            // Анимируемый объект выше чем окно браузера
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            // Условия добавления класса.Количество проскроленных пикслей(pageYOffset)
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                //Условие чтобы анимация сработала только один раз
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    // Функция для определения расстояния объекта от верха страницы
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    //Задержка для появления сразу при загрузке.
    setTimeout(() => {
        animOnScroll();
    }, 300);
}