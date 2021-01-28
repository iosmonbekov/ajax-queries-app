const url_main = 'https://todo-6d1dd-default-rtdb.firebaseio.com/';
let set;
const spiner = document.getElementsByClassName('spiner')

async function start() {  
    const res = await axios.get(url_main + ".json")
    if (res.data){
        set = Object.keys(res.data.posts).map(el => {
            return {
                ...res.data.posts[el],
                id: el,
            }
        })
    }
    spiner[0].className = 'spiner display-none';
    if (set)  await makeList(set);
    else noTodos();
    console.log(set)
}
start();

async function add(){
    console.log(input.value)
    let post = {
        title: input.value,
        check: false,
    }
    await axios.post(url_main + "posts.json", post);
    location.reload();
} 
function change() {}

const button = document.querySelector('.btn')
const input = document.querySelector('.form-control')
const list = document.querySelector('ul')


button.onclick = add;
input.oninput = change;

function makeList(arr) {
    for (let i = arr.length - 1; i >= 0; i--){
        const task = document.createElement('li')
        const remove = document.createElement('button');
        remove.className = 'btn btn-danger';
        remove.id = arr[i].id;
        remove.innerHTML = `&times;`
        if (set[i].check){
            task.className = 'list-group-item line-th';
        }else {
            task.className = 'list-group-item';
        }
        task.innerText = arr[i].title;
        task.id = i;
        task.append(remove)
        list.append(task)
        remove.onclick = removeFromList;
        task.onclick = didTask;
    }
}

async function removeFromList(e){
    console.log(e.target.id)
    await axios.delete(url_main + 'posts/' + e.target.id + '.json')
    location.reload();
}
async function didTask(e) {
    const obj = {
        title: set[e.target.id].title,
        id: set[e.target.id].id,
        check: !set[e.target.id].check,
    }
    await axios.put(url_main + 'posts/' + set[e.target.id].id + '.json', obj)
    location.reload();
}
function noTodos() {
    const notodos = document.createElement('div')
    notodos.className = 'notodos'
    notodos.innerText = 'There is no Todos yet...'
    list.append(notodos)
}