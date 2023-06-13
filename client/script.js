// Load data to Data Div, append Divs as needed


const databaseDiv = document.querySelector('.data')
let newDiv = document.createElement('div')
newDiv.classList.add('data-entry')
databaseDiv.appendChild(newDiv)
newDiv = document.createElement('div')
newDiv.classList.add('data-entry')
databaseDiv.appendChild(newDiv)


const loadData = async () => {
    //get data
    const response = await axios.get('http://localhost:3001/api/session')
    const data = response.data
    
    //define new divs
    const databaseDiv = document.querySelector('.data')
    let dataEntryDiv
    let dataAttrDiv
    //loop based on length of data
    data.forEach((entry) => {

        dataEntryDiv = document.createElement('div')
        dataEntryDiv.classList.add('data-entry')
        databaseDiv.appendChild(dataEntryDiv)

        for (const property in entry) {
            if(property!='user_id' && property!='_id'){
                dataAttrDiv = document.createElement('div')
                dataAttrDiv.classList.add('data-attr')
                dataEntryDiv.appendChild(dataAttrDiv)
                console.log(entry.song_id)
                property=='song_id' ? dataAttrDiv.innerText = entry[property].song_name : dataAttrDiv.innerText = entry[property]
            }   
        }

    })

}

loadData()
























// animation section

const scrollAnim = document.querySelectorAll('.animation')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation')
        }
            else {
                entry.target.classList.remove('scroll-animation')
            }
        
    })
})


for (let i in scrollAnim) {
    const elements = scrollAnim[i]
    observer.observe(elements)
} 