export function editListData(requestData){
    let selectedData = [];
    for(let i = 0; i < requestData.length; i++){
        requestData[i].isSelected = 0;
    }
    for(let y = 0; y < requestData.length; y++){
        if(requestData[y].isSelected == 0){
            addData(requestData[y]);
            setData(requestData[y].ID);
        }
    }
    function setData(id){
        for(let i = 0;i < requestData.length; i++){
            if(requestData[i].isSelected == 0 && requestData[i].parentID == id){
                addData(requestData[i]);
                setData(requestData[i].ID);
            }
        }
    }
    function addData(value){
        value.isSelected = 1;
        selectedData.push(value);
    }
    return selectedData;
}

export function openClose(id){
    const isThereActive = document.querySelector("tr[data-id='"+id+"'] .action-button").classList.contains("active");
    const hasClassChild = document.querySelector("tr[data-id='"+id+"']").className.indexOf("child");

    if(!isThereActive){
        document.querySelector("tr[data-id='"+id+"'] .action-button").classList.add("active");
        document.querySelectorAll("table tbody tr").forEach(function(event) {
            let attr = event.getAttribute("data-parentid");
            if(id == attr){
                event.classList.add("active");
                if(hasClassChild < 0){
                    event.classList.add("child-0");
                    event.setAttribute("data-child","child-0");
                }else {
                    let classNumber = parseInt(document.querySelector("tr[data-id='"+id+"']").getAttribute("data-child").split("-")[1]) + 1;
                    event.classList.add("child-"+classNumber+"");
                    event.setAttribute("data-child","child-"+classNumber+"");
                }               
            }
        });
    }else {
        document.querySelector("tr[data-id='"+id+"'] .action-button").classList.remove("active");
        document.querySelectorAll("table tbody tr").forEach(function(event) {
            let attr = event.getAttribute("data-parentid");
            let attrID = event.getAttribute("data-id");
            if(id == attr){
                event.classList.remove("active");
                allClose(attrID);
            }
        });
    }
    function allClose(id){
        document.querySelectorAll("table tbody tr").forEach(function(event) {
            let attr = event.getAttribute("data-parentid");
            let attrID = event.getAttribute("data-id");
            if(id == attr){
                event.classList.remove("active");
                document.querySelector("tr[data-id='"+attr+"'] .action-button").classList.remove("active");
                allClose(attrID)
            }
        });
    }

}