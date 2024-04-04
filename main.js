const input = document.getElementById('input');
const submit = document.getElementById('submit');
const left_choice = document.getElementById('left');
const right_choice = document.getElementById('right');
const left_text = document.getElementById('left-text');
const right_text = document.getElementById('right-text');
const main = document.getElementById('main');
const options = document.getElementById('options');
const output = document.getElementById('output');

async function greater(a, b) {
    return new Promise(resolve => {
        console.log(a, b);
        left_text.innerText = a;
        right_text.innerText = b;
        left_choice.addEventListener('click', function (e) {
           resolve(true);
        }, { once: true }); //Event listener is removed after one call
        right_choice.addEventListener('click', function (e) {
            resolve(false);
         }, { once: true }); //Event listener is removed after one call
     });
}

async function merge(arr1, arr2) {
    let out = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (await greater(arr1[i], arr2[j])) {
            out.push(arr1[i]);
            i++;
        } else {
            out.push(arr2[j]);
            j++;
        }
    }
    for (; i < arr1.length; i++) {
        out.push(arr1[i]);
    }
    for (; j < arr2.length; j++) {
        out.push(arr2[j]);
    }
    return out;
}

async function mergeSort(arr) {
    if (arr.length == 1) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    return await merge(await mergeSort(arr.slice(0, mid)), await mergeSort(arr.slice(mid)));
}

submit.addEventListener('click', () => {
    if (input.value == '') {
        alert('please enter at least 1 item');
        return;
    }
    let items = input.value.split('\n').filter(a => a != '');
    main.style.display = 'flex';
    options.style.display = 'none';
    mergeSort(items).then((arr) => {
        main.style.display = 'none';
        for (let i = 0; i < arr.length; i++) {
            let list_item = document.createElement('li');
            list_item.className = 'list-item';
            list_item.innerHTML= `${arr[i]}`;
            output.appendChild(list_item);
        }
        output.style.display = 'flex';
    })
});