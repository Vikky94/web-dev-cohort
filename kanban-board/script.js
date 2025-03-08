let allCardsData = localStorage.getItem('cardItems');
const addMoreCard = document.getElementById('add-more-card'),
    modal = document.getElementById('modal'),
    cardSection = document.getElementById('card-section'),
    addCardForm = document.getElementById('add-card-form'),
    allCards = document.getElementById('cards'),
    closeModal = document.getElementById('close-modal');

let draggableTaskObjData;

if (!allCardsData) localStorage.setItem('cardItems', JSON.stringify({}));
else {
    refreshData();
}
addMoreCard.addEventListener('click', function (e) {
    openPop();
})
closeModal.addEventListener('click', function (e) {
    closePop();
});

function addCardDatainLocalStorage(obj) {
    let cardsData = JSON.parse(localStorage.getItem('cardItems'));
    const categoryData = cardsData[obj.title];
    let status = true;
    if (categoryData === undefined) {
        cardsData[obj.title] = {};
        cardsData[obj.title] = obj;
        setAndRefreshData();
    } else {
        alert("Card Already Exist..");
        status = false;
    }
    return status;
}

function openPop() {
    modal.classList.add('in');
    cardSection.style.opacity = 0;
    modal.style.opacity = 1;
}
function closePop() {
    modal.style.opacity = 0;
    modal.classList.remove('in');
    cardSection.style.opacity = 1;
}

addCardForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target["title"].value && e.target["color"].value && e.target["color"].value && e.target["desc"].value) {
        const obj = {
            "title": e.target["title"].value,
            "color": e.target["color"].value,
            "desc": e.target["desc"].value,
            "created": new Date()
        };
        const isCardAdded = addCardDatainLocalStorage(obj);
        if (isCardAdded) {
            createCardElement(obj);
            e.target.reset();
            closePop();
        }
    } else {
        alert("All feilds are mandatory...")
    }
})




function createCardElement(cardDataObj) {
    const cardItemDiv = document.createElement('div');
    const cardDetailsDiv = document.createElement('div');
    const taskContainer = document.createElement('div');
    const pEle = document.createElement('p');

    pEle.classList.add('card-desc');
    pEle.innerText = cardDataObj.desc;

    cardDetailsDiv.classList.add('card-details');
    cardDataObj.type = "card";
    const commonTitleDiv = getCommonTitleDiv("card", cardDataObj);


    cardDetailsDiv.appendChild(commonTitleDiv);
    cardDetailsDiv.appendChild(pEle);

    cardItemDiv.setAttribute("draggable", true);
    cardItemDiv.classList.add('card-item');
    cardItemDiv.appendChild(cardDetailsDiv);

    taskContainer.classList.add('task-container', 'flex');


    cardItemDiv.appendChild(taskContainer);
    const button = document.createElement('button');
    button.classList.add('add-more-task');
    button.innerText = "Add Task";

    button.style.border = `1px solid ${cardDataObj.color}`
    button.style.color = cardDataObj.color;
    cardItemDiv.appendChild(button);
    allCards.appendChild(cardItemDiv);

    button.addEventListener('click', function (e) {
        addTask(cardDataObj, taskContainer)();
    })

    if (cardDataObj.taskitems && cardDataObj.taskitems.length) {
        cardDataObj.taskitems.forEach((taskItemData) => {
            taskItemData.parent = cardDataObj.title;
            taskContainer.appendChild(createTaskElement(cardDataObj, taskItemData));
        })
    }
    cardItemDiv.style.border = `1px solid ${cardDataObj.color}`



    taskContainer.addEventListener('dragover', function (e) {
        // e.preventDefault();
        // e.stopPropagation();
        const flyingTask = document.querySelector('.flying');
        // console.log('dragover');
        // console.log(draggableTaskObjData);

        const taskItems = cardDataObj.taskitems;
        if (taskItems === undefined) {
            cardDataObj.taskitems = [];
        }

        if( draggableTaskObjData.parent === cardDataObj.title ){ //drag in same card
            console.log('drag in same card');
        }else{
            const isAlreadyExist = taskItems.filter(v => v.title === draggableTaskObjData.title);
            if (isAlreadyExist.length === 0){
                // taskContainer.appendChild(flyingTask);
                //remove from previous card

                const previousCard = allCardsData[draggableTaskObjData.parent];
                const taskIndex = previousCard.taskitems.findIndex((val) => {
                    return val.title === draggableTaskObjData.title
                });
                delete previousCard.taskitems[taskIndex];
                previousCard.taskitems = previousCard.taskitems.filter(e => e);

                //set in current category card paremt
                draggableTaskObjData.parent = cardDataObj.title;
                cardDataObj.taskitems.push(draggableTaskObjData);
                setAndRefreshData();
            }
            else alert('Task already exist in this category...');
        }
    });

    return cardItemDiv;
}

