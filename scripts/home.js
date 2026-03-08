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
                <div class=" h-full shadow-sm p-4 rounded-md border-t-4 border-[${issue.status == 'open'? '#00A96E' : '#A855F7'}]">
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


function getOpenData(){
    const openIssues = allIssues.filter(issue => issue.status === "open");
    showdata(openIssues);
}

function getCloseData(){
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    showdata(closedIssues);
}
