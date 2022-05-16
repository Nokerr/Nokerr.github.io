const input = document.querySelector('#input'),
    btn = document.querySelector('#btn'),
    do_list = document.querySelector('#do_list');

let tasks = []

if (localStorage.getItem('todo')) {
    tasks = JSON.parse(localStorage.getItem('todo'));
    displayMassage();
}

function displayMassage() {
    if (tasks.length == 0) {
        do_list.innerHTML = '';
    } else {
        let displayMassage = '';
        tasks.forEach((item, index) => {
            if (item.done == false) {
                displayMassage += `
                <li class="${index} del_li">Task ${index} : ${item.post}<button class="${index} del_item">X</button></li>
                `;
            }
            else if (item.done == true) {
                displayMassage += `
                <li class="${index} del_li done">Task ${index} : ${item.post}<button class="${index} del_item">X</button></li>
                `;
            }
            do_list.innerHTML = displayMassage
        });
    }
}



document.addEventListener("click", function (e) {
    if (e.target.classList.contains('del_li') && tasks[e.target.classList[0]].done == false) {
        tasks[e.target.classList[0]].done = true
    }
    else if (e.target.classList.contains('del_li') && tasks[e.target.classList[0]].done == true) {
        tasks[e.target.classList[0]].done = false
    }
    if (e.target.classList.contains('del_item')) {
        tasks.splice(e.target.classList[0], 1)
    }
    if (e.target.classList.contains('btn')) {
        if (!input.value) return;
        let newTodo = {
            post: input.value,
            done: false
        }
        tasks.push(newTodo)
        input.value = '';
    }
    localStorage.setItem('todo', JSON.stringify(tasks))
    displayMassage()
});