function addTask(cardData) {
    return function () {
        console.log(cardData);
        const taskName = prompt("Add Task Name");
        if (taskName) {
            const taskObj = {};
            taskObj.title = taskName;
            taskObj.created = new Date();
            taskObj.parent = cardData.title;
            const taskItems = cardData.taskitems;
            if (taskItems === undefined) {
                cardData.taskitems = [];
            }
            cardData.taskitems.push(taskObj);
            allCardsData[cardData.title] = cardData;

            setAndRefreshData();
        }
    }
}

function setAndRefreshData() {
    localStorage.setItem('cardItems', JSON.stringify(allCardsData));
    refreshData();
};
function refreshData() {
    allCards.innerHTML = "";
    allCardsData = JSON.parse(localStorage.getItem('cardItems'));
    console.log(allCardsData);

    for (let i in allCardsData) {
        createCardElement(allCardsData[i]);
    }
}


function getCommonTitleDiv(elementType, cardItemData, taskItemData) {
    // <div class="flex cmn-title-div">
    //                         <div class="title-div flex align-center">
    //                             <span class="dot dashed"></span>
    //                             <h4>To do</h4>
    //                         </div>
    //                         <div class="action-div">
    //                             <i class="fas fa-edit"></i>
    //                             <i class="fas fa-trash"></i>
    //                         </div>
    //                     </div>

    const commonTitleDiv = document.createElement('div');
    commonTitleDiv.classList.add('flex', 'cmn-title-div');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div', 'flex', 'align-center');

    const span = document.createElement('span');
    span.classList.add('dot')
    let borderType = "solid";
    if (elementType === "task") {
        span.classList.add("dashed");
        borderType = "dashed";
    }

    let titleEle = "";
    let editPrmoptText = `Edit Card`;
    let countSpan = document.createElement('span');
    countSpan.classList.add('total-tasks');
    countSpan.innerText = cardItemData.taskitems ? cardItemData.taskitems.length : 0;
    countSpan.style.border = `1px ${borderType} ${cardItemData.color}`;

    if (elementType === "card") {
        titleEle = document.createElement('h3');
    }
    else {
        editPrmoptText = `Edit Task`;
        titleEle = document.createElement('h5');
    }

    titleEle.innerText = cardItemData && cardItemData.title ? cardItemData.title : "NA";
    span.style.border = `2px ${borderType} ${cardItemData.color}`;
    titleDiv.appendChild(span);
    titleDiv.appendChild(titleEle);

    if (elementType === "card") titleDiv.appendChild(countSpan);

    commonTitleDiv.appendChild(titleDiv);

    const actionDiv = document.createElement('div'),
        editIcon = document.createElement('i'),
        deleteIcon = document.createElement('i');
    actionDiv.classList.add('action-div');
    editIcon.classList.add('fas', 'fa-edit');
    deleteIcon.classList.add('fas', 'fa-trash');

    editIcon.addEventListener('click', function () {
        const updatedName = prompt(editPrmoptText, elementType === "card" ? cardItemData.title : taskItemData.title);
        if (updatedName === null) return false;


        if (elementType === "card") {  //update Card Name
            allCardsData[updatedName] = { ...allCardsData[titleEle.innerText], "title": updatedName };
            delete allCardsData[titleEle.innerText];
            setAndRefreshData();
        }
        else { //update Task Name
            const isTaskAlreadyExist = cardItemData.taskitems.filter((val) => {
                return val.title === updatedName
            });

            if (isTaskAlreadyExist.length) {
                alert("Task name already exist");
                return false;
            }

            const taskIndex = cardItemData.taskitems.findIndex((val) => {
                return val.title === taskItemData.title
            });

            cardItemData.taskitems[taskIndex].title = updatedName;
            cardItemData.taskitems[taskIndex].parent = cardItemData.title;
            setAndRefreshData();
        }
    })
    deleteIcon.addEventListener('click', function () {
        if (elementType === "card") {
            delete allCardsData[cardItemData.title];
            setAndRefreshData();
        } else {
            const taskIndex = cardItemData.taskitems.findIndex((val) => {
                return val.title === taskItemData.title
            });

            delete cardItemData.taskitems[taskIndex];
            cardItemData.taskitems = cardItemData.taskitems.filter(e => e);
            setAndRefreshData();
        }
    })

    actionDiv.appendChild(editIcon);
    actionDiv.appendChild(deleteIcon);
    commonTitleDiv.appendChild(actionDiv);
    return commonTitleDiv;
}

function createTaskElement(cardData, taskItemObj) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    taskItem.setAttribute("draggable", true)

    const commonTitleDiv = getCommonTitleDiv('task', cardData, taskItemObj);

    taskItem.appendChild(commonTitleDiv);
    const h5 = document.createElement('h5');
    h5.innerText = taskItemObj.title ? taskItemObj.title : "NA";
    h5.classList.add('task-name')
    taskItem.appendChild(h5);
    taskItem.style.border = `1px solid ${cardData.color}`


    taskItem.addEventListener('dragstart', function (e) {
        taskItem.classList.add('flying');
        draggableTaskObjData = taskItemObj;
        console.log('dragstart');       
    });

    taskItem.addEventListener('dragend', function (e) {
        taskItem.classList.remove('flying');
        draggableTaskObjData = undefined;
        console.log('dragend');      
    });

    return taskItem;
}
