const table = document.querySelector(".user-table")
const tableHead = document.querySelector("thead")
const tableBody = document.querySelector("tbody")
// const tableRow = document.querySelector("tr")
const tableData = document.querySelector("td")


const rowsPerPage = 10


let data = []
let currentPage = 1
let isFound = false


function displayData(page){
    tableBody.innerHTML = ""

    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage 

    const filteredData = getFilteredData()

    if(filteredData.length === 0){
        const error = document.querySelector(".error")
        error.style.display = "block"
    }else{
        const error = document.querySelector(".error")
        error.style.display = "none"
        for(let i = startIndex ; i < endIndex && i < filteredData.length; i++){
            const user = filteredData[i]
            const tableRow = document.createElement("tr")
            tableRow.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.gender}</td>
            <td>${user.position}</td>
            <td>${user.username}</td>
            <td>${user.country}</td>
            `
            tableBody.appendChild(tableRow)
        }
    }

    
}

function updatePagination(){
    const totalPages = Math.ceil(getFilteredData().length / rowsPerPage)
    const pagination = document.querySelector(".pagination")
    pagination.innerHTML = ""

    for(let i = 1; i <= totalPages; i++ ){
        const pageLink = document.createElement("button")
        pageLink.textContent = i
        pageLink.addEventListener("click", ()=>{
            currentPage = i
            displayData(currentPage)
            updatePagination()
        })
        if(i === currentPage){
            pageLink.classList.add("active")
        }
        pagination.appendChild(pageLink)
    }
}


function getFilteredData(){
    const search1 = document.getElementById("search1").value.toUpperCase()
    const search2 = document.getElementById("search2").value.toUpperCase()

    return data.filter(user => 
        user.name.toUpperCase().includes(search1) &&
        user.position.toUpperCase().includes(search2)
    )
}

function handleSearchByName(){
    // let input, filter, tableRow, rowValue, td
    // let isFound = false
    // const error = document.querySelector(".error")
    // input = document.getElementById("search1")
    // filter = input.value.toUpperCase()
    // tableRow = document.getElementsByTagName("tr")
    // error.style.display = "none"
    // for(let i = 1; i < tableRow.length; i++){
    //     td = tableRow[i].getElementsByTagName("td")[1]
    //     if(td){
    //         rowValue = td.textContent || td.innerText
    //         if(rowValue.toUpperCase().indexOf(filter) > -1){
    //             tableRow[i].style.display = ""
    //             isFound = true
    //         }else{
    //             tableRow[i].style.display = "none"
    //         }
    //     }
    // }
    // if(!isFound){
    //     error.style.display = "block"
    // }
    displayData(currentPage)
    updatePagination()
}


function handleSearchByPosition(){
    // let input, filter, tableRow, rowValue, td
    // let isFound = false
    // const error = document.querySelector(".error")
    // input = document.getElementById("search2")
    // filter = input.value.toUpperCase()
    // tableRow = document.getElementsByTagName("tr")
    // error.style.display = "none"

    // for(let i = 1; i < tableRow.length; i++){
    //     td = tableRow[i].getElementsByTagName("td")[4]
    //     if(td){
    //         rowValue = td.textContent || td.innerText
    //         if(rowValue.toUpperCase().indexOf(filter) > -1){
    //             tableRow[i].style.display = ""
    //             isFound = true
    //         }else{
    //             tableRow[i].style.display = "none"
    //         }
    //     }
    // }
    // if(!isFound){
    //     error.style.display = "block"
    // }
    displayData(currentPage)
    updatePagination()
}

fetch('users.json')
.then(response => response.json())
.then(initialData => {
    data = initialData    
    displayData(currentPage)
    updatePagination()
})
.catch(error => console.log("Error loading json data:", error))