

//add-task : create todo button onclick open ".new-item"
//new-task : if button pressed it save & hide "new-item"
document.querySelector('.add-task').addEventListener('click', function(){
   document.querySelector('.new-task').style.display='block';
});
var itemsArr=[];
document.querySelector('.new-task button').addEventListener('click', function(){
    var itemName = document.querySelector('.new-task input').value;
    if (itemName != '') {
        var itemsStorage = localStorage.getItem('to-do-tasks');
        var itemsArr=JSON.parse(itemsStorage);
      //  var itemsArr=[];
        itemsArr.push({"task" : itemName, "status": 0});
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.new-task input').value = '';
        document.querySelector('.new-task').style.display='none';
    }
 });

// const items =[{"item": "Start chrome extension project", "status": "0"},
// {"item": "Start chrome extension project", "status": "1"}];

// const itemsStr = JSON.stringify(items);

// console.log(items);
// console.log(itemsStr);

function fetchItems(){
    const itemsList = document.querySelector('ul.to-do-tasks');
    itemsList.innerHTML = '';
    var newItemHTML = '';
    try{
    var itemsStorage = localStorage.getItem('to-do-tasks');
    var itemsArr=JSON.parse(itemsStorage);
    for (let i = 0; i < itemsArr.length; i++) {
        var status = '';
        if(itemsArr.status == 1){
            status = 'class="done"';
        }
        newItemHTML += `<li data-itemindex="${i}" ${status}>
        <span class="task">${itemsArr[i].task}</span>
        <div><span class="itemComplete">✔️</span><span class="itemDelete">❌</span></div>
        </li>`
     }
      itemsList.innerHTML= newItemHTML;
      var itemListUL =  document.querySelectorAll('ul li');
      for (let i = 0; i < itemListUL.length; i++){      
           itemListUL[i].querySelector('.itemComplete').addEventListener('click', function(){
               var index = this.parentNode.parentNode.dataset.itemindex;
             //  console.log(index);
            itemComplete(index);
           })  ;  
           itemListUL[i].querySelector('.itemDelete').addEventListener('click', function(){
            var index = this.parentNode.parentNode.dataset.itemindex;
          //  console.log(index);
            itemDelete(index);
           })  ; 
      }
    }
    catch(e){
        //.
        //sldkjfls....
    }
}

function itemComplete(index){
    var itemsStorage = localStorage.getItem('to-do-tasks');
    var itemsArr=JSON.parse(itemsStorage);
    itemsArr[index].status = 1;
    saveItems(itemsArr);
    
    document.querySelector('ul.to-do-tasks li[data-itemindex="'+index+'"]').className='done';
    
}
function itemDelete(index){
    var itemsStorage = localStorage.getItem('to-do-tasks');
    var itemsArr=JSON.parse(itemsStorage);
    itemsArr.splice(index, 1);
    
  
    saveItems(itemsArr);
    
    document.querySelector('ul.to-do-tasks li[data-itemindex="'+index+'"]').remove();

}
function saveItems(obj){
    var string = JSON.stringify(obj);
    localStorage.setItem('to-do-tasks', string);
}
 fetchItems();
