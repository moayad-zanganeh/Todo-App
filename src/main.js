let addTr = document.getElementById('addtr');
let arrayUser = [];
let modal = document.getElementById('modal');

addTr.addEventListener('click', () => {
  modal.classList.remove('invisible');
});

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.classList.add('invisible');
  }
});

let formSubmit = document.getElementById('submit');

formSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  let input = document.getElementById('input').value;
  let status = document.getElementById('status').value;
  let priority = document.getElementById('priority').value;
  let date = document.getElementById('date').value;
  let objectUser = {
    taskName: input,
    priority: priority,
    status: status,
    date: date,
  };
  arrayUser = localStorage.getItem('info')
    ? JSON.parse(localStorage.getItem('info'))
    : [];
  arrayUser.push(objectUser);
  localStorage.setItem('info', JSON.stringify(arrayUser));
  render();
});

function render() {
  let dataUser = localStorage.getItem('info')
    ? JSON.parse(localStorage.getItem('info'))
    : [];
  let tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  dataUser.forEach((item) => {
    let tr = document.createElement('tr');
    tr.classList.add('text-center');
    let td1 = document.createElement('td');
    td1.classList.add('py-4');
    td1.textContent = item.taskName;
    let td2 = document.createElement('td');
    td2.classList.add(
      `${priorityBgColor(item.priority)}`,
      'rounded-full',
      'border-none',
      'w-24',
      'h-10'
    );
    td2.textContent = item.priority;
    let td3 = document.createElement('td');
    td3.classList.add(
      `${statusBgColor(item.status)}`,
      'rounded-full',
      'border-none'
    );
    td3.textContent = item.status;
    let td4 = document.createElement('td');
    td4.classList.add(
      'bg-white',
      'text-black',
      'rounded-md',
      'border-teal-500'
    );
    td4.textContent = item.date;
    let td5 = document.createElement('td');
    td5.classList.add('flex', 'justify-center', 'gap-5', 'm-2');
    let btn1 = document.createElement('button');
    btn1.classList.add('bg-red-700', 'text-white', 'rounded-md', 'p-3');
    let image1 = document.createElement('img');
    image1.src = './image/delete.svg';
    let btn2 = document.createElement('button');
    btn2.classList.add('bg-blue-700', 'text-white', 'rounded-md', 'p-3');
    let image2 = document.createElement('img');
    image2.src = './image/edit.svg';
    let btn3 = document.createElement('button');
    btn3.classList.add('bg-gray-500', 'text-white', 'rounded-md', 'p-3');
    let image3 = document.createElement('img');
    image3.src = './image/veiw.svg';
    btn3.append(image3);
    btn2.append(image2);
    btn1.append(image1);
    td5.append(btn1, btn2, btn3);
    tr.append(td1, td2, td3, td4, td5);
    tbody.append(tr);
  });
}

render();

function priorityBgColor(priority) {
  if (priority == 'low') {
    return 'bg-gray-300';
  } else if (priority == 'medium') {
    return 'bg-yellow-400';
  } else {
    return 'bg-red-400';
  }
}

function statusBgColor(status) {
  if (status == 'todo') {
    return 'bg-red-400';
  } else if (status == 'doing') {
    return 'bg-yellow-400';
  } else {
    return 'bg-green-500';
  }
}
