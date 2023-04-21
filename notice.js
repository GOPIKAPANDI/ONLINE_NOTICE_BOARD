const state={
    taskList:[],
};
const selectImage=document.querySelector('.select-image');
const inputFile=document.querySelector('#file');
const imgArea=document.querySelector('.img-area');
selectImage.addEventListener('click',function(){
    inputFile.click();
})
inputFile.addEventListener('change',function(){
    const image=this.files[0]
  
    if(image.size<2000000){
       const reader =new FileReader();
       reader.onload=()=>{
         const allImg=imgArea.querySelectorAll('img');
         allImg.forEach(item=>item.remove());
         const imgUrl=reader.result;
         const img=document.createElement('img');
         img.src=imgUrl;
         imgArea.appendChild(img);
         imgArea.classList.add('active');
         imgArea.dataset.img=image.name; 
       }
      reader.readAsDataURL(image);
    }else{
        alert("Image size more than 2MB");
    }
})

const taskContents = document.querySelector(".task__contents");
const htmlTaskContent = ({ id, description, file})=>`
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class="card shadow-sm task__card">         
        <div class="card-header d-flex justify-content-end task__card__header">
        
        <button type= "button" class="btn btn-outline-info mr=1.5" name= ${id} onclick="editTask()">
        <i class="fas fa-pencil-alt name=${id}"></i>
        </button>
        <button type= "button" class="btn btn-outline-danger mr=1.5" name= ${id} onclick="deleteTask()">
        <i class="fas fa-trash-alt name=${id}"></i>
        </button>
        </div>
        
        <div class="card-body">
        ${
            file
            ? `<img width='100%' src=${file} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
            :`<img width='100%' src="./default img.png" alt="Card Image" class="card-img-top md-3 rounded-lg" />`
        }
        <p class='description trim-3-lines text-muted'>${description}</p>
        </div>
       
        <div class="card-footer">
        <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" 
        data-bs-target="#showTask" onclick='openTask()' id=${id}>
        Open Task 
        </button>
        </div>
        </div>
    </div>
`;


// we convert json to str (i.e., for local storage)
const updateLocalStorage = () => {
    localStorage.setItem(
     "task",  
     JSON.stringify({
        tasks: state.taskList,
     })
    //  here we key:value as ---> task : tasks
    );
};

// Load Initial Data
// we convert string to json (i.e., for getting cards on the screen)
const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
    
    if(localStorageCopy) state.taskList = localStorageCopy.tasks;
    
    state.taskList.map((cardDate)=>{
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));//innerAdjacentHTML => to get the cards side by side
    });
};

// when we edit or update we need to save
// to give submit(save changes) to the particular card we need to denote the card with ID
// getting some html stuffs to js that is while clicking submit in html output(i.e., card)
// we have to store those changes in js.....

// for savechanges
const handleSubmit=(event)=>{   
    const id= `${Date.now()}`;
    const input={
        file:document.getElementById("file").value,  //url : https.... now the url will be user given input url
        description:document.getElementById("taskDescription").value,  
    };        // to display both updated and non updated cards in UI
    if(input.description===""||input.description==="              "){
        return alert("PLEASE FILL ALL THE NECESSARY FIELDS ...");
    }
    taskContents.insertAdjacentHTML("beforeend",htmlTaskContent({ ...input, id }));
    state.taskList.push({ ...input, id});       //store this updated data in array
    updateLocalStorage();
};

// while we update and click "save changes" button all the datas should be saved...so we have to call the method
// "handleSubmit" in html ...to save the changes.

// delete task
const deleteTask = (e) =>{
    if(!e) e=window.event;     //default
    const targetId =e.target.getAttribute("name"); // gets the id of that particular card
    // console.log(targetId);
    const type=e.target.tagName;  //type means it says whether we are clicking on delete icon[I](trash) or that button[button] 
    //console.log(type);
    const removeTask = state.taskList.filter(({id}) => id!== targetId); 
    // console.log(removeTask);
    // All the id(cards with other id's) will be updated except the id(card) which is clicked by the user
    updateLocalStorage();
    //to delete in localstorage and tasklist
    if(type === "BUTTON"){
        // to delete in (remove from) UI
        console.log(e.target.parentNode.parentNode.parentNode.parentNode)
        
        // from line 56 you have to go four times back .parent.parent.parent.parent to reach line 48.
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode);
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode); 
};

const editTask =(e) =>{
    if(!e) e=window.event;

    const targetId =e.target.id;
    const type=e.target.tagName;
    
    let parentNode;
    // let taskTitle;
    let taskDescription;
    //let taskType;
    let submitButton;
    
    if(type=="BUTTON"){
       parentNode=e.target.parentNode.parentNode;
    }
    else{
        parentNode=e.target.parentNode.parentNode.parentNode;
    }
    // console.log(parentNode.childNodes[3].childNodes);
    taskDescription = parentNode.childNodes[3].childNodes[3];
    submitButton=parentNode.childNodes[5].childNodes[1];

    taskDescription.setAttribute("contenteditable","true");
    submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");    
    submitButton.innerHTML="Save Changes";   //innerHtml==> to change the html content
};

const saveEdit = (e) =>{
    if(!e) e=window.event;

    const targetId =e.target.id;
    const parentNode=e.target.parentNode.parentNode;
    const taskDescription = parentNode.childNodes[3].childNodes[3];
    const submitButton=parentNode.childNodes[5].childNodes[1];   

    const updateData ={
        taskDescription: taskDescription.innerHTML,
    };
    let stateCopy = state.taskList;
    stateCopy=stateCopy.map((task)=>task.id===targetId ? {
        id : task.id,
        description:updateData.taskDescription,  
        file: task.file,
    }
    : task
    );    
    state.taskList= stateCopy;
    updateLocalStorage();

    taskDescription.setAttribute("contenteditable","false");

    submitButton.setAttribute("onclick","openTask.apply(this.arguments)");
    submitButton.setAttribute("data-bs-toggle","modal");  
    submitButton.setAttribute("data-bs-target","#showTask");
    submitButton.innerHTML="Open Task";

};

//search
const searchTask=(e)=>{
    if(!e) e=window.event;
    while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild);
    }
    const resultData =state.taskList.filter(({description})=>
        description.toLowerCase().includes(e.target.value.toLowerCase()) 
    );
    console.log(resultData);
    resultData.map((cardData) =>
        //taskContents.insertAdjacentHTML("beforeend",htmlModalContent(cardData))
        taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData))
    );
};
