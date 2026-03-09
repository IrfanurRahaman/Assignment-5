function btnToggle(id){
    const allBtn = document.getElementById('all-btn');
    const openBtn = document.getElementById('open-btn');
    const closedBtn = document.getElementById('closed-btn');

    allBtn.classList.remove('btn-primary')
    openBtn.classList.remove('btn-primary')
    closedBtn.classList.remove('btn-primary')

    const selected = document.getElementById(id);
    selected.classList.add('btn-primary');
}


            // API data getting function

let allIssues = [];

function getAllData(){
    showdata(allIssues);
}



function getdata(){
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((Response) => Response.json())
    .then((data) => {
        allIssues = data.data;
        showdata(allIssues);
    })

}

function showdata(issues){
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";



    issues.forEach((issue) =>{
        const card = document.createElement('div');

        const labelsHTML = issue.labels.map(label => {
            // default color
            let bgClass = "bg-gray-200 text-gray-600";

            if(label.toLowerCase() === "bug") {
                bgClass = "bg-red-200 text-red-600";
            } else if(label.toLowerCase() === "help wanted") {
                bgClass = "bg-yellow-200 text-yellow-600";
            } else if(label.toLowerCase() === "enhancement") {
                bgClass = "bg-green-200 text-green-600";
            }

            return `<p class="rounded-full text-[12px] px-4 ${bgClass}">${label}</p>`;
        }).join("");

        card.innerHTML = `
                <div onclick="getModal('${issue.id}')"  class=" h-full shadow-sm p-4 rounded-md border-t-4 border-[${issue.status == 'open'? '#00A96E' : '#A855F7'}]">
                    <div class="flex justify-between mb-3">
                    
                        <img src="${
                        issue.status === 'open' 
                        ? 'assets/Open-Status.png' 
                        : 'assets/close.png'}" 
                        alt="">


                        <p class="${issue.priority === 'high'? 'text-red-500 bg-red-200 rounded-full px-4': issue.priority === 'medium'? 'text-yellow-500 bg-yellow-100 rounded-full px-4': 'text-gray-500 bg-gray-200 rounded-full px-4'}">
                        ${issue.priority}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <h2 class="font-semibold text-sm">${issue.title}</h2>
                        <p class="text-neutral-500 text-[12px]">${issue.description}</p>

                        <div class="flex justify-between border-b border-neutral-300 pb-4">
                            ${labelsHTML} 
                        </div>
                    </div>

                    <div class="mt-4 space-y-2">
                        <p class="text-[12px] text-neutral-500">${issue.author}</p>
                        <p class="text-[12px] text-neutral-500">${issue.createdAt}</p>
                    </div>
                </div>
        `;

        cardContainer.appendChild(card)

        const issueCount = document.getElementById('issue-count');
        issueCount.innerText = issues.length;    
    }) 
}

getdata()         

            // opned data getting function
function getOpenData(){
    const openIssues = allIssues.filter(issue => issue.status === "open");
    showdata(openIssues);
}

            // closed data getting function
function getCloseData(){
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    showdata(closedIssues);
}









function labelItems(labels){
    return labels.map(label => {

        let labelClass = "border-gray-300 text-gray-600";

        if(label.toLowerCase() === "bug"){
            labelClass = "border-red-400 text-red-500";
        }
        else if(label.toLowerCase() === "help wanted"){
            labelClass = "border-yellow-400 text-yellow-600";
        }
        else if(label.toLowerCase() === "enhancement"){
            labelClass = "border-green-400 text-green-600";
        }

        return `
        <div class="${labelClass} border rounded-full whitespace-nowrap font-semibold px-3 py-1 capitalize">
            <h4 class="text-xs">${label}</h4>
        </div>
        `
    }).join("");
}

                   


                // card modal
const  getModal = async (id) => {
    const detailsContainer = document.getElementById("detailsContainer");
    // console.log(id);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json();
    const details = data.data;

    detailsContainer.innerHTML = `
    <div class="modal-box p-7">
                <h2 class="font-bold mb-1 text-xl">${details.title}</h2>
                <div class="mt-3 mb-6">
                    <span class=" ${details.status==="open"? "bg-green-600" : "bg-purple-600"} text-white py-1 px-2 rounded-full text-xs capitalize">${details.status}</span> &bull; <span class="text-xs">Opened by ${details.author}</span> &bull; <span class="text-xs">${details.createdAt.split("T")[0]}</span>
                </div>

                <div class="labels my-3 flex justify-start items-center gap-1.5 mt-3 ">
                
                    ${labelItems(details.labels)}
                
                </div>
                <p class="text-sm text-gray-600 my-6">${details.description}</p>

                <div class="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-lg">
                    <div>
                        <p class="text-gray-600 text-sm">Assignee:</p>
                        <h2 class="font-semibold">${details.assignee ? details.assignee: "Not Assigned"}</h2>
                    </div>

                    <div>
                        <h2 class="text-gray-600 text-sm">Priority:</h2>
                        <h2 class="0  ${details.priority==="high"? "bg-red-600" : details.priority==="medium" ?"bg-orange-600" : "bg-purple-600"} text-white py-1 px-3 rounded-full text-xs uppercase">${details.priority}</h2>
                    </div>
                </div>

                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn btn-primary">Close</button>
                    </form>
                </div>
            </div>
    `;

    document.getElementById('card-modal').showModal();
    
}

