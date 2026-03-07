

function getdata(){
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((Response) => Response.json())
    .then((data) => showdata(data.data))
}

function showdata(issues){
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    issues.forEach((issue) =>{
        console.log(issue)
        const card = document.createElement('div');

        card.innerHTML = `
                <div class=" h-full shadow-sm p-4 rounded-md border-t-4 border-[#00A96E]">
                    <div class="flex justify-between mb-3">
                        <img src="assets/Open-Status.png" alt="">
                        <p class="${issue.priority === 'high'? 'text-red-500 bg-red-200 rounded-full px-4': issue.priority === 'medium'? 'text-yellow-500 bg-yellow-100 rounded-full px-4': 'text-gray-500 bg-gray-200 rounded-full px-4'}">
                        ${issue.priority}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <h2 class="font-semibold text-sm">${issue.title}</h2>
                        <p class="text-neutral-500 text-[12px]">${issue.description}</p>

                        <div class="flex justify-between border-b border-neutral-300 pb-4">
                            <p class="bg-red-200 rounded-full text-red-500 text-[12px] px-4">BUG</p>
                            <p class="bg-yellow-200 rounded-full text-yellow-600 text-[12px] px-4">HELP WANTED</p>
                        </div>
                    </div>

                    <div class="mt-4 space-y-2">
                        <p class="text-[12px] text-neutral-500">${issue.author}</p>
                        <p class="text-[12px] text-neutral-500">${issue.createdAt}</p>
                    </div>
                </div>
        `;

        cardContainer.appendChild(card)
    }) 
}

getdata()         