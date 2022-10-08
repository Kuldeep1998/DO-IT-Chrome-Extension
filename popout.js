

// To render input and save button on screen
    document.querySelector('.add-task').addEventListener('click', function(){
            document.querySelector('.new-task').style.display='block';
    });

   
    let obj = {
         task : "",
         status : 0
    }

    // Adding functionality to new task button

    document.querySelector('.new-task button').addEventListener('click', function()
        {
            var itemName = document.querySelector('.new-task input').value;
            if (itemName != '') {
                    var itemsStorage = localStorage.getItem('to-do-tasks');
                    var itemsArr=JSON.parse(itemsStorage);
                    obj.task = itemName;
                    obj.status = 0;
                    itemsArr.push(obj);
                    saveItems(itemsArr);
                    fetchItems();
                    document.querySelector('.new-task input').value = '';
                    document.querySelector('.new-task').style.display='none';
            }
        }
    );

   
    // Fetching items from local storage
    function fetchItems()
    {
            const itemsList = document.querySelector('ul.to-do-tasks');
            itemsList.innerHTML = '';
            var newItemHTML = '';

            var itemsStorage = localStorage.getItem('to-do-tasks');
            var itemsArr=JSON.parse(itemsStorage);

            for (let i = 0; i < itemsArr.length; i++)
            {
                var status = '';
                if(itemsArr[i].status == '1')
                {
                    status = 'class="done"';
                    
                }
                
                newItemHTML += `<li data-itemindex="${i}" ${status}>
                <span class="task">${itemsArr[i].task}</span>
                <div><span class="itemComplete">✔️</span><span class="itemDelete">❌</span></div>
                </li>`
            }

            itemsList.innerHTML= newItemHTML; // Adding new tasks

            var itemListUL =  document.querySelectorAll('ul li');

            // Adding event listner to all "Right" and "Wrong" marks in the list
            for (let i = 0; i < itemListUL.length; i++)
            {      
                itemListUL[i].querySelector('.itemComplete').addEventListener('click', function()
                    {
                        var index = this.parentNode.parentNode.dataset.itemindex;
                        itemComplete(index);
                    }
                );  

                itemListUL[i].querySelector('.itemDelete').addEventListener('click', function()
                    {
                        var index = this.parentNode.parentNode.dataset.itemindex;
                        itemDelete(index);
                    }
                );
            }
        
    }

    // Adding funtiolity to "right" mark
    function itemComplete(index)
    {
        var itemsStorage = localStorage.getItem('to-do-tasks');
        var itemsArr=JSON.parse(itemsStorage);

        itemsArr[index].status = 1;
        saveItems(itemsArr);
        
        document.querySelector('ul.to-do-tasks li[data-itemindex="'+index+'"]').className='done';
        
    }

    // Adding functionlity to "cross" mark
    function itemDelete(index)
    {
        var itemsStorage = localStorage.getItem('to-do-tasks');
        var itemsArr=JSON.parse(itemsStorage);

        itemsArr.splice(index, 1); // Removing the task from array
        saveItems(itemsArr);

        document.querySelector('ul.to-do-tasks li[data-itemindex="'+index+'"]').remove(); // Removing the task from list

    }

    // Saving items to local storage
    function saveItems(obj){
        var string = JSON.stringify(obj);
        localStorage.setItem('to-do-tasks', string);
    }

    
    fetchItems();
