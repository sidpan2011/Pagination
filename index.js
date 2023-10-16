const table = document.querySelector(".user-table")
const tableHead = document.querySelector("thead")
const tableBody = document.querySelector("tbody")
// const tableRow = document.querySelector("tr")
const tableData = document.querySelector("td")


const rowsPerPage = 10

fetch('users.json')
.then(response => response.json())
.then(data => {
    let currentPage = 1

    function displayData(page){
        tableBody.innerHTML = ""

        const startIndex = (page - 1) * rowsPerPage
        const endIndex = startIndex + rowsPerPage 

        for(let i = startIndex ; i < endIndex && i < data.length; i++){
            const user = data[i]
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
    function updatePagination(){
        const totalPages = Math.ceil(data.length / rowsPerPage)
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
    displayData(currentPage)
    updatePagination()
})
.catch(error => console.log("Error loading json data:", error))